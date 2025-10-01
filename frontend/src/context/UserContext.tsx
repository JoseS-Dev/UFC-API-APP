import { createContext, useEffect, useState, useContext } from "react";
import type { UsersContextType } from "../Interfaces/Users";
import type { UserData } from "../Interfaces/Users";
import { LogoutUser } from "../services/ServicesUser";

export const userContext = createContext<UsersContextType | null>(null);

export function UserProvider({children}: {children: React.ReactNode}){
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
    const contextValue: UsersContextType = {
        user,
        handleLogout
    }
    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    )
    
}

// Consumo el contexto
export function useUserContext(){
    const context = useContext(userContext);
    return context;
}