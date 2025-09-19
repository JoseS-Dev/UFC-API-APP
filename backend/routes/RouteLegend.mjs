import {Router} from 'express';
import {ControllerLegends} from '../controller/ControllerLegend.mjs';
import { ModelLegend } from '../models/Legend.mjs';
import { uploadLegendImage } from '../middlwares/SubImage.mjs';

export const RoutesLegend = Router();
const controllerlegends = new ControllerLegends({ModelLegend: ModelLegend});

// Rutas
// Ruta para obtener todas las leyendas
RouteLegend.get('/all', controllerlegends.getAllLegends);
// Ruta para obtener una leyenda por su ID
RouteLegend.get('/legend/:id', controllerlegends.getLegendById);
// Ruta para obtener a todas las leyendas favoritas de un usuario
RouteLegend.get('/favorites/:user_id', controllerlegends.getFavoriteLegendsByUser);
// Ruta para obtener a todas las leyendas de un pais
RouteLegend.get('/country/:country_legend', controllerlegends.getLegendsByCountry);
// Ruta para crear una nueva leyenda
RouteLegend.post('/create', uploadLegendImage, controllerlegends.createLegend);
// Ruta para actualizar una leyenda
RouteLegend.put('/update/:id', uploadLegendImage, controllerlegends.updateLegend);
// Ruta para eliminar una leyenda
RouteLegend.delete('/delete/:id', controllerlegends.deleteLegend);