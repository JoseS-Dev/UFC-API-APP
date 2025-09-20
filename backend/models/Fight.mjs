import {db} from '../DB.mjs';
import pkg from 'lodash';

const {omit} = pkg;

export class ModelFight {
    // Método para obtener todas las peleas
    static async getAllFights(){
        const fights = await db.query(
            `SELECT e.*, r.* FROM fights r
            JOIN events e ON r.event_id = e.id`
        );
        if(fights.rowCount === 0) return {message: 'No hay peleas registradas'};
        // Ahora vamos a recorrer la lista de la pelea para obtener a los luchadores
        for(const fight of fights.rows){
            const fighterRed = await db.query(
                `SELECT * FROM fighters WHERE id = $1`,
                [fight.fighter_red_id]
            );
            const fighterBlue = await db.query(
                `SELECT * FROM fighters WHERE id = $1`,
                [fight.fighter_blue_id]
            );
            fight.fighter_red = omit(fighterRed.rows[0], [
                'created_at', 'updated_at', 'is_champion', 'is_blocked', 'is_favorite',
                'id'
            ])
            fight.fighter_blue = omit(fighterBlue.rows[0], [
                'created_at', 'updated_at', 'is_champion', 'is_blocked', 'is_favorite',
                'id'
            ]);
        }
        const sanitizedFights = fights.rows.map(fight =>
            omit(fight, [
                'id', 'fighter_red_id', 'fighter_blue_id', 'event_id',
                'created_at', 'updated_at'
            ])
        );
        return {data: sanitizedFights};
    }

    // Método para obtener una pelea por su ID
    static async getFightById({id}){
        if(!id) return {error: 'ID de pelea es requerido'};
        // Se verifica si existe dicha pelea con ese ID
        const fight = await db.query(
            `SELECT * FROM fights WHERE id = $1`,
            [id]
        );
        if(fight.rowCount === 0) return {error: 'No existe una pelea con ese ID'};
        const eventId = fight.rows[0].event_id;
        const fighterRedId = fight.rows[0].fighter_red_id;
        const fighterBlueId = fight.rows[0].fighter_blue_id;
        // Si existe dicha pelea, comprobamos si el evento y los luchadores existe
        const existingEvents = await db.query(
            `SELECT * FROM events WHERE id = $1`,
            [eventId]
        )
        const existingRedFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [fighterRedId]
        )
        const existingBlueFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [fighterBlueId]
        )
        if(existingEvents.rowCount === 0 || existingRedFighter.rowCount === 0 
        || existingBlueFighter.rowCount === 0) return {message: 'El evento o los luchadores no existen'};
        const sanitizedFighterRed = omit(existingRedFighter.rows[0], [
            'created_at', 'updated_at', 'is_champion', 'is_blocked', 'is_favorite'
        ]);
        const sanitizedFighterBlue = omit(existingBlueFighter.rows[0], [
            'created_at', 'updated_at', 'is_champion', 'is_blocked', 'is_favorite'
        ]);
        return {
            data: {
                ...fight.rows[0],
                fighter_red: sanitizedFighterRed,
                fighter_blue: sanitizedFighterBlue,
                event: existingEvents.rows[0]
            }
        }
    }

    // Método para obtener las peleas de une evento por su ID
    static async getFightsByEvent({event_id}){
        if(!event_id) return {error: 'ID de evento es requerido'};
        // Se verifica si existe dicho evento con ese ID
        const existingEvent = await db.query(
            `SELECT * FROM events WHERE id = $1`,
            [event_id]
        );
        if(existingEvent.rowCount === 0) return {error: 'No existe un evento con ese ID'};
        // Si se existe, procedemos a hacer la consulta para obtener todas las peleas de dicho evento
        const fights = await db.query(
            `SELECT e.*, r.* FROM fights r
            JOIN events e ON r.event_id = e.id
            WHERE e.id = $1`, [event_id]
        )
        if(fights.rowCount === 0) return {message: 'No hay peleas registradas para este evento'};
        // recorremos la lista de peleas para obtener a los luchadores
        for(const fight of fights.rows){
            const fighterRed = await db.query(
                `SELECT * FROM fighters WHERE id = $1`,
                [fight.fighter_red_id]
            );
            const fighterBlue = await db.query(
                `SELECT * FROM fighters WHERE id = $1`,
                [fight.fighter_blue_id]
            );
            fight.fighter_red = omit(fighterRed.rows[0], [
                'created_at', 'updated_at', 'is_champion', 'is_blocked', 'is_favorite',
                'id'
            ]);
            fight.fighter_blue = omit(fighterBlue.rows[0], [
                'created_at', 'updated_at', 'is_champion', 'is_blocked', 'is_favorite',
                'id'
            ]);
        }
        const sanitizedfights = fights.rows.map(fight =>
            omit(fight, [
                'id', 'created_at', 'updated_at', 'is_champion', 'is_blocked',
                'is_favorite'
            ])
        )
        return {data: sanitizedfights};
    }

    // Método para crear una nueva pelea
    static async createFight({fight}){
        if(!fight) return {error: 'Datos de pelea son requeridos'};
        const {event_id, fighter_red_id, fighter_blue_id, fight_order,
        is_title_fight, is_main_event, is_co_main_event, weight_fight,
        winner_fighter} = fight;
        // Se verifica si existe el evento y los luchadores de dicha pelea
        const existingFight = await db.query(
            `SELECT * FROM fights WHERE event_id = $1 AND
            fighter_red_id = $2 AND fighter_blue_id = $3`,
            [event_id, fighter_red_id, fighter_blue_id]
        )
        if(existingFight.rowCount > 0) return {message: 'La pelea ya existe'};
        // Si no existe, procedemos a verificar si el evento y los luchadores existen
        const existingEvent = await db.query( `SELECT * FROM events WHERE id = $1`, 
        [event_id]);

        const existingRedFighter = await db.query('SELECT * FROM fighters WHERE id = $1', 
        [fighter_red_id]);

        const existingBlueFighter = await db.query('SELECT * FROM fighters WHERE id = $1', 
        [fighter_blue_id]);
        
        if(existingEvent.rowCount === 0 || existingRedFighter.rowCount === 0 
        || existingBlueFighter.rowCount === 0) return {
        message: 'No se puede crear la pelea porque el evento o los luchadores no existen'};
        
        // Si existe el evento y los luchadores, procedemos a crear la pelea
        const newFight = await db.query(
            `INSERT INTO fights
            (event_id, fighter_red_id, fighter_blue_id, fight_order,
            is_title_fight, is_main_event, is_co_main_event, weight_fight,
            winner_fighter)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [event_id, fighter_red_id, fighter_blue_id, fight_order || null,
            is_title_fight || false, is_main_event || false, is_co_main_event || false,
            weight_fight, winner_fighter || null]
        );
        if(newFight.rowCount === 0) return {error: 'No se pudo crear la pelea'};
        return {data: newFight.rows[0]};
    }

    // Método para actualizar una pelea por su ID
    static async updateFight({id, fight}){
        if(!id || !fight) return {error: 'ID de pelea y datos son requeridos'};
        const allowedFields = [
            'event_id', 'fighter_red_id', 'fighter_blue_id', 'fight_order',
            'is_title_fight', 'is_main_event', 'is_co_main_event', 'weight_fight',
            'winner_fighter'
        ];
        // Colocamos los campos a actualizar
        const fieldsToUpdate = {};
        for(const field of allowedFields){
            if(fight[field] !== undefined){
                fieldsToUpdate[field] = fight[field];
            }
        }

        // Verificamos si la pelea existe
        const existingFight = await db.query(
            `SELECT * FROM fights WHERE id = $1`,
            [id]
        );
        if(existingFight.rowCount === 0) return {error: 'No existe una pelea con ese ID'};
        // Si existe, procedemos a actualizar la pelea
        const setFields = [];
        const values = [];

        Object.entries(fieldsToUpdate).forEach(([key, value], index) => {
            setFields.push(`${key} = $${index + 1}`);
            values.push(value);
        });
        values.push(id); // Agregamos el ID al final de los valores
        const updatedFight = await db.query(
            `UPDATE fights SET ${setFields.join(', ')} WHERE id=$${values.length}`,
            values
        );
        if(updatedFight.rowCount === 0) return {error: 'No se pudo actualizar la pelea'};
        return {message: `La pelea entre ${existingFight.rows[0].fighter_red_id} y 
        ${existingFight.rows[0].fighter_blue_id} ha sido actualizada`};
    }

    // Método para eliminar una pelea por su ID
    static async deleteFight({id}){
        if(!id) return {error: 'ID de pelea es requerido'};
        // Verificamos si la pelea existe
        const existingFight = await db.query(
            `SELECT * FROM fights WHERE id = $1`,
            [id]
        );
        if(existingFight.rowCount === 0) return {error: 'No existe una pelea con ese ID'};
        // Si existe, procedemos a eliminar la pelea
        const deletedFight = await db.query(
            `DELETE FROM fights WHERE id = $1`,
            [id]
        );
        if(deletedFight.rowCount === 0) return {error: 'No se pudo eliminar la pelea'};
        return {message: `La pelea entre ${existingFight.rows[0].fighter_red_id} y 
        ${existingFight.rows[0].fighter_blue_id} ha sido cancelada`};
    }
}