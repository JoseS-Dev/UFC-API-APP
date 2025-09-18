import { validateEvents, validateUpdateEvent } from "../validations/SchemaEvents.mjs";

export class ControllerEvents {
    constructor({ModelEvent}){
        this.ModelEvent = ModelEvent;
    }

    // Controlador para obtener todos los eventos
    getAllEvents = async (req, res) => {
        try{
            const events = await this.ModelEvent.getAllEvents();
            if(events.message) return res.status(200).json({message: events.message});
            return res.status(200).json({
                message: "Eventos obtenidos con éxito",
                data: events.data
            });
        }
        catch(error){
            return res.status(500).json({error: "Error del servidor"});
        }
    }

    // Controlador para obtener un evento por su ID
    getEventById = async (req, res) => {
        const {id} = req.params;
        try{
            const event = await this.ModelEvent.getEventById({id});
            if(event.error) return res.status(404).json({error: event.error});
            return res.status(200).json({
                message: "Evento obtenido con éxito",
                data: event.data
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({error: "Error del servidor"});
        }
    }

    // Controlador para obtener eventos por el pais donde se va a realizar
    getEventsByCountry = async (req, res) => {
        const { country_event } = req.params;
        try{
            const events = await this.ModelEvent.getEventsByCountry({country_event});
            if(events.error) return res.status(404).json({error: events.error});
            if(events.message) return res.status(400).json({message: events.message});
            return res.status(200).json({
                message: "Eventos obtenidos con éxito",
                data: events.data
            });

        }
        catch(error){
            return res.status(500).json({error: "Error del servidor"});
        }
    }

    // Controlador para crear un nuevo evento
    createEvent = async (req, res) => {
        if(!req.file) return res.status(400).json({error: "Imagen del evento es requerida"});
        const eventData = {
            ...req.body,
            image_event: req.file.path
        };
        const validation = validateEvents(eventData);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const newEvent = await this.ModelEvent.createEvent({event: validation.data});
            if(newEvent.error) return res.status(400).json({error: newEvent.error});
            if(newEvent.message) return res.status(409).json({message: newEvent.message});
            return res.status(201).json({
                message: "Evento creado con éxito",
                data: newEvent.data
            })
        }
        catch(error){
            return res.status(500).json({error: "Error del servidor"});
        }
    }

    // Controlador para actualizar un evento
    updateEvent = async (req, res) => {
        if(!req.file) return res.status(400).json({error: "Imagen del evento es requerida"});
        const {id} = req.params;
        const eventData = {
            ...req.body,
            image_event: req.file.path
        };
        const validation = validateUpdateEvent(eventData);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const updatedEvent = await this.ModelEvent.updateEvent({id, event: validation.data});
            if(updatedEvent.error) return res.status(404).json({error: updatedEvent.error});
            return res.status(200).json({message: updatedEvent.message});
        }
        catch(error){
            return res.status(500).json({error: "Error del servidor"});
        }
    }

    // Controlador para eliminar un evento
    deleteEvent = async (req, res) => {
        const {id} = req.params;
        try{
            const deletedEvent = await this.ModelEvent.deleteEvent({id});
            if(deletedEvent.error) return res.status(404).json({error: deletedEvent.error});
            return res.status(200).json({message: deletedEvent.message});
        }
        catch(error){
            return res.status(500).json({error: "Error del servidor"});
        }
    }
}