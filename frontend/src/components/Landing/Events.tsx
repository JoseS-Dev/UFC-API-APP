import { Paragraphy } from "../../UI"
import { Link } from "react-router-dom"
import { Contact } from "./Contact"

export function Events(){
    return (
        <div className="w-full h-180 flex">
            <section id="events" className="w-2/5 h-full">
                <article className="relative w-full h-full bg-black flex 
                flex-col items-center">
                    <img className="max-w-full min-h-full opacity-55 absolute z-0"
                    src="../../public/Events.jpg"/>
                    <div className="absolute z-10 p-7 w-full h-full flex flex-col
                    gap-2 items-center">
                        <h3 className="text-3xl w-full border-b-2 border-red-500">
                            Latest Results & Past Events of the <strong className="text-red-600">UFC</strong> 
                        </h3>
                        <p className="w-full h-auto text-xl p-2 text-justify">
                            {Paragraphy.Events}
                        </p>
                        <Link to="/Events" className="bg-red-600 w-2/5 h-16 mt-3 text-xl font-bold 
                        rounded-2xl flex items-center justify-center
                        hover:bg-red-900 hover:scale-95 transition-transform cursor-pointer text-white">
                            View Events
                        </Link>
                    </div>
                </article>
            </section>
            <Contact/>
        </div>
    )
}