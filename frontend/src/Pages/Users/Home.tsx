import { Header } from "../../components/Home/Header"
import { SideBar } from "../../components/SideBar"
import { SectionHome } from "../../components/Home/SectionHome"
export function Home(){
    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Header/>
            <main className="w-full h-9/10 flex">
                <SideBar/>
                <SectionHome/>
            </main>
        </div>
    )
}