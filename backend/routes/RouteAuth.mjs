import {Router} from 'express';
import {verifyToken} from '../middlwares/MidAuth.mjs';
import {ControllerUsers} from '../controller/ControllerAuth.mjs';
import {ModelUser} from '../models/Auth.mjs';

export const RouteUser = Router();

const controllerUsers = new ControllerUsers({ModelUser: ModelUser});

// Rutas

// Ruta para el registro del usuario
RouteUser.post('/register', controllerUsers.registerUser);
// Ruta para el login del usuario
RouteUser.post('/login', controllerUsers.loginUser);
// Ruta para el cierre de sesión del usuario
RouteUser.post('/logout', controllerUsers.logoutUser);
// Ruta para verificar si el usuario está autenticado
RouteUser.post('/verify', verifyToken, controllerUsers.verifyAuth);