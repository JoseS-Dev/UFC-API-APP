import { SearchIcon } from "../../assets/Icon/SearchIcon";


export function Header(){
    const name_user = JSON.parse(localStorage.getItem("user") || "{}").data.name_user;
    return (
        <header className="w-full h-1/10 border-b-2 border-red-900 flex 
        items-center justify-between px-7">
            <h1 className="text-3xl tracking-normal">
                Bienvenido de vuelta, {name_user}
            </h1>
            <article className="h-3/4 w-2/4 flex items-center justify-between">
                <input
                    type="search"
                    className="border-b-2 border-r-2 border-gray-600 w-full h-12
                    px-3 outline-none text-gray-500 text-lg focus:border-red-500
                    placeholder:placeholder-gray-500 transition-colors duration-300"
                    placeholder="Search fighters, events, fights..."
                />
                <SearchIcon/>
            </article>
        </header>
    )
}