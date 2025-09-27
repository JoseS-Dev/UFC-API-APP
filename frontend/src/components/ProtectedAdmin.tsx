import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyAuth } from "../services/ServicesUser";
import { useNavigate } from "react-router-dom";

export function ProtectedAdmin(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const rol = JSON.parse(localStorage.getItem('user') || '{}').data.rol_user;

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await verifyAuth();
                if(response.isauthenticated && rol === 'admin') setIsAuthenticated(true);
            }
            catch(error){
                console.error('Error verifying authentication:', error);
                setIsAuthenticated(false);
                navigate('/Login');
            }
            finally{
                setLoading(false);
            }
        }
        checkAuth();
    }, [])

    return (
        <>
            {isAuthenticated && !loading ? (
                <Outlet/>
            ): (
                <div className="flex items-center justify-center w-full h-screen">
                    {rol === 'user' ? (
                        <h3 className="text-3xl text-red-600 tracking-widest">
                            Access Denied: Users do not have permission to access this page.
                        </h3>
                    ) : (
                        <h3 className="text-3xl text-red-600 tracking-widest">Loading...</h3>
                    )}
                </div>
            )}
        </>
    )
}