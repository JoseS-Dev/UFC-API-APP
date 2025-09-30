import { createContext, useEffect, useState } from "react";
import type { UserData } from "../Interfaces/Users";
import { LogoutUser } from "../services/ServicesUser";

export const userContext = createContext<UserData | null>(null);

export function UserProvider(){
    const [user, setUser] = useState<UserData | null>(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if(storedUser && storedUser.data) setUser(storedUser.data);
    }, []);
    // Function para hacer el cierre de sesión del usuario
    const handleLogout = async () => {
        try{
            if(user){
                const response = await LogoutUser(user.email_user);
                return response
            }
        }catch(error){
            console.error("Error al cerrar sesión:", error);
        }
    }
    return { user, handleLogout };
}

// Consumo el contexto
export function useUserContext(){
    const context = UserProvider();
    return context;
}