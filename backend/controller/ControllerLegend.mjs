import { validateLegendData, validateLegendUpdateData } from "../validations/SchemaLegends.mjs";

export class ControllerLegends {
    constructor({ModelLegend}){
        this.ModelLegend = ModelLegend;
    }

    // Controlador para obtener todas las leyendas
    getAllLegends = async (req, res) => {
        try{
            const legends = await this.ModelLegend.getAllLegends();
            if(legends.message) return res.status(404).json({message: legends.message});
            return res.status(200).json({
                message: 'Leyendas obtenidas correctamente',
                data: legends.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener una leyenda por su ID
    getLegendById = async (req, res) => {
        const { id } = req.params;
        try{
            const legend = await this.ModelLegend.getLegendById({id});
            if(legend.error) return res.status(400).json({error: legend.error});
            if(legend.message) return res.status(404).json({message: legend.message});
            return res.status(200).json({
                message: 'Leyenda obtenida correctamente',
                data: legend.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener a todas las leyendas favoritos de un usuario
    getFavoriteLegendsByUser = async (req, res) => {
        const { user_id } = req.params;
        try{
            const legends = await this.ModelLegend.getFavoriteLegendsByUser({user_id});
            if(legends.error) return res.status(400).json({error: legends.error});
            if(legends.message) return res.status(404).json({message: legends.message});
            return res.status(200).json({
                message: `Leyendas favoritas del usuario ${user_id} obtenidas correctamente`,
                data: legends.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para obtener a todas las leyendas de un pais
    getLegendsByCountry = async (req, res) => {
        const { country_legend} = req.params;
        try{
            const legends = await this.ModelLegend.getLegendsByCountry({country_legend});
            if(legends.error) return res.status(400).json({error: legends.error});
            if(legends.message) return res.status(404).json({message: legends.message});
            return res.status(200).json({
                message: `Leyendas del pais ${country_legend} obtenidas correctamente`,
                data: legends.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para marcar o desmarcar una leyenda como favorito para un usuario
    toggleFavoriteLegend = async (req, res) => {
        const { user_id, legend_id, is_favorite } = req.body;
        try{
            const favorite = await this.ModelLegend.toggleFavoriteLegend({user_id, legend_id, is_favorite});
            if(favorite.error) return res.status(400).json({error: favorite.error});
            return res.status(200).json({
                message: favorite.message
            });
        } 
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para registrar una nueva leyenda
    createLegend = async (req, res) => {
        if(!req.file) return res.status(400).json({error: 'La imagen de la leyenda es requerida'});
        const LegendData = {
            ...req.body,
            weight_legend: parseFloat(req.body.weight_legend),
            height_legend: parseFloat(req.body.height_legend),
            title_win_legend: parseInt(req.body.title_win_legend),
            trophys_legend: parseInt(req.body.trophys_legend),
            image_legend: req.file.path
        }
        const validation = validateLegendData(LegendData);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error});
            const newLegend = await this.ModelLegend.createLegend({legend: validation.data});
            if(newLegend.error) return res.status(400).json({error: newLegend.error});
            if(newLegend.message) return res.status(400).json({message: newLegend.message});
            return res.status(201).json({
                message: 'Leyenda creada correctamente',
                data: newLegend.data
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para actaulizar una leyenda ya existente
    updateLegend = async (req, res) => {
        if(!req.file) return res.status(400).json({error: 'La imagen de la leyenda es requerida'});
        const { id } = req.params;
        const LegendData = {
            ...req.body,
            weight_legend: parseFloat(req.body.weight_legend),
            height_legend: parseFloat(req.body.height_legend),
            title_win_legend: parseInt(req.body.title_win_legend),
            trophys_legend: parseInt(req.body.trophys_legend),
            image_legend: req.file.path
        }
        const validation = validateLegendUpdateData(LegendData);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error});
            const updatedLegend = await this.ModelLegend.updatedLegend({id, legend: validation.data});
            if(updatedLegend.error) return res.status(400).json({error: updated.error});
            return res.status(200).json({
                message: updatedLegend.message
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }

    // Controlador para eliminar una leyenda
    deleteLegend = async (req, res) => {
        const { id } = req.params;
        try{
            const deletedLegend = await this.ModelLegend.deleteLegend({id});
            if(deletedLegend.error) return res.status(400).json({error: deletedLegend.error});
            return res.status(200).json({
                message: deletedLegend.message
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error del servidor'});
        }
    }
}