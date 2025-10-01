import { useLegendsStore } from "../../context/LegendsContext"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoriesFighters, ImagesForservices } from "../../UI";

export function SectionLegends(){
    const { Legends, fetchAllLegends } = useLegendsStore();
    
    useEffect(() => {
        fetchAllLegends();
    }, []);

    return (
        <section className="w-4/5 h-full flex flex-col items-center p-4 gap-2.5">
            <article className="border-b-2 border-red-900 w-full h-14 flex items-center
            justify-between px-2">
                <h2 className="text-2xl tracking-normal flex gap-2.5">
                    All Legends <strong className="text-red-900">{Legends.length}</strong>
                </h2>
                <select className="border-2 border-gray-600 w-1/6 h-3/4 px-2 italic rounded-2xl">
                    {CategoriesFighters.map((categorie, index) => (
                        <option className="bg-black text-white px-1.5 italic" key={index} 
                        value={categorie}>{categorie.charAt(0).toUpperCase() + categorie.slice(1)}</option>
                    ))}
                </select>
            </article>
            <article className="w-full h-11/12 border-b-2 border-red-900 flex flex-wrap p-3 
            overflow-y-auto justify-evenly gap-2.5">
                {Legends.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-2xl text-white italic">No legends available</span>
                    </div>
                ): (
                    Legends.map((legend, index) => (
                        <Link to={`/legend/${legend.id}`} key={index} 
                        className="w-1/6 rounded-2xl h-70 
                        border-2 border-amber-100 relative flex flex-col 
                        items-center justify-end bg-black hover:scale-95 
                        transition-transform duration-300 cursor-pointer">
                            <img src={`${ImagesForservices.legends}/${legend.image_legend}`} 
                            alt="Favorite Fighter" 
                            className="w-full h-full opacity-65"/>
                            <span className="text-gray-300 z-10 absolute italic text-lg mb-2">
                            {legend.nickname_legend}</span>
                        </Link>
                    ))
                )}
            </article>
        </section>
    )
}