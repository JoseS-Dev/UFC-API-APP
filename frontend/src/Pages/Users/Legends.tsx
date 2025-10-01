import { Header } from "../../components/Home/Header"
import { SideBar } from "../../components/SideBar"
import { SectionLegends } from "../../components/Home/SectionLegends";
import { useUserContext } from "../../context/UserContext"
export function Legends(){
    const { user, handleLogout } = useUserContext()!;
    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Header user={user}/>
            <main className="w-full h-11/12 flex">
                <SideBar handleLogout={handleLogout}/>
                <SectionLegends />
            </main>
        </div>
    )
}