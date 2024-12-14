import { logos } from "../utils/constant";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
        <div className="absolute top-3 left-4 z-10 md:left-24">
            <img src= {logos.large} 
                className="w-24 h-12 md:w-44 md:h-20"
            />
        </div>

    )
};

export default Header;