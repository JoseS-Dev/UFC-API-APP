import { Link as RouterLink } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

export function Header(){
    return (
        <header className="border-b-2 border-red-600 w-full h-20 p-1.5 flex justify-between items-center">
            <article className="w-1/10 h-full flex items-center justify-center px-3">
                <h1 className="text-3xl tracking-widest">UFC</h1>
            </article>
            <article className="h-full w-11/12 flex items-center">
                <nav className="h-full w-4/5 flex items-center">
                    <ul className="flex items-center justify-around list-none w-full">
                        <li className="hover:scale-95 text-2xl tracking-normal cursor-pointer 
                        transition-transform hover:text-red-400 hover:border-b-2 hover:border-gray-400">
                            <Link smooth to={"#about"}>About</Link>
                        </li>
                        <li className="hover:scale-95 text-2xl tracking-normal cursor-pointer 
                        transition-transform hover:text-red-400 hover:border-b-2 hover:border-gray-400">
                            <Link smooth to="#fighters">Fighters</Link>
                        </li>
                        <li className="hover:scale-95 text-2xl tracking-normal cursor-pointer 
                        transition-transform hover:text-red-400 hover:border-b-2 hover:border-gray-400">
                            <Link smooth to="#events">Events</Link>
                        </li>
                        <li className="hover:scale-95 text-2xl tracking-normal cursor-pointer 
                        transition-transform hover:text-red-400 hover:border-b-2 hover:border-gray-400">
                            <Link smooth to="#news">News</Link>
                        </li>
                        <li className="hover:scale-95 text-2xl tracking-normal cursor-pointer 
                        transition-transform hover:text-red-400 hover:border-b-2 hover:border-gray-400">
                            <Link smooth to="#contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div className="w-1/5 h-full flex justify-evenly items-center">
                    <RouterLink to="/Register" className="w-1/2 h-full flex items-center justify-center">
                        <button className="w-4/5 h-12 rounded-xl
                        bg-red-700 font-bold text-lg hover:bg-red-900
                        hover:scale-105 cursor-pointer transition-transform">Sign Up</button>
                    </RouterLink>
                    <RouterLink to="/Login" className="w-1/2 h-full flex items-center justify-center" >
                        <button className="w-4/5 h-12  rounded-xl
                        bg-black text-red-500 font-bold text-lg hover:bg-red-900 
                        hover:text-white hover:scale-105 cursor-pointer transition-transform">Sign In</button>
                    </RouterLink>
                </div>
            </article>
        </header>
    )
}