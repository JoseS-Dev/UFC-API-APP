import { Banner } from "../components/Landing/Banner"
import { Header } from "../components/Landing/Header"
import { About } from "../components/Landing/About"
import { Fighters } from "../components/Landing/Fighters"
import { Events } from "../components/Landing/Events"
import { News } from "../components/Landing/news"

export function Landing(){
    return (
        <main className="w-full h-auto flex flex-col relative">
            <Header/>
            <Banner/>
            <About/>
            <Fighters/>
            <Events/>
            <News/>
        </main>
    )
}