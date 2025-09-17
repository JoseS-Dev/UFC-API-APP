import {Router} from 'express';
import { ControllerEvents } from '../controller/ControllerEvent.mjs';
import { ModelEvent } from '../models/Event.mjs';
import { uploadEventImage } from '../middlwares/SubImage.mjs';

export const RoutesEvent = Router();
const controllerEvents = new ControllerEvents({ModelEvent: ModelEvent});

// Rutas para manejar los eventos
// Ruta para obtener todos los eventos
RoutesEvent.get('/', controllerEvents.getAllEvents);
// Ruta para obtener un evento por su ID
RoutesEvent.get('/:id', controllerEvents.getEventsById);
// Ruta para obtener eventos por el pais donde se va a realizar
RoutesEvent.get('/country/:country_event', controllerEvents.getEventsByCountry);
// Ruta para crear un nuevo evento con imagen
RoutesEvent.post('/create', uploadEventImage, controllerEvents.createEvent);
// Ruta para actualizar un evento por su ID con imagen
RoutesEvent.patch('/update/:id', uploadEventImage, controllerEvents.updateEvent);
// Ruta para eliminar un evento por su ID
RoutesEvent.delete('/delete/:id', controllerEvents.deleteEvent);