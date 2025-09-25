import { useEffect, useState, useRef } from "react";
import { AnimationConfig } from "../UI";
// Function para realizar la animación al hacer scroll
export function HookAnimationScroll(){
    const[isVisible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);


    
    // UseEffect para las animaciones
    useEffect(() => {
        const element = sectionRef.current;
        if(!element) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    setVisible(true);
                    observer.unobserve(element);
                }
            });
        }, AnimationConfig);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // UseEffect para aplicar las clases dinámicamente
    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.scroll-element');
        elements?.forEach(element => {
            if (isVisible) {
                element.classList.add('animate');
            } else {
                element.classList.remove('animate');
            }
        });
    }, [isVisible]);
    
    return {sectionRef, isVisible};

}