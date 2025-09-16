import {db} from '../DB.mjs';
import bcrypt from 'bcryptjs';

export class ModelUser{
    // Método para el registro de un usuario
    static async registerUser({user}){
        if(!user) return {error: 'Los datos del usuario no ha sido propocionados'};
        const {name_user, email_user, password_user, username_user} = user;
        // Verificamos si ya existe el usuario en el sistema
        const existingUser = await db.query(
            `SELECT * FROM users WHERE email_user = $1 AND username_user = $2`,
            [email_user, username_user]
        );
        if(existingUser.rowCount > 0) return {message: 'Ya existe un usuario con ese email o username'};
        // Si el usuario no existen, Insertamos el nuevo usuario
        const hashedPassword = await bcrypt.hash(password_user, 10);
        const newUser = await db.query(
            `INSERT INTO users (name_user, email_user, password_user, username_user)
            VALUES($1,$2,$3,$4) RETURNING *`,
            [name_user, email_user, hashedPassword, username_user]
        );
        if(newUser.rowCount === 0) return {error: 'No se ha podido registrar el usuario'};
        console.log('Usuario registrado con éxito');
        return newUser.rows[0];
    }

    // Metodo para el login del usuario
    static async loginUser({user}){
        if(!user) return {error: 'Los datos del usuario no ha sido propocionados'};
        const {email_user, password_user} = user;
        // Verificamos si el usuario existe en el sistema
        const existingUser = await db.query(
            `SELECT * FROM users WHERE email_user = $1`,
            [email_user]
        );
        if(existingUser.rowCount === 0) return {message: "El usuario no existe"};
        // Si el usuario existe, se compara la contraseña
        const userId = existingUser.rows[0].id_user;
        const isPasswordValid = await bcrypt.compare(password_user, existingUser.rows[0].password_user);
        if(isPasswordValid){
            // Si la contraseña es valida, se comprueba si el usuario ya habia loguado antes
            const isLoggedIn = await db.query(
                `SELECT * FROM session_users WHERE user_id = $1`,
                [userId]
            )
            if(isLoggedIn.rowCount > 0){
                // Actualizamos la fila del usuario en especifico
                await db.query(
                    `UPDATE session_users SET is_active = true WHERE user_id = $1`,
                    [userId]
                )
            }
            else{
                // Insertamos una nueva fila en la tabla session_users
                await db.query(
                    `INSERT INTO session_users (user_id, is_active) VALUES($1, true)`,
                    [userId]
                )
            }
            console.log("Usuario logueado con éxito");
            return existingUser.rows[0];
        }
    }

    // Método para el logout del usuario
    static async logoutUser({email_user}){
        if(!email_user) return {error: 'El email del usuario no ha sido propocionado'};
        // Verificamos si el usuario existe en el sistema
        const existingUser = await db.query(
            `SELECT * FROM users WHERE email_user = $1`,
            [email_user]
        );
        if(existingUser.rowCount === 0) return {message: "El usuario no existe"};
        const userId = existingUser.rows[0].id_user;
        // Actualizamos la tabla session_users para cerrar la sesión del usuario
        const Logout = await db.query(
            `UPDATE session_users SET is_active = false WHERE user_id = $1`,
            [userId]
        );
        if(Logout.rowCount === 0) return {error: 'Hubo un problema a la hora de cerrar sesión'}
        return {out: "Cierre de Sesión con éxito"}
    }
}