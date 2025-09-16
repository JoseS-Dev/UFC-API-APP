import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { validImageExtensions } from '../utils.mjs';

const uploadDir = path.resolve('uploads/fighters');
// Aseguramos que el directorio de subida existe
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive: true});
};

// Configuración de Multer para manejar la subida de imagenes
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadDir);
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname)
    }
});

// Filtro para aceptar solo imagenes
const multerImage = multer({
    storage: storage,
    limits: {fileSize: 24 * 1024 * 1024}, // Limite de 24MB
    fileFilter: function(req, file, cb){
        const ext = path.extname(file.originalname).toLowerCase();
        if(!validImageExtensions.includes(ext)){
            return cb(new Error('Solo se permiten archivos de imagen que son .png, .jpg, .jpeg, .gif, .webp, .avif'));
        }
        cb(null, true);
    }
})

// Middleware para manejar la subida de una imagen de luchador
export const uploadFighterImage = multerImage.single('image_fighter');