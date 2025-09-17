import {Router} from 'express';
import { ControllerStadistic } from '../controller/ControllerStadistic.mjs';
import { ModelStadistic } from '../models/stadistic.mjs';

export const RoutesStadistic = Router();
const controllerStadistic = new ControllerStadistic({ModelStadistic: ModelStadistic});

// Rutas
// Ruta para obtener las estadisticas de un luchador por su ID
RoutesStadistic.get('/fighter/:fighter_id', controllerStadistic.getStadisticByFighter);
// Ruta para obtener las estadisticas de un luchador por su ranking en la UFC
RoutesStadistic.get('/ranking/:ranking_fighter', controllerStadistic.getStadisticByRanking);
// Ruta para crear las estadisticas de un luchador (solo admin)
RoutesStadistic.post('/create', controllerStadistic.createStadistic);
// Ruta para actualizar las estadisticas de un luchador (solo admin)
RoutesStadistic.patch('/update/:fighter_id', controllerStadistic.updateStadistic);
// Ruta para eliminar las estadisticas de un luchador (solo admin)
RoutesStadistic.delete('/delete/:fighter_id', controllerStadistic.deleteStadistic);