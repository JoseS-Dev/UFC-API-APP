import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { validImageExtensions } from '../utils.mjs';


// Función para reutilizar la configuración de multer
export function configureMulterUpload(directory){
    // Se verifica si existe dicho directorio,
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory, {recursive: true});
    }
    // Configuración del almacenamiento del multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })

    // Retorno la configuración del multer
    return multer({
        storage: storage,
        limits: {fileSize: 24 * 1024 * 1024}, // Limite de 24MB
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if(!validImageExtensions.includes(ext)){
                return cb(new Error('Solo se permiten imágenes de tipo jpg, jpeg, png, gif, avid, webp'));
            }
            cb(null, true);
        }
    })
}

// Configuración para subir imágenes de luchadores
const uploadDir = path.resolve('uploads/fighters');
const uploadDirEvents = path.resolve('uploads/events');

const multerImage = configureMulterUpload(uploadDir);
const multerImageEvents = configureMulterUpload(uploadDirEvents);

// Middleware para manejar la subida de una imagen de luchador
export const uploadFighterImage = multerImage.single('image_fighter');
export const uploadEventImage = multerImageEvents.single('image_event');