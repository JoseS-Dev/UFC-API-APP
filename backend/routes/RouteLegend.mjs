import {Router} from 'express';
import {ControllerLegends} from '../controller/ControllerLegend.mjs';
import { ModelLegend } from '../models/Legend.mjs';
import { uploadLegendImage } from '../middlwares/SubImage.mjs';

export const RoutesLegend = Router();
const controllerlegends = new ControllerLegends({ModelLegend: ModelLegend});

// Rutas
// Ruta para obtener todas las leyendas
RoutesLegend.get('/all', controllerlegends.getAllLegends);
// Ruta para obtener una leyenda por su ID
RoutesLegend.get('/legend/:id', controllerlegends.getLegendById);
// Ruta para obtener a todas las leyendas favoritas de un usuario
RoutesLegend.get('/favorites/:user_id', controllerlegends.getFavoriteLegendsByUser);
// Ruta para obtener a todas las leyendas de un pais
RoutesLegend.get('/country/:country_legend', controllerlegends.getLegendsByCountry);
// Ruta para crear una nueva leyenda
RoutesLegend.post('/create', uploadLegendImage, controllerlegends.createLegend);
// Ruta para actualizar una leyenda
RoutesLegend.patch('/update/:id', uploadLegendImage, controllerlegends.updateLegend);
// Ruta para eliminar una leyenda
RoutesLegend.delete('/delete/:id', controllerlegends.deleteLegend);
// Ruta para marcar o desmarcar una leyenda como favorita para un usuario
RoutesLegend.post('/favorite', controllerlegends.toggleFavoriteLegend);