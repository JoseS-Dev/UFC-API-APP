import { useState, useId } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { registerUser } from "../../services/ServicesUser";
import { SectionTitles, ImagesSections } from "../../UI";

export function Register(){
    const[nameUser, setNameUser] = useState('');
    const[username, setUsername] = useState('');
    const[emailUser, setEmailUser] = useState('');
    const[passwordUser, setPasswordUser] = useState('')
    const name_user = useId();
    const username_user = useId();
    const email_user = useId();
    const password_user = useId();
    const navigate = useNavigate();

    // Handle Submit del formulario de registro
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(nameUser === '' || username === '' || emailUser === '' || passwordUser === ''){
            swal.fire({
                icon: 'error',
                title: 'All fields are required',
                text: 'Please fill in all the fields to register.'
            })
        }
        try{
            const UserData = {
                name_user: nameUser,
                username_user: username,
                email_user: emailUser,
                password_user: passwordUser
            };
            const response = await registerUser(UserData);
            if(response.error) await swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: `${response.error}`
            });
            else if(response.message || response.data) await swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: `${response.message}`
            })
            navigate('/Login');
        }
        catch(error){
            console.error('Error registering user:', error);
        }
    }

    
    return (
        <main className="w-full h-screen flex">
            <article className="w-2/5 h-full border-2 border-red-600">
                <figure className="w-full h-full bg-black">
                    <img alt="Register Image UFC" className="w-full h-full opacity-35"
                    src={ImagesSections.Register}/>
                </figure>
            </article>
            <article className="w-3/5 h-full flex flex-col items-center p-6 gap-2">
                <h2 className="w-full border-b-2 border-red-400 text-3xl p-2">
                    {SectionTitles.register.title()}
                </h2>
                <form onSubmit={handleSubmit} className="h-full w-11/12 flex flex-col items-center
                p-4 gap-1.5">
                    <div className="w-full h-1/5 border-b-2 rounded-xl border-gray-700 flex flex-col p-5 gap-3">
                        <label htmlFor={name_user} className="text-xl tracking-normal w-full border-b-2 border-red-800">
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placerholder:placerholder-white transition-colors duration-300"
                            placeholder="Enter your name and last name"
                            value={nameUser}
                            onChange={(e) => setNameUser(e.target.value)}
                            id={name_user}
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 rounded-xl border-gray-700 flex flex-col p-5 gap-3">
                        <label  htmlFor={username_user} className="text-xl tracking-normal w-full border-b-2 border-red-800">
                            Username
                        </label>
                        <input
                            required
                            type="text"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placerholder:placerholder-white transition-colors duration-300"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id={username_user}
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 rounded-xl border-gray-700 flex flex-col p-5 gap-3">
                        <label  htmlFor={email_user} className="text-xl tracking-normal w-full border-b-2 border-red-800">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placerholder:placerholder-white transition-colors duration-300"
                            placeholder="Enter your email"
                            value={emailUser}
                            onChange={(e) => setEmailUser(e.target.value)}
                            id={email_user}
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 rounded-xl border-gray-700 flex flex-col p-5 gap-3">
                        <label  htmlFor={password_user} className="text-xl tracking-normal w-full border-b-2 border-red-800">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placerholder:placerholder-white transition-colors duration-300"
                            placeholder="Enter your password"
                            value={passwordUser}
                            onChange={(e) => setPasswordUser(e.target.value)}
                            id={password_user}
                        />
                    </div>
                    <div className="w-full h-1/5 flex items-center flex-col p-3 gap-3">
                        <Link to={'/Login'} className="text-lg flex gap-2.5">¿Are you have Account? 
                        <span className="text-red-600 hover:underline transition-discrete duration-150">Login</span></Link>
                        <div className="w-11/12 h-full flex justify-evenly">
                            <button type="submit" className="w-2/6 h-14 rounded-2xl text-xl
                          bg-red-600 font-bold text-white tracking-normal hover:bg-red-800 hover:scale-95
                            transition-transform cursor-pointer duration-300">
                            Registration
                            </button>
                            <Link to='/' className="w-2/6 h-14 rounded-2xl text-xl
                          bg-gray-900 font-bold text-red-400 tracking-normal hover:bg-gray-800 hover:scale-95
                            transition-transform cursor-pointer duration-300 flex items-center justify-center">
                                Go to Landing
                            </Link>
                        </div>
                    </div>
                </form>
            </article>
        </main>
    )
}