import { validateFight, validateUpdateFight } from "../validations/SchemaFights.mjs";

export class ControllerFights {
    constructor({ModelFight}){
        this.ModelFight = ModelFight;
    }

    // Controlador para obtener todas las peleas
    getAllFights = async (req, res) => {
        try{
            const fights = await this.ModelFight.getAllFights();
            if(fights.message) return res.status(400).json({message: fights.message});
            return res.status(200).json({
                message: 'Peleas obtenidas exitosamente',
                data: fights.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener una pelea por su ID
    getFightById = async (req, res) => {
        const {id} = req.params;
        try{
            const fight = await this.ModelFight.getFightById({id});
            if(fight.error) return res.status(404).json({error: fight.error});
            if(fight.message) return res.status(400).json({message: fight.message});
            return res.status(200).json({
                message: 'Pelea obtenida exitosamente',
                data: fight.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener todas las peleas de un evento
    getFightsByEvent = async (req, res) => {
        const {event_id} = req.params;
        try{
            const fights = await this.ModelFight.getFightsByEvent({event_id});
            if(fights.error) return res.status(404).json({error: fights.error});
            if(fights.message) return res.status(400).json({message: fights.message});
            return res.status(200).json({
                message: 'Peleas obtenidas exitosamente',
                data: fights.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para crear una nueva pelea
    createFight = async (req, res) => {
        const validation = validateFight(req.body);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const fight = await this.ModelFight.createFight({fight: validation.data});
            if(fight.error) return res.status(400).json({error: fight.error});
            if(fight.message) return res.status(400).json({message: fight.message});
            return res.status(201).json({
                message: 'Pelea creada exitosamente',
                data: fight.data
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para actualizar una pelea por su ID
    updateFight = async (req, res) => {
        const { id } = req.params;
        const validation = validateUpdateFight(req.body);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const updatedFight = await this.ModelFight.updateFight({id, fight: validation.data});
            if(updatedFight.error) return res.status(404).json({error: updatedFight.error});
            return res.status(200).json({
                message: updatedFight.message
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para eliminar una pelea por su ID
    deleteFight = async (req, res) => {
        const { id } = req.params;
        try{
            const deletedFight = await this.ModelFight.deleteFight({id});
            if(deletedFight.error) return res.status(404).json({error: deletedFight.error});
            return res.status(200).json({
                message: deletedFight.message
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }
}