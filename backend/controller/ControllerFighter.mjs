import { exists } from "fs";
import { validateFighter, validateFighterUpdate } from "../validations/SchemaFighter.mjs";

export class ControllerFighters{
    constructor({ModelFighter}){
        this.ModelFighter = ModelFighter;
    };

    // Controlador para obtener todos los luchadores
    getAllFighters = async (req, res) => {
        try{
            const fighters = await this.ModelFighter.getAllFighters();
            if(fighters.message) return res.status(400).json({error: fighters.message});
            return res.status(200).json({
                message: 'Luchadores obtenidos correctamente',
                data: fighters.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }
    
    // Controlador para obtener un luchador por su ID
    getFighterById = async (req, res) => {
        const {id} = req.params;
        try{
            const fighter = await this.ModelFighter.getFighterById({id});
            if(fighter.error) return res.status(400).json({error: fighter.error});
            if(fighter.message || fighter.data) return res.status(200).json({
                message: fighter.message || 'Luchador obtenido correctamente',
                data: fighter.data || null
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener a los luchador por su apodo
    getFighterByNickname = async (req, res) => {
        const { nickname_fighter } = req.params;
        try{
            const fighter = await this.ModelFighter.getFighterByNickname({nickname_fighter});
            if(fighter.error) return res.status(400).json({error: fighter.error});
            if(fighter.message) return res.status(404).json({error: fighter.message});
            return res.status(200).json({
                message: 'Luchador obtenido correctamente',
                data: fighter.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }
    
    // Controlador para obtener luchadores favoritos de un usuario
    getFavoriteFightersByUser = async (req, res) => {
        const {user_id} = req.params;
        try{
            const fighters = await this.ModelFighter.getFavoriteFightersByUser({user_id});
            if(fighters.error) return res.status(400).json({error: fighters.error});
            if(fighters.message) return res.status(404).json({error: fighters.message});
            return res.status(200).json({
                message: 'Luchadores favoritos obtenidos correctamente',
                data: fighters.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener a los luchadores bloqueados
    getBlockedFighters = async (req, res) => {
        try{
            const fighters = await this.ModelFighter.getBlockedFighters();
            if(fighters.message) return res.status(400).json({error: fighters.message});
            return res.status(200).json({
                message: 'Luchadores bloqueados obtenidos correctamente',
                data: fighters.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para crear un nuevo luchador
    createFighter = async (req, res) => {
        if(!req.file) return res.status(400).json({error: 'La imagen del luchador es obligatoria'});
        const DataFighter = {
            ...req.body,
            age_fighter: parseInt(req.body.age_fighter),
            height_fighter: parseFloat(req.body.height_fighter),
            weight_fighter: parseFloat(req.body.weight_fighter),
            team_id: req.body.team_id ? parseInt(req.body.team_id) : undefined,
            category_id: req.body.category_id ? parseInt(req.body.category_id) : undefined,
            image_fighter: req.file.path
        };
        const validation = validateFighter(DataFighter);
        try{
            if(!validation.success) return res.status(400).json({error: validation.message});
            const newFighter = await this.ModelFighter.createFighter({fighter: validation.data});
            if(newFighter.error) return res.status(400).json({error: newFighter.error});
            if(newFighter.message) return res.status(400).json({error: newFighter.message});
            return res.status(201).json({
                message: 'Luchador creado correctamente',
                data: newFighter.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para actaulizar un luchador
    updatedFighter = async (req, res) => {
        if(!req.file) return res.status(400).json({error: 'La imagen del luchador es obligatoria'});
        const { id } = req.params;
        const DataUpdateFighter = {
            ...req.body,
            age_fighter: req.body.age_fighter ? parseInt(req.body.age_fighter) : undefined,
            height_fighter: req.body.height_fighter ? parseFloat(req.body.height_fighter) : undefined,
            weight_fighter: req.body.weight_fighter ? parseFloat(req.body.weight_fighter) : undefined,
            team_id: req.body.team_id ? parseInt(req.body.team_id) : undefined,
            category_id: req.body.category_id ? parseInt(req.body.category_id) : undefined,
            image_fighter: req.file.path
        };
        const validation = validateFighterUpdate(DataUpdateFighter);
        try{
            if(!validation.success) return res.status(400).json({error: validation.message});
            const updatedFighter = await this.ModelFighter.updateFighter({id, fighter: validation.data});
            if(updatedFighter.error) return res.status(400).json({error: updatedFighter.error});
            if(updatedFighter.message) return res.status(404).json({error: updatedFighter.message});
            return res.status(200).json({
                message: 'Luchador actualizado correctamente',
                data: updatedFighter.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para eliminar un luchador
    deleteFighter = async (req, res) => {
        const { id } = req.params;
        try{
            const deletedFighter = await this.ModelFighter.deleteFighter({id});
            if(deletedFighter.error) return res.status(400).json({error: deletedFighter.error});
            if(deletedFighter.message) return res.status(200).json({message: deletedFighter.message});
        }
        catch(error){
            console.error(error);
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para marcar o desmarcar un luchador como favorito para un usuario    
    toggleFavoriteFighter = async (req, res) => {
        const {fighter_id, user_id, is_favorite} = req.body;
        try{
            const favorite = await this.ModelFighter.toggleFavoriteFighter({fighter_id, user_id, is_favorite});
            if(favorite.error) return res.status(400).json({error: favorite.error});
            if(favorite.exists) return res.status(409).json({exists: favorite.exists});
            return res.status(200).json({
                message: favorite.message
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para bloquear o desbloquear un luchador (solo admin)
    toggleBlockedFighter = async (req, res) => {
        const { id, is_blocked } = req.body;
        try{
            const blockedFighter = await this.ModelFighter.toggleBlockedFighter({id, is_blocked});
            if(blockedFighter.error) return res.status(400).json({error: blockedFighter.error});
            if(blockedFighter.message) return res.status(404).json({message: blockedFighter.message});
            return res.status(200).json({
                message: is_blocked ? 'Luchador bloqueado con éxito' : 'Luchador desbloqueado con éxito',
                data: blockedFighter.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }
}