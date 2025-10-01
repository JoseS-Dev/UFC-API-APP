import { useFightersStore } from "../../context/FightersContext"
import { useEffect, useMemo, useState } from "react";
import { CategoriesFighters, ImagesForservices } from "../../UI";
import { Link } from "react-router-dom";

export function SectionFighters(){
    const {fighters, fetchAllFighters} = useFightersStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    
    useEffect(() => {
        fetchAllFighters();
    }, []);

    // Hacemos el filtro para buscar a un luchador por su categoria
    const filteredFighters = useMemo(() => {
        if(selectedCategory === 'all') return fighters;
        return fighters.filter(fighter =>
            fighter.name_category.toLowerCase() === selectedCategory.toLowerCase()
        )
    }, [fighters, selectedCategory]);

    return (
        <section className="w-4/5 h-full flex flex-col p-4 items-center gap-2.5">
            <article className="w-full h-14 border-b-2 border-red-800 flex justify-between
            items-center px-3">
                <h2 className="text-2xl tracking-normal flex gap-2.5">
                    All Fighters <strong className="text-red-600">{filteredFighters.length}</strong>
                </h2>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} 
                className="border-2 border-gray-600 outline-none rounded-2xl w-1/6 h-3/4 px-2 italic">
                    {CategoriesFighters.map((categorie, index) => (
                        <option className="bg-black text-white px-1 text-lg italic" 
                        key={index} 
                        value={categorie}>
                            {categorie.charAt(0).toUpperCase() + categorie.slice(1)}
                        </option>
                    ))}
                </select>
            </article>
            <article className="border-b-2 border-red-800 w-full h-11/12 p-3 flex flex-wrap 
            justify-evenly gap-4 overflow-y-auto">
                {filteredFighters.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-2xl text-white italic">No fighters available</span>
                    </div>
                ) : (
                    filteredFighters.map((fighter, index) => (
                        <Link to={`/fighter/${fighter.id}`} key={index} 
                        className="w-1/6 rounded-2xl h-70 
                        border-2 border-amber-100 relative flex flex-col 
                        items-center justify-end bg-black hover:scale-95 
                        transition-transform duration-300 cursor-pointer">
                            <img src={`${ImagesForservices.fighters}/${fighter.image_fighter}`} 
                            alt="Favorite Fighter" 
                            className="w-full h-full opacity-65"/>
                            <span className="text-gray-300 z-10 absolute italic text-lg mb-2">
                            {fighter.nickname_fighter}</span>
                        </Link>
                    ))
                )}
            </article>
        </section>
    )
}