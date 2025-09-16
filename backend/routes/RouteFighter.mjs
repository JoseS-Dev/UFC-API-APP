import {Router} from 'express';
import { uploadFighterImage } from '../middlwares/SubImage.mjs';
import { ControllerFighters } from '../controller/ControllerFighter.mjs';
import { ModelFighter } from '../models/Fighter.mjs';

export const RoutesFighter = Router();
const controllerFighter = new ControllerFighters({ModelFighter: ModelFighter});

// Rutas para manejar luchadores

// Ruta para obtener a todos los luchadores
RoutesFighter.get('/all', controllerFighter.getAllFighters);
// Ruta para obtener a un luchador por su ID
RoutesFighter.get('/fighter/:id', controllerFighter.getFighterById);
// Ruta para obtener a un luchador por su apodo
RoutesFighter.get('/nickname/:nickname_fighter', controllerFighter.getFighterByNickname);
// Ruta para obtener a los luchadores favoritos de un usuario
RoutesFighter.get('/favorites/:user_id', controllerFighter.getFavoriteFightersByUser);
// Ruta para obtener a los luchadores blockeados
RoutesFighter.get('/blocked', controllerFighter.getBlockedFighters);

// POST
// Ruta para crear un nuevo luchador con imagen
RoutesFighter.post('/create', uploadFighterImage, controllerFighter.createFighter);
// Ruta para actualizar un luchador por su ID con imagen
RoutesFighter.patch('/update/:id', uploadFighterImage, controllerFighter.updatedFighter);
// Ruta para eliminar un luchador por su ID
RoutesFighter.delete('/delete/:id', controllerFighter.deleteFighter);