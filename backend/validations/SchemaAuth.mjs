import zod from 'zod';

// Defino una esquema de validación para el registro de usuarios
export const registerSchema = zod.object({
    name_user: zod.string().min(3),
    email_user: zod.string().email(),
    password_user: zod.string().min(6),
    username_user: zod.string().min(3),
});

// Defino un esquema de validación para el login del usuario
export const schemaLogin = zod.object({
    emaiL_user: zod.string().email(),
    password_user: zod.string().min(6)
});

// Function que utilizamos para validar los datos en el registro
export function validateRegister(data){
    return registerSchema.safeParse(data);
}

// Function que utilizamos para validar los datos en el login
export function validateLogin(data){
    return schemaLogin.safeParse(data);
}
