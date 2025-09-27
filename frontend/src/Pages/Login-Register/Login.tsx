import { Link } from "react-router-dom";
import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/ServicesUser";
import swal from "sweetalert2";

export function Login(){
    const[emailUser, setEmailUser] = useState('');
    const[passwordUser, setPasswordUser] = useState('');
    const[confirmPasswordUser, setConfirmPasswordUser] = useState('');
    const email_user = useId();
    const password_user = useId();
    const confirm_password_user = useId();
    const navigate = useNavigate();

    // Handle Submit del formulario de Login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(passwordUser !== confirmPasswordUser) swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'The passwords do not match. Please try again.'
        });
        const LoginData = {
            email_user: emailUser,
            password_user: passwordUser
        };
        try{
            const response = await LoginUser(LoginData);
            if(response.error) swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: `${response.error}`
            });
            else if(response.message || response.data) await swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `${response.message}`
            });
            // Guardo la información en el localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/Home'); // Redirijo al usuario a la página principal
        }
        catch(error){
            console.error('Error logging in user:', error);
        }
    }


    return (
        <main className="w-full h-screen flex">
            <article className="border-r-2 border-red-600 w-3/5 h-full flex flex-col 
            p-6 gap-2 items-center">
                <h2 className="text-3xl p-2 w-full border-b-2 border-red-400">
                    Login for the page of the <strong className="text-red-600">UFC</strong>
                </h2>
                <form onSubmit={handleSubmit} className="w-11/12 h-full flex flex-col items-center justify-evenly p-4 gap-1.5">
                    <div className="w-full h-1/5 border-b-2 border-gray-700 rounded-2xl p-5 flex 
                    flex-col gap-3">
                        <label className="text-xl w-full border-b-2 border-red-800">Email</label>
                        <input
                            required
                            type="email"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placeholder:placeholder-white transition-colors duration-300"
                            placeholder="Enter your email"
                            value={emailUser}
                            onChange={(e) => setEmailUser(e.target.value)}
                            id={email_user}
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 border-gray-700 rounded-2xl p-5 flex flex-col 
                    gap-3">
                        <label className="text-xl w-full border-b-2 border-red-800">Password</label>
                        <input
                            required
                            type="password"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placeholder:placeholder-white transition-colors duration-300"
                            placeholder="Enter your password"
                            value={passwordUser}
                            onChange={(e) => setPasswordUser(e.target.value)}
                            id={password_user}
                        />
                    </div>
                    <div className="w-full h-1/5 border-b-2 border-gray-700 rounded-2xl p-5 flex flex-col
                    gap-3">
                        <label htmlFor={confirm_password_user} className="text-xl w-full border-b-2 border-red-800">Confirm Password</label>
                        <input
                            required
                            type="password"
                            className="w-full h-16 border-2 border-red-600 rounded-2xl px-3
                            outline-none text-white text-lg hover:border-red-500 focus:border-red-500
                            placeholder:placeholder-white transition-colors duration-300"
                            placeholder="Confirm your password"
                            value={confirmPasswordUser}
                            onChange={(e) => setConfirmPasswordUser(e.target.value)}
                            id={confirm_password_user}
                        />
                    </div>
                    <div className="w-full h-1/4 flex flex-col justify-center items-center p-3 gap-5">
                        <Link to='/Register' className="text-lg flex gap-2.5">
                            Are you not registered?
                            <span className="text-red-600 hover:underline"> Register</span>
                        </Link>
                        <div className="w-11/12 h-full flex justify-evenly">
                            <button type="submit" className="w-2/6 h-14 rounded-2xl text-xl
                          bg-red-600 font-bold text-white tracking-normal hover:bg-red-800 hover:scale-95
                            transition-transform cursor-pointer duration-300">
                            Login
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
            <article className="w-2/5 h-full flex flex-col">
                <figure className="w-full h-full bg-black">
                    <img alt="Login Image" className="w-full h-full opacity-35"
                    src="../../public/images/Login-UFC.png"/>
                </figure>
            </article>
        </main>
    )
}