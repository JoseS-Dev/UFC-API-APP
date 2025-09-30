import { ArrowLeft, ArrowRight } from "../../assets/Icon/Arrow"
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
            <article className="w-full border-white border-2 h-4/5 flex p-2">
                <div className="w-2/5 h-full border-r-2 border-red-600 p-2 flex flex-col gap-1.5">
                    <h3 className="text-xl tracking-normal w-full border-b-2 border-red-500">Latest Events</h3>
                    <div className="border-b-2 border-red-600 w-full h-11/12 flex flex-col 
                    items-center justify-evenly gap-2.5 p-1 overflow-y-auto">
                        <div className="w-full min-h-2/6 border-b-2 border-t-2 border-red-500
                        flex rounded-2xl">
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
                        <div className="w-full min-h-2/6 border-b-2 border-t-2 border-red-500
                        flex rounded-2xl">
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
                        <div className="w-full min-h-2/6 border-b-2 border-t-2 border-red-500
                        flex rounded-2xl">
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
                <div></div>
            </article>
        </section>
    )
}