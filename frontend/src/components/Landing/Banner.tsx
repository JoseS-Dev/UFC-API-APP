import {Link} from 'react-router-dom'
export function Banner(){
    return (
        <section className="relative w-full border-b-2 border-red-600 bg-black h-196 flex items-center justify-center">
            <img className="w-full h-full absolute z-0 opacity-45 bg-center" src="../../public/images/UFC-banner.jpg" 
            alt="UFC Banner" />
            <article className="z-10 w-3/5 h-2/5 mb-24 ml-5 p-4 flex flex-col 
            items-center justify-center">
                <div className="w-full h-1/2 flex flex-col items-center justify-center gap-1.5">
                <h2 className="text-7xl">Welcome to the <strong className="text-red-600">UFC</strong> Fan Page</h2>
                <p className="text-white text-2xl">Your one-stop destination for all things UFC.</p>
                </div>
                <div className="w-1/2 h-3/10 px-3 flex items-center justify-evenly gap-2">
                    <Link to='/Login' className="w-4/5 h-16 text-xl rounded-2xl text-white
                    bg-red-800 hover:bg-red-900 hover:scale-95 flex items-center justify-center
                    cursor-pointer transition-transform">Get Started</Link>
                    <Link to='/Terms' className="w-4/5 h-16 text-xl rounded-2xl flex items-center justify-center
                    bg-red-800 text-white hover:bg-red-900 hover:scale-95 transition-transform
                    cursor-pointer">Learn More</Link>
                </div>
            </article>
        </section>
    )
}