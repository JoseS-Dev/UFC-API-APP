import { validateNoticeData, validateUpdateNoticeData } from "../validations/SchemaNotices.mjs";

export class ControllerNotices {
    constructor({ModelNotice}){
        this.ModelNotice = ModelNotice;
    };

    // Controlador para obtener todas las noticias
    getAllNotices = async (req, res) => {
        try{
            const notices = await this.ModelNotice.getAllNotices();
            if(notices.message) return res.status(400).json({message: notices.message});
            return res.status(200).json({
                message: 'Noticias obtenidas correctamente',
                data: notices.data
            });
        }
        catch(error){
            return res.status(500).json({message: 'Error Interno del servidor'})
        }
    }

    // Controlador para obtener una noticia por su ID
    getNoticesById = async (req, res) => {
        const { id } = req.params;
        try{
            const notice = await this.ModelNotice.getNoticeById({id});
            if(notice.error) return res.status(400).json({error: notice.error});
            if(notice.message) return res.status(404).json({message: notice.message});
            return res.status(200).json({
                message: 'Noticia obtenida correctamente',
                data: notice.data
            });
        }
        catch(error){
            return res.status(500).json({message: 'Error Interno del servidor'})
        }
    }

    // Controlador para crear una noticia
    createNotice = async (req, res) => {
        if(!req.files) return res.status(400).json({error: 'No se ha subido ningún archivo'});
        const image_notice = req.files['image_notice'][0]
        const video_notice = req.files['video_notice'][0]
        const DataNotices = {
            ...req.body,
            image_notice: image_notice ? image_notice.path : null,
            video_notice: video_notice ? video_notice.path : null
        }
        const validation = validateNoticeData(DataNotices);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const newNotice = await this.ModelNotice.createNotice({notice: validation.data});
            if(newNotice.error) return res.status(400).json({error: newNotice.error});
            if(newNotice.message) return res.status(409).json({message: newNotice.message});
            return res.status(201).json({
                message: 'Noticia creada correctamente',
                data: newNotice.data
            });
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Error Interno del servidor'})
        }
    }

    // Controlador para actualizar una noticia
    updateNotice = async (req, res) => {
        if(!req.files) return res.status(400).json({error: 'No se ha subido ningún archivo'});
        const { id } = req.params;
        const image_notice = req.files['image_notice'][0]
        const video_notice = req.files['video_notice'][0]
        const DataNotice = {
            ...req.body,
            image_notice: image_notice ? image_notice.path : null,
            video_notice: video_notice ? video_notice.path : null
        }
        const validation = validateUpdateNoticeData(DataNotice);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const updatedNotice = await this.ModelNotice.updateNotice({id, notice: validation.data});
            if(updatedNotice.error) return res.status(400).json({error: updatedNotice.error});
            return res.status(200).json({
                message: updatedNotice.message
            })

        }
        catch(error){
            return res.status(500).json({message: 'Error Interno del servidor'})
        }
    }

    // Controlador para eliminar una noticia
    deleteNotice = async (req, res) => {
        const { id } = req.params;
        try{
            const deletedNotice = await this.ModelNotice.deleteNotice({id});
            if(deletedNotice.error) return res.status(400).json({error: deletedNotice.error});
            return res.status(200).json({
                message: deletedNotice.message
            });
        }
        catch(error){
            return res.status(500).json({message: 'Error Interno del servidor'})
        }
    }
}