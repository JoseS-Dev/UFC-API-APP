import { Banner } from "../components/Landing/Banner"
import { Header } from "../components/Landing/Header"
import { About } from "../components/Landing/About"
import { Fighters } from "../components/Landing/Fighters"
import { Events } from "../components/Landing/Events"

export function Landing(){
    return (
        <main className="w-full h-auto flex flex-col relative overflow-y-auto">
            <Header/>
            <Banner/>
            <About/>
            <Fighters/>
            <Events/>
        </main>
    )
}