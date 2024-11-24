import { useNavigate } from "react-router-dom";
import { HomePage_img, logos } from "../utils/constant";

const HomePage = () => {

    const navigate = useNavigate()
    const LogInPage = () => {
        navigate('/login')
    }

    return (
        <div className="relative h-[500px] w-full md:h-full">
            <button onClick={LogInPage} className="bg-red-600 absolute z-10 top-5 right-5 text-white font-semibold cursor-pointer px-4 py-1.5 rounded md:right-20 md:top-8">
                Sign In
            </button>
            <img src= {HomePage_img} className="w-full min-h-full"/>
            <div className="absolute top-0 left-0 h-full w-full shadow-inner bg-gradient-to-b from-black via-slate-900 to-black opacity-60"></div>

            <div className="absolute w-4/5 mx-auto top-1/4 left-1/4 -translate-x-1/4 px-6 text-white flex flex-col items-center md:w-2/4 md:left-1/3  md:pl-20">
                <h1 className="text-3xl font-bold md:text-5xl">Unlimited movies, TV shows and more</h1>
                <p className="py-2 text-md">Starts at ₹149. Cancel at any time.</p>
                <p className="py-2 text-md">Ready to watch? Enter your email to create or restart your membership.</p>

                <form onSubmit={(e) => e.preventDefault()} className="w-full block md:flex md:gap-4 mt-2">
                    <input 
                        type="email"
                        placeholder="Email"
                        className="border-2 border-slate-400 w-full py-3 px-4 bg-black opacity-65 rounded md:w-3/5"
                    />
                    <button className="bg-red-600 text-2xl font-semibold ml-16 mt-2 px-5 py-3 border-1 rounded text-center md:w-2/5 md:m-0 md:px-3">
                        Get Started
                    </button>
                </form>
            </div>
        </div>

    )
};

export default HomePage;