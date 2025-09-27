import type { UserData, LoginData } from "../Interfaces/Users";
import { fetchWithToken } from "../auth";

// Servicio para el registro del usuario
export async function registerUser(userData: UserData){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if(!response.ok) throw new Error('Error registering user');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}

// Servicio para el Login del usuario
export async function LoginUser(LoginData: LoginData){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(LoginData)
        })
        if(!response.ok) throw new Error('Error logging in user');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}

// Servicio para cerrar la sesión del usuario
export async function LogoutUser(email_user: string){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_user: email_user })
        });
        if(!response.ok) throw new Error('Error logging out user');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}

// Servicio para verficar si el usuario está autenticado
export async function verifyAuth(){
    try{
        const response = await fetchWithToken(`${import.meta.env.VITE_APP_URL}/api/auth/verify`, {
            method: 'POST'
        });
        if(!response?.ok) throw new Error('Error verifying user authentication');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}