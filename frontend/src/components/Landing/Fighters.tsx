import { GraphIcon } from "../../assets/Icon/GraphIcon";
import { HistoryIcon } from "../../assets/Icon/HistoryIcon";
import { FightIcon } from "../../assets/Icon/FightIcon";
import { Link } from "react-router-dom";
import { Paragraphy } from "../../UI";
import {useEffect, useRef, useState} from 'react';

export function Fighters(){
    const[isVisible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    
    // Handler para hover y scroll
    const handleMouseEnter = () => {
        setVisible(true);
    }
    const handleMouseLeave = () => {
        setVisible(false);
    }

    // UseEffect para las animaciones
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            })
        }, observerOptions);
        if(sectionRef.current){
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, [])

    // UseEffect para aplicar las clases dinámicamente
    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.scroll-element');
        elements?.forEach(el => {
            if (isVisible) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }, [isVisible]);
    
    return (
        <section
            ref={sectionRef}
            onScroll={handleMouseEnter}
            onScrollEnd={handleMouseLeave}
            id="fighters" 
            className="w-full min-h-155 flex border-b-2 border-red-600">
            <article className="border-r-2 border-red-600 w-1/2 p-7 flex flex-col gap-2 items-center scroll-element">
                <h3 className="text-3xl w-full border-b-2 border-red-500">
                    Fighters of the <strong className="text-red-600">UFC</strong>
                </h3>
                <p className=" w-full h-auto text-xl p-2 text-justify">
                    {Paragraphy.Fighters}
                </p>
                <div className="w-full h-3/5 flex justify-around flex-wrap p-3">
                  <div className="rounded-2xl w-1/4 h-full border-2 border-red-900 flex flex-col 
                  p-2 items-center ">
                    <figure className="w-full h-1/2 gap-2 border-b-2 border-red-900 flex flex-col items-center">
                        <GraphIcon/>
                        <h4 className="text-2xl tracking-wide">Statistics</h4>
                    </figure>
                    <p className="flex items-center justify-center p-2 text-center text-lg">
                        Comprehensive statistics including wins, losses, draws, and no-contests.
                    </p>
                  </div>
                  <div className="rounded-2xl w-1/4 h-full border-2 border-red-900 flex flex-col p-2">
                    <figure className="w-full h-1/2 gap-2 border-b-2 border-red-900 flex flex-col items-center">
                        <HistoryIcon/>
                        <h4 className="text-2xl tracking-wide">Fight History</h4>
                    </figure>
                    <p className="flex items-center justify-center p-2 text-center text-lg">
                        Detailed fight history including dates, opponents, and outcomes.
                    </p>
                  </div>
                  <div className="rounded-2xl w-1/4 h-full border-2 border-red-900 flex flex-col p-2">
                    <figure className="w-full h-1/2 gap-2 border-b-2 border-red-900 flex flex-col items-center">
                        <FightIcon/>
                        <h4 className="text-2xl tracking-wide">Recent Fights</h4>
                    </figure>
                    <p className="flex items-center justify-center p-2 text-center text-lg">
                        Information on the most recent fights. Including fight results.
                    </p>
                  </div>
                </div>
                <p className="border-b-2 border-red-500 w-full h-auto text-xl p-2 text-justify">
                    Explore the profiles of your favorite fighters and stay updated with the latest UFC news and events.
                </p>
                <Link to="/fighters" className="bg-red-600 w-3/10 h-16 mt-3 text-xl font-bold 
                rounded-2xl flex items-center justify-center
                hover:bg-red-900 hover:scale-95 transition-transform cursor-pointer text-white">
                    View Fighters
                </Link>
            </article>
            <figure className="w-1/2 flex flex-col">
                <img className="border-none w-full h-full opacity-55 scroll-element"
                loading="lazy" 
                src="../../public/Fighters.jpg"/>
            </figure>
        </section>
    )
}