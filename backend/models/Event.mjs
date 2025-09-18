import {db} from '../DB.mjs';
import pkg from 'lodash';

const {omit} = pkg;

export class ModelEvent {
    // Obtener todos los eventos
    static async getAllEvents(){
        const events = await db.query(
            `SELECT * FROM events`
        );
        if(events.rowCount === 0) return {message: "No hay eventos programados"}
        const sanitizedEvents = events.rows.map(event =>
            omit(event, ['created_at', 'updated_at'])
        );
        console.log("Eventos encontrados cone éxito")
        return {data: sanitizedEvents}
    }

    // Obtener un evento por su ID
    static async getEventById({id}){
        if(!id) return {error: "ID del evento es requerido"};
        const event = await db.query(
            `SELECT * FROM events WHERE id = $1`, [id]
        );
        if(event.rowCount === 0) return {error: "Evento no encontrado"};
        const sanitizedEvents = omit(event.rows[0], ['created_at', 'updated_at']);
        console.log("Evento encontrado con éxito")
        return {data: sanitizedEvents}
    }

    // Obtener eventos por el pais donde se va a realizar
    static async getEventsByCountry({country_event}){
        if(!country_event) return {error: "País del evento es requerido"};
        const events = await db.query(
            `SELECT * FROM events WHERE country_event = $1`,
            [country_event]
        );
        if(events.rowCount === 0) return {message: "No hay eventos programados en este país"}
        const sanitizedEvents = events.rows.map(event =>
            omit(event, ['created_at', 'updated_at'])
        );
        console.log("Eventos encontrados con éxito")
        return {data: sanitizedEvents}
    };

    // Crear un nuevo evento
    static async createEvent({event}){
        if(!event) return {error: "Datos del evento son requeridos"};
        const {
            name_event, location_event, venue_event,
            date_event, country_event, image_event
        } = event;
        // Se verifica si ya existe un evento con el mismo nombre y fecha
        const existingEvent = await db.query(
            `SELECT * FROM events WHERE name_event = $1 AND date_event = $2`,
            [name_event, date_event]
        );
        if(existingEvent.rowCount > 0) return {message: "Ya existe un evento con el mismo nombre y fecha"};
        // Si no existe, se crea el nuevo evento
        const newEvent = await db.query(
            `INSERT INTO events (name_event, location_event, venue_event, date_event, country_event, image_event)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name_event, location_event, venue_event, date_event, country_event, image_event]
        );
        if(newEvent.rowCount === 0) return {error: "Error al crear el evento"};
        const sanitizedEvents = omit(newEvent.rows[0], ['created_at', 'updated_at']);
        console.log("Evento creado con éxito")
        return {data: sanitizedEvents}
    }

    // Actualizar un evento por su ID
    static async updateEvent({id, event}){
        if(!id || !event) return {error: "ID y datos del evento son requeridos"};
        const allowedfields = [
            'name_event', 'location_event', 'venue_event',
            'date_event', 'country_event', 'image_event'
        ];
        // Filtrar los campos permitidos
        const fieldsUpdate = {};
        for(const key in event){
            if(allowedfields.includes(key)){
                fieldsUpdate[key] = event[key];
            }
        };
        // Se verifica si el evento existe
        const existingEvent = await db.query(
            `SELECT * FROM events WHERE id = $1`, [id]
        );
        if(existingEvent.rowCount === 0) return {error: "Evento no encontrado"};
        // Si existe, se procede a actualizar
        const setFields = [];
        const values = [];

        Object.entries(fieldsUpdate).forEach(([key, value], index) => {
            setFields.push(`${key} = $${index + 1}`);
            values.push(value);
        });
        values.push(id); // Agregar el ID al final de los valores
        const updatedEvent = await db.query(
            `UPDATE events SET ${setFields.join(',')} WHERE id = $${values.length}`,
            values
        );
        if(updatedEvent.rowCount === 0) return {error: "Error al actualizar el evento"};
        console.log("Evento actualizado con éxito")
        return {message: `El evento ${existingEvent.rows[0].name_event} ha sido actualizado correctamente`};
    }

    // Eliminar un evento por su ID
    static async deleteEvent({id}){
        if(!id) return {error: "ID del evento es requerido"};
        // Se verifica si el evento existe
        const existingEvent = await db.query(
            `SELECT * FROM events WHERE id = $1`, [id]
        );
        if(existingEvent.rowCount === 0) return {error: "Evento no encontrado"};
        // Si existe, se procede a eliminar
        const deleteEvent = await db.query(
            `DELETE FROM events WHERE id = $1`, [id]
        );
        if(deleteEvent.rowCount === 0) return {error: "Error al eliminar el evento"};
        console.log("Evento eliminado con éxito")
        return {message: `El evento ${existingEvent.rows[0].name_event} ha sido eliminado correctamente`};
    }
}