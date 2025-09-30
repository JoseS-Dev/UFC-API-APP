import { ArrowLeft, ArrowRight } from "../../assets/Icon/Arrow"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react";
import { useNewsStore } from "../../context/NewsContext";
import { useFightersStore } from "../../context/FightersContext";
import { useEventsStore } from "../../context/EventsContext";
import type { UserData } from "../../Interfaces/Users"
import { ImagesForservices } from "../../UI";

export function SectionHome({user}: {user: UserData | null}){
    const { fetchAllNews, news} = useNewsStore();
    const { fetchAllEvents, events} = useEventsStore();
    const { fetchFightersFavoritebyUserId, fightersFavoriteByUser } = useFightersStore();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if(user) fetchFightersFavoritebyUserId(user.id);
    }, [user]);
    
    useEffect(() => {
        fetchAllNews();
        fetchAllEvents();
    }, []);

    // Funciones para mover el carrusel de noticias
    const scrollleft = () => { if(sectionRef.current) sectionRef.current.scrollBy({left: -300, 
        behavior: 'smooth'}); }
    const scrollright = () => { if(sectionRef.current) sectionRef.current.scrollBy({left: 300, 
        behavior: 'smooth'}); }

    return (
        <section className="h-full w-4/5 p-3 flex flex-col gap-1.5">
            <article className="h-2/5 w-full border-b-2 border-red-800  p-4 flex flex-col 
            gap-3 items-center">
                <div className="w-full h-9 border-b-2 border-red-800 flex items-center 
                justify-between">
                    <h2 className="text-xl font-semibold">Latest News</h2>
                    <div className="w-1/10 h-full flex items-center justify-center
                    gap-5">
                        <button onClick={scrollleft}><ArrowLeft /></button>
                        <button onClick={scrollright}><ArrowRight /></button>
                    </div>
                </div>
                <div ref={sectionRef} className="w-full flex justify-around 
                h-11/12 overflow-hidden gap-4 items-center p-1">
                    {news?.length === 0 ? (
                        <p className="text-lg italic">No news available</p>
                    ): (
                        news?.map((item,index) => (
                            <Link to={`/news/${item.id}`} key={index} className="relative min-w-3/10 
                            h-full rounded-2xl flex flex-col items-center hover:scale-95
                            transition-transform duration-300 cursor-pointer border-2 border-red-900">
                                <img
                                    src={`${ImagesForservices.notices}/${item.image_notice.split('\\').pop()}`}
                                    alt="news image"
                                    className="w-full h-full"
                                />
                                <span className="z-10 text-2xl absolute p-1">{item.title_notice}</span>
                            </Link>
                        ))
                    )}
                </div>
            </article>
            <article className="w-full h-4/5 flex p-2">
                <div className="w-2/5 h-full border-r-2 border-red-600 p-2 flex flex-col gap-1.5">
                    <h3 className="text-xl tracking-normal w-full border-b-2 border-red-500">Latest Events</h3>
                    <div className="border-b-2 border-red-600 w-full h-11/12 flex flex-col 
                    items-center justify-evenly gap-2.5 p-1 overflow-y-auto">
                        {events?.length === 0 ? (
                            <p className="text-lg italic">No events available</p>
                        ): (
                            events?.map((event, index) => (
                                <div key={index} className="w-full min-h-2/6 border-b-2 border-t-2 border-red-500
                                flex rounded-2xl hover:scale-95 transition-transform duration-300 cursor-pointer">
                                    <figure className="w-3/10 h-full border-r-2 border-red-500 bg-black rounded-2xl">
                                        <img src={`${ImagesForservices.events}/${event.image_event.split('\\').pop()}`} 
                                        alt="event image" className="w-full h-full opacity-50"/>
                                    </figure>
                                    <div className="w-7/10 h-full p-2 flex flex-col">
                                        <h4 className="text-xl italic">{event.name_event}</h4>
                                        <span className="flex gap-2"><strong className="text-yellow-500">
                                            Location:</strong>{event.location_event}</span>
                                        <span className="flex gap-2"><strong className="text-red-500">
                                            Venue:</strong>{event.venue_event}</span>
                                        <span className="flex gap-2"><strong>
                                            Date:</strong>{event.date_event.split('T')[0]}</span>
                                    </div>
                                </div>
                            ))
                        )}
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
                                    <span>Name: {user?.name_user}</span>
                                    <span>Username: {user?.username_user}</span>
                                </div>
                                <span>Email: {user?.email_user}</span>
                                <span>Member since: {user?.createdAt}</span>
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
                            Your Favorites Fighters
                        </h4>
                        <div className="w-full h-11/12 flex gap-9 overflow-hidden 
                        justify-evenly items-center px-5">
                            {fightersFavoriteByUser.length === 0 ? (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                    <p className="text-lg italic">No favorite fighters added</p>
                                    <Link to="/fighters" className="w-2/5 h-12 bg-red-900 
                                    text-white flex items-center justify-center hover:scale-95
                                    hover:bg-red-800 transition-transform duration-300 rounded-2xl">
                                        Add Favorite Fighters
                                    </Link>
                                </div>
                            ) : (
                                fightersFavoriteByUser.map((fighter, index) => (
                                    <Link to={`/fighter/${fighter.id}`} key={index} 
                                    className="min-w-1/6 rounded-2xl h-11/12 
                                    border-2 border-amber-100 relative flex flex-col 
                                    items-center justify-end bg-black hover:scale-95 
                                    transition-transform duration-300 cursor-pointer">
                                        <img src={`${ImagesForservices.fighters}/${fighter.image_fighter}`} 
                                        alt="Favorite Fighter" 
                                        className="w-full h-full opacity-65"/>
                                        <span className="text-gray-300 z-10 absolute italic text-lg mb-2">{fighter.nickname_fighter}</span>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}