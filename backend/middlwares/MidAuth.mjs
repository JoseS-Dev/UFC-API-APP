import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Función para asignar el token al usuario
export function generateToken(user){
    if(!user) return null;
    const token = jwt.sign(
        {id: user.id_user, email_user: user.email_user, rol_user: user.rol_user},
        process.env.JWT_SECRET,
        {expiresIn: '3h'}
    )
    return token;
}

// Middleware para verificar si el usuario está autenticado
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: 'No autorizado'});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({error: 'Token inválido'});
    }
}