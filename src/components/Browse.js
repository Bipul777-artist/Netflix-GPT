import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import useNowPlayingMovies from "../hooks/useNowPlayingmoves"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GPTSearch from "./GPTSearch"
import { useDispatch, useSelector } from "react-redux";
import useNowPlayingmovies_v2 from "../hooks/useNowPlayingmovies_v2";
import getMovieData from "../utils/FetchContent";
import { useLoaderData } from "react-router-dom";
import { addPopularMovies } from "../utils/movieSlice";

const Browse = () => {

    // useNowPlayingMovies();
    // useNowPlayingmovies_v2();
    const movieData = useLoaderData();
    const dispatch = useDispatch();
    // console.log(movieData.movieData?.nowPlayingMovies);
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

    useEffect(() => {
        if (movieData) {
            dispatch(addPopularMovies(movieData.movieData?.nowPlayingMovies))
        }
    }, [dispatch, movieData])

    return (
        <div >
            {GPTSliceStatus ? 
                <GPTSearch /> :
                <>
                    <MainContainer 
                        nowPlayingMovies = {movieData.movieData?.nowPlayingMovies} 
                    />
                    <SecondaryContainer 
                        nowPlayingMovies = {movieData.movieData?.nowPlayingMovies}
                        topRatedSeries = {movieData.movieData.topRatedSeries}
                        popularMovies = {movieData.movieData.popularMovies}
                    />
                </> 
            }
           
        </div>
    )
}

export default Browse;