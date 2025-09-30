import { Link } from "react-router-dom";
import { FightersIcon, UserIcon } from "../assets/Icon/FightersIcon";
import { EventsIcon } from "../assets/Icon/EventsIcon";
import { NewsIcon } from "../assets/Icon/NewsIcon";
import { FightIconHome } from "../assets/Icon/FightIcon";
import { SettingsIcon } from "../assets/Icon/SettingsIcon";
import { StarIcon } from "../assets/Icon/FavoritesIcon";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function SideBar({ handleLogout }: {handleLogout: () => Promise<any>}){
    const navigate = useNavigate();
    const handleLogoutClick = async () => {
        try{
            const response = await handleLogout();
            if(response.outLogout) {
                await swal.fire({
                    icon: 'success',
                    title: 'Logout successful',
                    text: response.outLogout
                })
                localStorage.clear();
                navigate('/');
            }
            else{
                swal.fire({
                    icon: 'error',
                    title: 'Logout failed',
                    text: response.error || response.message
                })
            }
        }
        catch(error){
            console.error("Error during logout:", error);
        }
    }
    
    return (
        <aside className="border-r-2 border-red-900 w-1/5 flex flex-col items-center justify-around
         p-4 gap-2">
            <h2 className="text-2xl w-full border-b-2 border-red-900 px-1">
                UFC - <strong className="text-red-500">API</strong>
            </h2>
            <ul className="list-none w-full h-10/12 flex flex-col items-center 
            justify-evenly p-1">
                <Link to="/fighters" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <FightersIcon />
                    <span className="text-xl tracking-normal font-semibold">Fighters</span>
                </Link>
                <Link to="/legends" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95
                transition-transform duration-300">
                    <FightersIcon />
                    <span className="text-xl tracking-normal font-semibold">Legends</span>
                </Link>
                <Link to="/events" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <EventsIcon />
                    <span className="text-xl tracking-normal font-semibold">Events</span>
                </Link>
                <Link to="/news" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <NewsIcon />
                    <span className="text-xl tracking-normal font-semibold">News</span>
                </Link>
                <Link to="/fights" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <FightIconHome />
                    <span className="text-xl tracking-normal font-semibold">Fights</span>
                </Link>
                <Link to="/profile" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <UserIcon />
                    <span className="text-xl tracking-normal font-semibold">Profile</span>
                </Link>
                <Link to="/settings" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <SettingsIcon />
                    <span className="text-xl tracking-normal font-semibold">Settings</span>
                </Link>
                <Link to="/favorites" className="border-b-2 rounded-xl border-red-900 w-full h-1/5 
                flex items-center gap-5 px-4 hover:scale-95 transition-transform duration-300">
                    <StarIcon />
                    <span className="text-xl tracking-normal font-semibold">Favorites</span>
                </Link>
            </ul>
            <button onClick={handleLogoutClick}
            className="w-3/5 h-12 rounded-2xl text-lg bg-red-800 font-bold 
            text-gray-300 hover:bg-red-900 hover:scale-95 transition-transform 
            cursor-pointer duration-300">
                Logout
            </button>
        </aside>
    )
}