import {Router} from 'express';
import { ControllerNotices } from '../controller/ControllerNotice.mjs';
import { ModelNotice } from '../models/Notices.mjs';
import { uploadNoticeMedia } from '../middlwares/SubVideo.mjs';
import { verifyToken } from '../middlwares/MidAuth.mjs';

export const RouteNotices = Router();
const controllerNotices = new ControllerNotices({ModelNotice: ModelNotice});

// Rutas para las noticias
// Ruta para obtener todas las noticias
RouteNotices.get('/all',verifyToken, controllerNotices.getAllNotices);
// Ruta para obtener una noticia por su ID
RouteNotices.get('/notice/:id', verifyToken, controllerNotices.getNoticesById);
// Ruta para crear una noticia (con subida de video e imagen)
RouteNotices.post('/create', uploadNoticeMedia, controllerNotices.createNotice);
// Ruta para actualizar una noticia por su ID (con subida de video e imagen)
RouteNotices.patch('/update/:id', uploadNoticeMedia, controllerNotices.updateNotice);
// Ruta para eliminar una noticia por su ID
RouteNotices.delete('/delete/:id', controllerNotices.deleteNotice);