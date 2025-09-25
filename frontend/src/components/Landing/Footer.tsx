import {Link} from 'react-router-dom';
import { InstagramIcon } from '../../assets/Icon/InstagramIcon';
import { FacebookIcon } from '../../assets/Icon/FacebookIcon';
import { TwitterIcon } from '../../assets/Icon/twitterIcon';
import { HookAnimationScroll } from '../../hook/HookAnimationScroll';
export function Footer(){
    const {sectionRef, isVisible} = HookAnimationScroll();
    return (
        <footer ref={sectionRef} className="w-full h-75  p-4 flex flex-col items-center gap-2">
            <article className={`w-full h-auto border-b-2 border-red-600 flex justify-between 
            items-center px-3 scroll-element ${isVisible ? 'visible' : ''}`}>
                <h3 className="text-2xl text-center">UFC Fan Page &copy; 2025. All rights reserved.</h3>
                <p className="text-lg text-center">Developed by JoseS-Dev</p>
            </article>
            <article className={`w-full h-auto flex justify-evenly items-center gap-2 mt-2 border-b-2 
            border-red-600 pb-2 scroll-element ${isVisible ? 'visible' : ''}`}>
                <Link to="/Terms" className="text-xl hover:underline hover:text-red-600 cursor-pointer
                transition-colors duration-300">
                    Terms of Service
                </Link>
                <Link to="/Privacy" className="text-xl hover:underline hover:text-red-600 cursor-pointer
                transition-colors duration-300">
                    Privacy Policy
                </Link>
                <Link to="/Contact" className="text-xl hover:underline hover:text-red-600 cursor-pointer
                transition-colors duration-300">
                    Contact Us
                </Link>
            </article>
            <article className={`w-full h-1/4 flex justify-between border-b-2 border-red-600 
            px-3 items-center gap-2 mt-2 scroll-element ${isVisible ? 'visible' : ''}`}>
                <span className="text-xl tracking-wide">Follow us on:</span>
                <div className="w-1/4 h-full flex justify-evenly items-center">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                    className="text-xl hover:text-red-600 cursor-pointer hover:scale-95
                    transition-transform duration-300"><FacebookIcon /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                    className="text-xl hover:text-red-600 cursor-pointer hover:scale-95
                    transition-transform duration-300"><TwitterIcon /></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                    className="text-xl hover:text-red-600 cursor-pointer hover:scale-95
                    transition-transform duration-300"><InstagramIcon /></a>
                </div>
            </article>
            <article className={`w-full h-1/4 flex flex-col items-center justify-center gap-1.5 mt-2 
            scroll-element ${isVisible ? 'visible' : ''}`}>
                <span className="text-lg italic">Note: This site is not affiliated with the UFC.</span>
                <span>Made by <strong className="text-red-600">♥</strong> by JoseS-Dev</span>
            </article>
        </footer>
    )
}