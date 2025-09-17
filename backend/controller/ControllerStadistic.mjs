import { validateStadistic, validateStadisticUpdate } from "../validations/SchemaStadistic.mjs";

export class ControllerStadistic{
    constructor({ModelStadistic}){
        this.ModelStadistic = ModelStadistic;
    }

    // Controlador para obtener las estadisticas de un luchador por su ID
    getStadisticByFighter = async (req, res) => {
        const { fighter_id } = req.params;
        try{
            const stadistic = await this.ModelStadistic.getStadisticByFighter({fighter_id});
            if(stadistic.error) return res.status(400).json({error: stadistic.error});
            if(stadistic.message) return res.status(404).json({message: stadistic.message});
            return res.status(200).json({
                message: 'Estadísticas obtenidas correctamente',
                data: stadistic.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener las estadisticas de un luchador por su ranking en la UFC
    getStadisticByRanking = async (req, res) => {
        const { ranking_fighter } = req.params;
        try{
            const stadistic = await this.ModelStadistic.getStadisticByRanking({ranking_fighter});
            if(stadistic.error) return res.status(400).json({error: stadistic.error});
            if(stadistic.message) return res.status(404).json({message: stadistic.message});
            return res.status(200).json({
                message: 'Estadísticas obtenidas correctamente',
                data: stadistic.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para crear las estadisticas de un luchador (solo admin)
    createStadistic = async (req, res) => {
        const { fighter_id } = req.params;
        const validation = validateStadistic(req.body);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const stadistic = await this.ModelStadistic.createStadistic({fighter_id, stadistic: validation.data});
            if(stadistic.error) return res.status(400).json({error: stadistic.error});
            if(stadistic.message) return res.status(404).json({message: stadistic.message});
            return res.status(201).json({
                message: 'Estadísticas creadas correctamente',
                data: stadistic.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para actualizar las estadisticas de un luchador (solo admin)
    updateStadistic = async (req, res) => {
        const { fighter_id } = req.params;
        const validation = validateStadisticUpdate(req.body);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const stadistic = await this.ModelStadistic.updateStadistic({fighter_id, stadistic: validation.data});
            if(stadistic.error) return res.status(400).json({error: stadistic.error});
            if(stadistic.message) return res.status(200).json({message: stadistic.message});
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para eliminar las estadisticas de un luchador (solo admin)
    deleteStadistic = async (req, res) => {
        const { fighter_id } = req.params;
        try{
            const stadistic = await this.ModelStadistic.deleteStadistic({fighter_id});
            if(stadistic.error) return res.status(400).json({error: stadistic.error});
            if(stadistic.message) return res.status(200).json({message: stadistic.message});
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }
}