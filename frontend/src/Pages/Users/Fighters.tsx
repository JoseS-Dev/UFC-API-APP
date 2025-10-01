import { Header } from "../../components/Home/Header";
import { SideBar } from "../../components/SideBar";
import { SectionFighters } from "../../components/Home/SectionFighters";
import { useUserContext } from "../../context/UserContext";
export function Fighters(){
    const {user, handleLogout} = useUserContext()!;
    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Header user={user}/>
            <main className="w-full h-9/10 flex">
                <SideBar handleLogout={handleLogout} />
                <SectionFighters/>
            </main>
        </div>
    )
}