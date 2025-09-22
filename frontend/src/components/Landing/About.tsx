import { Paragraphy } from "../../UI";
export function About(){
    return (
        <section id="about" className="w-full h-165 flex border-b-2 border-red-600">
            <figure className="w-1/2 flex flex-col border-r-2 bg-black border-red-600">
                <img className="border-none w-full h-full opacity-55" src="../../public/About.png"/>
            </figure>
            <article className="w-1/2 flex flex-col p-7 gap-2">
                <h3 className="text-3xl w-full border-b-2 border-red-500">
                    ¿What is About This Page?
                </h3>
                <p className="border-b-2 border-red-500 w-full h-auto text-xl p-2 text-justify">
                     {Paragraphy.About}
                </p>
                <div className="w-full mt-6 h-auto flex flex-col gap-2">
                    <h3 className="text-3xl w-full border-b-2 border-red-500">
                        ¿What is the <strong className="text-red-600">UFC</strong>?
                    </h3>
                    <p className="border-b-2 border-red-500 w-full h-auto text-xl p-2 text-justify">
                        {Paragraphy.UFC}
                    </p>
                </div>
            </article>
        </section>
    )
}