import { ArrowLeft, ArrowRight } from "../../assets/Icon/Arrow"
import { Link } from "react-router-dom"

export function SectionHome(){
    return (
        <section className="h-full w-4/5 p-3 flex flex-col gap-1.5">
            <article className="h-2/5 w-full border-b-2 border-red-800  p-4 flex flex-col 
            gap-3 items-center">
                <div className="w-full h-9 border-b-2 border-red-800 flex items-center 
                justify-between">
                    <h2 className="text-xl font-semibold">Latest News</h2>
                    <div className="w-1/10 h-full flex items-center justify-center
                    gap-5">
                        <ArrowLeft/>
                        <ArrowRight/>
                    </div>
                </div>
                <div className="w-full flex justify-around 
                h-11/12 overflow-hidden gap-4 items-center p-1">
                    <div className="relative min-w-3/10 h-full
                    rounded-2xl flex flex-col items-center hover:scale-95
                    transition-transform duration-300 cursor-pointer">
                        <img
                            src="../../public/images/image.png"
                            alt="news image"
                            className="w-full h-full"
                        />
                        <span className="z-10 text-2xl absolute p-1">KO de Oliverias</span>
                    </div>
                </div>
            </article>
            <article className="w-full h-4/5 flex p-2">
                <div className="w-2/5 h-full border-r-2 border-red-600 p-2 flex flex-col gap-1.5">
                    <h3 className="text-xl tracking-normal w-full border-b-2 border-red-500">Latest Events</h3>
                    <div className="border-b-2 border-red-600 w-full h-11/12 flex flex-col 
                    items-center justify-evenly gap-2.5 p-1 overflow-y-auto">
                        <div className="w-full min-h-2/6 border-b-2 border-t-2 border-red-500
                        flex rounded-2xl hover:scale-95 transition-transform duration-300 cursor-pointer">
                            <figure className="w-3/10 h-full border-r-2 border-red-500 bg-black rounded-2xl">
                                <img src="../../public/images/image.png" alt="event image" className="w-full h-full opacity-50"/>
                            </figure>
                            <div className="w-7/10 h-full p-2 flex flex-col">
                                <h4 className="text-lg italic">UFC - 292</h4>
                                <span className="flex gap-2"><strong className="text-yellow-500">
                                    Main Event:</strong>Diego Lopez vs John Silva</span>
                                <span className="flex gap-2"><strong className="text-red-500">
                                    CO-Main Event:</strong>Jessica Andrade vs Zhang Weili</span>
                                <span className="flex gap-2"><strong>
                                    Date:</strong>09/10/2023</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 h-full flex flex-col items-center gap-1.5">
                    <div className="w-full h-30 border-b-2 border-red-600 flex flex-col p-1.5">
                        <h4 className="text-xl tracking-normal border-b-2 border-red-600 px-2">
                            Profile Data
                        </h4>
                        <div className="w-full h-4/5 flex">
                            <div className="w-2/5 h-full flex flex-col p-2 items-center">
                                <div className="h-auto flex gap-2">
                                    <span>Name: Jose Angel</span>
                                    <span>Username: SenkuJS</span>
                                </div>
                                <span>Email: joseasantana05@gmail.com</span>
                                <span>Member since: 2023</span>
                            </div>
                            <div className="w-3/5 h-full flex justify-evenly items-center">
                                <Link to="/edit-profile" className="text-lg text-white w-2/5
                                h-14 bg-red-900 flex items-center justify-center rounded-2xl hover:scale-95
                                hover:bg-red-800 transition-transform duration-300">Edit Profile</Link>
                                <Link to="/view-profile" className="text-lg text-white w-2/5
                                h-14 bg-red-900 flex items-center justify-center rounded-2xl hover:scale-95
                                hover:bg-red-800 transition-transform duration-300">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-10/12 flex flex-col p-1.5 gap-1">
                        <h4 className="text-xl tracking-normal border-b-2 border-red-600 px-2">
                            Your Favorites Fighters and Legend
                        </h4>
                        <div className="w-full h-11/12 flex gap-9 overflow-hidden 
                        justify-evenly items-center px-5">
                            <figure className="min-w-1/6 rounded-2xl h-11/12 
                            border-2 border-amber-100 relative flex flex-col 
                            items-center justify-end bg-black hover:scale-95 transition-transform duration-300 cursor-pointer">
                                <img src="../../public/image.png" alt="Favorite Fighter" className="w-full h-full opacity-65"/>
                                <span className="text-gray-300 z-10 absolute italic text-lg mb-2">The Rush</span>
                            </figure>
                            <figure className="min-w-1/6 rounded-2xl h-11/12 
                            border-2 border-amber-100 relative flex flex-col 
                            items-center justify-end bg-black hover:scale-95 transition-transform duration-300 cursor-pointer">
                                <img src="../../public/image.png" alt="Favorite Fighter" className="w-full h-full opacity-65"/>
                                <span className="text-gray-300 z-10 absolute italic text-lg mb-2">The Rush</span>
                            </figure>
                            <figure className="min-w-1/6 rounded-2xl h-11/12 
                            border-2 border-amber-100 relative flex flex-col 
                            items-center justify-end bg-black hover:scale-95 transition-transform duration-300 cursor-pointer">
                                <img src="../../public/image.png" alt="Favorite Fighter" className="w-full h-full opacity-65"/>
                                <span className="text-gray-300 z-10 absolute italic text-lg mb-2">The Rush</span>
                            </figure>
                            <figure className="min-w-1/6 rounded-2xl h-11/12 
                            border-2 border-amber-100 relative flex flex-col 
                            items-center justify-end bg-black hover:scale-95 transition-transform duration-300 cursor-pointer">
                                <img src="../../public/image.png" alt="Favorite Fighter" className="w-full h-full opacity-65"/>
                                <span className="text-gray-300 z-10 absolute italic text-lg mb-2">The Rush</span>
                            </figure>
                            <figure className="min-w-1/6 rounded-2xl h-11/12 
                            border-2 border-amber-100 relative flex flex-col 
                            items-center justify-end bg-black hover:scale-95 transition-transform duration-300 cursor-pointer">
                                <img src="../../public/image.png" alt="Favorite Fighter" className="w-full h-full opacity-65"/>
                                <span className="text-gray-300 z-10 absolute italic text-lg mb-2">The Rush</span>
                            </figure>
                            <figure className="min-w-1/6 rounded-2xl h-11/12 
                            border-2 border-amber-100 relative flex flex-col 
                            items-center justify-end bg-black hover:scale-95 transition-transform duration-300 cursor-pointer">
                                <img src="../../public/image.png" alt="Favorite Fighter" className="w-full h-full opacity-65"/>
                                <span className="text-gray-300 z-10 absolute italic text-lg mb-2">The Rush</span>
                            </figure>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}