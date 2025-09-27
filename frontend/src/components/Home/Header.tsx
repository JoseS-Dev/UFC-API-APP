import { LogoutUser } from "../../services/ServicesUser"
import swal from "sweetalert2";
import { useNavigate } from "react-router";

export function Header(){
    const navigate = useNavigate();
    const handleLogout = async () => {
        const email_user = JSON.parse(localStorage.getItem('user') || '{}').data.email_user;
        try{
            const response = await LogoutUser(email_user);
            if(response.error) swal.fire({
                icon: 'error',
                title: 'Logout Error',
                text: `${response.error}`
            })
            else if(response.message) swal.fire({
                icon: 'warning',
                title: 'Internal Error',
                text: `${response.message}`
            })
            else{
                await swal.fire({
                    icon: 'success',
                    title: 'Logout Successful',
                    text: `${response.outLogout}`
                });
                localStorage.clear();
                navigate('/Login');
            }
        }
        catch(error){
            console.error('Error logging out user:', error);
            swal.fire({
                icon: 'error',
                title: 'Logout Error',
                text: 'Error logging out user'
            });
        }
    }
    return (
        <header className="w-full h-1/10 border-b-2 border-red-700 flex 
        items-center justify-between px-7">
            <h1 className="text-3xl tracking-normal">
                UFC-<strong className="text-red-600">API</strong>
            </h1>
            <button className="w-45 h-14 rounded-xl
            bg-red-700 font-bold text-lg hover:bg-red-900
            hover:scale-105 cursor-pointer transition-transform"
            onClick={handleLogout}
            >
                Logout
            </button>
        </header>
    )
}