import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import useNowPlayingMovies from "../hooks/useNowPlayingmoves"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GPTSearch from "./GPTSearch"
import { useSelector } from "react-redux";
import useNowPlayingmovies_v2 from "../hooks/useNowPlayingmovies_v2";


const Browse = () => {

    // useNowPlayingMovies();
    useNowPlayingmovies_v2();
    const GPTSliceStatus = useSelector((store) => store.gptSlice.GPTSlice)
    // console.log(GPTSliceStatus);
    const [dropDown, setDropDown] = useState(false);

    // const handleDropDown = () => {
    //     setDropDown(!dropDown);
    // }

    // const SignOut = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
           
    //       }).catch((error) => {
    //         // An error happened.
    //       });
    // }

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