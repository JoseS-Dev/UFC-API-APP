// Componente UI para la configuracion de textos, imagenes y animaciones
const StrongUFC = () => <strong className="text-red-600">UFC</strong>;

// Configuraciones para la animación de las secciones
export const AnimationConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
}

export const Paragraphy = {
    'About': `
        This page is a fan-mode project created by JoseS-Dev as part of his
        portfolio. It is not affiliated with the UFC organization in any way.
        The purpose of this project is to showcase my skills in web development
        and to provide a platform for UFC enthusiasts to explore and learn more
        about the sport and its athletes. On this page, you can find information
        about UFC fighters, upcoming events, news, and more. Please note that
        all the data presented here is sourced from public APIs and is intended
        for educational and entertainment purposes only. 
    `,
    'UFC': `
        The Ultimate Fighting Championship (UFC) is a premier mixed martial arts (MMA) organization that 
        showcases the world's top fighters competing in various weight classes. 
        Founded in 1993, the UFC has grown to become a global phenomenon, 
        known for its high-octane fights, intense rivalries, and dramatic knockouts. 
        The organization features a diverse roster of athletes from different martial arts disciplines, 
        including Brazilian Jiu-Jitsu, Muay Thai, wrestling, boxing, and more. The UFC hosts events worldwide, 
        attracting millions of fans and viewers through pay-per-view broadcasts and live events. 
        With its commitment to promoting the sport of MMA and providing thrilling entertainment, 
        the UFC has solidified its position as the leading authority in the world of mixed martial arts.
    `,
    'Fighters': `
        This page provides the most detailed information about UFC fighters and legends. 
        Here are some of the details you will find:
    `,
    'Events': `
        Missed the action? This is your hub to catch up. Find all the details on the latest UFC events right here. 
        We don't just tell you when they happened; we bring you the definitive results from every fight on the card, 
        including the winners' names and methods of victory (KO, Submission, Decision). 
        Relive the key moments and stay informed about everything happening 
        inside the Octagon before the next big pay-per-view.
    `,
    'News': `
        Stay updated with the latest news, announcements, and developments in the world of UFC. 
        From fight announcements to behind-the-scenes stories, 
        we've got you covered with all the information you need to stay in the loop.
    `
}

// Lista de parrafos para la lista de la sección de noticias
export const NewsList = [
    'New Fight Announcements',
    'Fighter Signings and Departures',
    'Event Results and Recaps',
    'Event Updates and Changes',
    'Injury Reports',
    'Promotional Activities',
    'Behind-the-Scenes Stories',
    'Interviews and Press Conferences',
    'Rule Changes and Updates',
    'Community and Charity Initiatives',
    'Fan Engagement Activities'
];

// Titulos de las secciones
export const SectionTitles = {
    'About': {
        title: '¿What is About This Page?',
        subtitule: () => <>¿What is the <StrongUFC/>?</>
    },
    'Fighters': {
        title: () => <>Fighters of the <StrongUFC/></>
    },
    'Events': {
        title: () => <>Latest Results & Past Events <StrongUFC/></>
    },
    'Contact': {
        title: 'Contact US'
    },
    'News': {
        title: () => <>Latest News of the <StrongUFC/></>
    },
    'register': {
        title: () => <>Register for the page of the <StrongUFC/></>
    },
    'login': {
        title: () => <>Login for the page of the <StrongUFC/></>
    }
}

// Listas para las imagenes de las secciones
export const ImagesSections = {
    'About': '../public/images/About.png',
    'Banner': '../public/Images/UFC-banner.jpg',
    'Fighters': '../public/images/Fighters.jpg',
    'Events': '../public/images/Events.jpg',
    'News': '../public/images/News.jpg',
    'Register': '../public/images/Register_UFC.webp',
    'Login': '../public/images/Login-UFC.png'
}