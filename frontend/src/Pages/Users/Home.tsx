import { Header } from "../../components/Home/Header"
import { SideBar } from "../../components/SideBar"
export function Home(){
    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Header/>
            <main className="w-full h-9/10 flex">
                <SideBar/>
            </main>
        </div>
    )
}