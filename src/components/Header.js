import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { userIcon_img, DropUp_img, dropDown_img, logos, Supported_Languages} from "../utils/constant";
import { signOut } from "firebase/auth";
import {  toggleGPTView } from "../utils/gptSlice.js";
import { changeLanguage  } from "../utils/configSlice.js";


const Header = () => {

    const [signInBtn, setSignInBtn] = useState("Sign In");
    const dispatch = useDispatch();
    const identifier = useRef(null);
    const navigate = useNavigate();
    const showGPT = useSelector(store => store.gptSlice.GPTSlice);
    const user = useSelector((store) => store.user)
    const [dropDown, setDropDown] = useState(false);

    const handleDropDown = () => {
        setDropDown(!dropDown);
    }

    const LogIn = () => {
      // setSignInBtn(" Sign Up")  
      if (signInBtn === "Sign In") {
        setSignInBtn(" Sign Up")
        navigate("/login")
      } else {
        setSignInBtn("Sign In")
        navigate("/")
      }
      console.log("Clicked")
    }

    const SignOut = () => {
      signOut(auth).then(() => {
          // Sign-out successful.
         
        }).catch((error) => {
          // An error happened.
        });
  }

  const GPTSearchPage = () => {
    // navigate("/GptSearchPage")
    dispatch(toggleGPTView());
  }

  const showContents = () => {
    setDropDown(true);
  }
  const hideContents = () => {
    setDropDown(false);
  }

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const { uid, email, displayName} = user;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
              navigate("/browse")
              // ...
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/")
            }
          })

          return () => unsubscribe();
    }, [])

    return (
      <div className="absolute w-full">
        <div className="absolute justify-between items-center flex w-full z-30">
            <img src= {logos.large} 
                className="w-24 h-12 ml-24 md:w-44 md:h-20"
            />
            
              {user && <div className="flex">
                          
                          <button onClick={GPTSearchPage} className="bg-gradient-to-r from-pink-700 to-pink-900 ml-72 border-1 rounded-md text-white p-2">{showGPT ? "HomePage" : "ChatGPT"}</button>
                          {showGPT && <select onChange={handleLanguageChange} className="bg-gradient-to-r from-red-800 ml-6 to-red-900 text-white text-md border-none rounded-md px-2 py-1.5">
                            {Supported_Languages.map((lang) => 
                            <option key={lang.identifier} value={lang.identifier}>
                              {lang.name}
                            </option>)}
                          </select>}
                        </div>  
              }
              <div>
                {user ? <div onMouseLeave={hideContents} onMouseEnter={showContents}  className="absolute grid grid-cols-3 gap-2 z-10 top-5 right-24 ">
                  
                    <>
                    <img className="w-12 h-12" src= {userIcon_img} />
                    <img src= {dropDown ? DropUp_img : dropDown_img} className="transition duration-500 cursor-pointer bg-white rounded w-8 h-8" />
                    </>  
                    {dropDown ? 
                        <div className="block col-span-2 transition duration-500 cursor-pointer bg-black border-1 border-black rounded opacity-70 text-white p-3">
                            <p className="p-1 cursor-pointer hover:bg-slate-500 hover:border-1 hover:rounded">Account</p>
                            <p className="p-1 cursor-pointer hover:bg-slate-500 hover:border-1 hover:rounded">Help Center</p>
                            <p onClick={SignOut} className="p-1 cursor-pointer hover:bg-slate-500 hover:border-1 hover:rounded">Sign Out</p>
                        </div> : null
                    }
                
              </div> : 
                  <button onClick={LogIn} className="bg-red-600 absolute z-10 top-5 right-5 text-white font-semibold cursor-pointer px-4 py-1.5 rounded md:right-20 md:top-8 hover:bg-black">
                    {signInBtn}
                  </button>
                }
        </div>
        </div>
        
      </div>
    )
};

export default Header;