import {Router} from "express";
import { ControllerFights } from "../controller/ControllerFight.mjs";
import { ModelFight } from "../models/Fight.mjs";

export const RoutesFight = Router();
const controllerFight = new ControllerFights({ModelFight: ModelFight});

// Rutas para las peleas
// Ruta para obtener todas las peleas
RoutesFight.get('/all', controllerFight.getAllFights);
// Ruta para obtener una pelea por su ID
RoutesFight.get('/fight/:id', controllerFight.getFightById);
// Ruta para obtener todas las peleas de un evento
RoutesFight.get('/event/:event_id', controllerFight.getFightsByEvent);
// Ruta para crear una nueva pelea
RoutesFight.post('/create', controllerFight.createFight);
// Ruta para actualizar una pelea
RoutesFight.patch('/update/:id', controllerFight.updateFight);
// Ruta para eliminar una pelea
RoutesFight.delete('/delete/:id', controllerFight.deleteFight);