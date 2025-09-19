import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { validImageExtensions, validVideoExtensions } from '../utils.mjs';

const uploadVideoDir = path.resolve('uploads/videos');
const uploadImageDir = path.resolve('uploads/notices');

// Middleware para manejar la subida de un video y una imagen de una noticia
export const uploadNoticeMedia = (req, res, next) => {
    if(!fs.existsSync(uploadVideoDir)){
        fs.mkdirSync(uploadVideoDir, {recursive: true});
    }
    if(!fs.existsSync(uploadImageDir)){
        fs.mkdirSync(uploadImageDir, {recursive: true});
    }
    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                if(file.fieldname === 'video_notice'){
                    cb(null, uploadVideoDir);
                }
                else if(file.fieldname === 'image_notice'){
                    cb(null, uploadImageDir);
                }
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        }),
        limits: {
            fileSize: (file) => {
                return file.fieldname === 'video_notice' ?
                50 * 1024 * 1024 : // Limite de 50MB para videos
                5 * 1024 * 1024;   // Limite de 5MB para imágenes
            }
        },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if(file.fieldname === 'video_notice' && !validVideoExtensions.includes(ext)){
                return cb(new Error('Solo se permiten videos de tipo mp4, mov, avi, mkv, wmv'));
            }else{
                cb(null, true);
            }
            if(file.fieldname === 'image_notice' && !validImageExtensions.includes(ext)){
                return cb(new Error('Solo se permiten imágenes de tipo jpg, jpeg, png, gif, avid, webp'));
            }else{
                cb(null, true);
            }
        }
    }).fields([
        {name: 'video_notice', maxCount: 1},
        {name: 'image_notice', maxCount: 1}
    ]);

    // Ejecuto el middleware de subida
    upload(req, res, (err) => {
        if(err){
            return res.status(400).json({error: err.message});
        }
        next();
    });
}