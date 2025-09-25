import {Link} from 'react-router-dom';
import { Paragraphy, NewsList, SectionTitles } from "../../UI";
import { HookAnimationScroll } from "../../hook/HookAnimationScroll";

export function News(){
    const {sectionRef, isVisible} = HookAnimationScroll();
    return (
        <section
            ref={sectionRef}
            id='news'
            className="w-full h-screen flex border-t-2 border-b-2 border-red-600"
        >
            <article className={`w-1/2 h-full border-r-2 border-red-600 scroll-element 
            ${isVisible ? 'visible' : ''}`}>
                <figure className="w-full h-full bg-black ">
                    <img className="w-full h-full opacity-40" src="../../public/News.jpg" 
                    alt="News" loading='lazy'/>
                </figure>
            </article>
            <article className={`w-1/2 h-full flex flex-col items-center p-7 gap-2 scroll-element
            ${isVisible ? 'visible' : ''}`}>
                <div className="w-full h-1/5 border-b-2 border-red-500 flex flex-col">
                    <h3 className="text-3xl tracking-wide w-full border-b-2 border-red-500">
                        {SectionTitles.News.title()}
                    </h3>
                    <p className="w-full h-auto text-xl p-2 text-justify">
                        {Paragraphy.News}
                    </p>
                </div>
                <div className="w-full h-4/5 p-2 flex flex-col items-center">
                    <span className="text-2xl w-full tracking-tighter border-b-2 border-red-500">News Like:</span>
                    <ul className="list-none w-full h-4/5 p-2 m-2 flex flex-col gap-1.5">
                        {NewsList.map((news, index) => (
                            <li key={index} className="text-lg p-1 border-b-2 border-red-900">{news}</li>
                        ))}
                    </ul>
                    <Link to="/news" className="w-3/10 h-16 bg-red-600 text-white text-xl rounded-2xl
                    hover:bg-red-900 hover:scale-95 transition-transform cursor-pointer flex items-center 
                    justify-center">
                        View More News
                    </Link>
                </div>
            </article>
        </section>
    )
}