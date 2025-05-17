import { useNavigate } from "react-router-dom";
import { LoginPage_img } from "../utils/constant";
import { useRef, useState } from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"


const LogIn = () => {

    const [Error, setError] = useState();
    const email = useRef(null);
    const password = useRef(null)

    const navigate = useNavigate();

    const LoginLogic = () => {
        
        // console.log(email);
        // console.log(password);
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError("Invalid Credentials! Please use correct credentials to login");
        });
    }

    const SignUpPage = () => {
        navigate('/');
    }


    return (
        <div className="relative bg-black h-screen w-screen md:bg-none">
            <img className="hidden w-full h-full bg-cover bg-center overflow-hidden md:block" src= {LoginPage_img} />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-45"></div>

            <form onSubmit={(e)=> e.preventDefault()} className="w-4/5 absolute top-1/4 left-1/2 border-2 border-black rounded p-4 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 md:w-1/3 md:h-2/3 md:p-10 md:top-1/2 md:left-1/2">
                <h1 className="text-3xl z-10 font-bold bg-transparent mb-2 text-white">Sign In</h1>
                <input
                    ref={email} 
                    type="Email"
                    placeholder="Email"
                    className="border-2 w-full text-white border-slate-400 bg-transparent my-2 rounded p-3 "
                />
                <input 
                    ref={password}
                    type="Password"
                    placeholder="Password"
                    className="border-2 w-full text-white border-slate-400 bg-transparent my-2 rounded p-3"
                />
                <button onClick={LoginLogic} className="border-2 w-full  border-slate-400 bg-red-600 my-2 rounded py-2 px-3 z-10 text-2xl font-bold text-white">
                    Sign In
                </button>
                <p className="text-red-600 font-bold m-2 text-xl">{Error}</p>
                <div className="flex items-center gap-2">
                    <p className="text-md text-white mt-3">New here?</p> 
                    <p onClick={SignUpPage} className="text-md text-white mt-3 font-bold hover:underline cursor-pointer">Sign Up Now!</p>
                </div>
            </form>
        </div>
    )
}

export default LogIn; 