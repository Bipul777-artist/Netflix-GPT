import { useState } from "react";
import { dropDown_img, DropUp_img, userIcon_img } from "../utils/constant";
import {  signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";


const Browse = () => {

    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);

    const handleDropDown = () => {
        setDropDown(!dropDown);
    }

    const SignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
          }).catch((error) => {
            // An error happened.
          });
    }

    return (

        <div className="absolute top-3 right-0 grid grid-cols-3 gap-1 border-1 rounded md:top-6 md:right-14">

            <img className="w-12 h-12" src= {userIcon_img} />
            <img onClick={handleDropDown} src= {dropDown ? DropUp_img : dropDown_img} className=" w-8 h-8" />
            {dropDown ? 
            <div className="block col-span-2 bg-black border-1 border-black rounded opacity-70 text-white p-3">
                <p className="p-1 cursor-pointer hover:bg-slate-500 hover:border-1 hover:rounded">Account</p>
                <p className="p-1 cursor-pointer hover:bg-slate-500 hover:border-1 hover:rounded">Help Center</p>
                <p onClick={SignOut} className="p-1 cursor-pointer hover:bg-slate-500 hover:border-1 hover:rounded">Sign Out</p>
            </div> : null
            }
        </div>
    )
}

export default Browse;