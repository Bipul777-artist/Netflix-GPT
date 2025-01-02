import { useState } from "react";
import { dropDown_img, DropUp_img, userIcon_img} from "../utils/constant";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import useNowPlayingMovies from "../hooks/useNowPlayingmoves"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GPTSearch from "./GPTSearch"
import { useSelector } from "react-redux";


const Browse = () => {

    useNowPlayingMovies();
    const GPTSliceStatus = useSelector((store) => store.gptSlice.GPTSlice)
    // console.log(GPTSliceStatus);
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);

    const handleDropDown = () => {
        setDropDown(!dropDown);
    }

    const SignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
           
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <div >
            {GPTSliceStatus ? 
                <GPTSearch /> :
                <>
                    <MainContainer />
                    <SecondaryContainer />
                </> 
            }
           
        </div>
    )
}

export default Browse;