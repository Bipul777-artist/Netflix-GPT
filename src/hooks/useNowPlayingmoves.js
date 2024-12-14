
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    
    const getNowPlayingMovies = async () => {
        const movies = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/now_playing' , API_OPTIONS);
        // console.log(movies);

        const moviesJson = await movies.json();
        
        // console.log(moviesJson);
        dispatch(addNowPlayingMovies(moviesJson.results));
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, [])
};

export default useNowPlayingMovies;