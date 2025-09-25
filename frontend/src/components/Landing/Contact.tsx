import { HookAnimationScroll } from '../../hook/HookAnimationScroll';
import { SectionTitles } from '../../UI';

export function Contact(){
    const {sectionRef, isVisible} = HookAnimationScroll();
    return (
        <section
            ref={sectionRef}
            id="contact" 
            className="w-3/5 h-full flex flex-col items-center p-7 gap-2">
            <h3 className={`text-3xl w-full border-b-2 border-red-500 scroll-element 
            ${isVisible ? 'visible' : ''}`}>
                {SectionTitles.Contact.title}
            </h3>
            <form className={`w-full h-full flex scroll-element ${isVisible ? 'visible' : ''}`}>
                <div className="w-2/5 min-h-full p-4  flex flex-col justify-around">
                    <div className="w-full h-1/5 border-b-2 border-red-900 p-2 flex flex-col">
                        <label className="text-xl w-full border-b-2 border-gray-800" 
                        htmlFor="name_user">Name</label>
                        <input
                            required
                            className="w-full h-14 mt-2 rounded-lg border-r-2 border-b-2
                            border-gray-800 px-2 text-lg outline-none focus:border-red-600
                            transition-colors placeholder:text-gray-400"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 border-red-900 p-2 flex flex-col">
                        <label className="text-xl w-full border-b-2 border-gray-800" 
                        htmlFor="Last_name_user">Last Name</label>
                        <input
                            required
                            className="w-full h-14 mt-2 rounded-lg border-r-2 border-b-2
                            border-gray-800 px-2 text-lg outline-none focus:border-red-600
                            transition-colors placeholder:text-gray-400"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 border-red-900 p-2 flex flex-col">
                        <label className="text-xl w-full border-b-2 border-gray-800" 
                        htmlFor="email_user">Email</label>
                        <input
                            required
                            className="w-full h-14 mt-2 rounded-lg border-r-2 border-b-2
                            border-gray-800 px-2 text-lg outline-none focus:border-red-600
                            transition-colors placeholder:text-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="w-full h-1/5 p-2 flex flex-col">
                        <label className="text-xl w-full border-b-2 border-gray-800"
                        htmlFor="phone_user">Phone</label>
                        <input
                            required
                            className="w-full h-14 mt-2 rounded-lg border-r-2 border-b-2
                            border-gray-800 px-2 text-lg outline-none focus:border-red-600
                            transition-colors placeholder:text-gray-400"
                            placeholder="Enter your phone number"
                        />
                    </div>
                </div>
                <div className="w-3/5 h-auto p-4 flex flex-col items-center">
                    <div className="w-full h-10/12 border-b-2 p-4.5 border-gray-800 flex flex-col">
                        <label className="text-xl w-full border-b-2 border-gray-800" 
                        htmlFor="message_user">Message or Inquiry</label>
                        <textarea
                            maxLength={500}
                            required
                            className="w-full h-full mt-2 rounded-lg border-r-2 border-b-2
                            border-gray-800 px-2 text-lg outline-none focus:border-red-600
                            transition-colors placeholder:text-gray-400"
                            placeholder="Enter your message here..."
                        ></textarea>
                    </div>
                    <button className="bg-red-600 w-2/5 h-12 mt-3 text-xl font-bold 
                    rounded-2xl flex items-center justify-center
                  hover:bg-red-900 hover:scale-95 transition-transform cursor-pointer text-white">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}