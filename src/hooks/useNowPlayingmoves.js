
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies, addPopularMovies, addTopRatedSeries } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)
    
    const getNowPlayingMovies = async () => {
        // Now Playing
        const movies = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/now_playing' , API_OPTIONS);
        // console.log(movies);

        const moviesJson = await movies.json();
        
        // console.log(moviesJson);
        dispatch(addNowPlayingMovies(moviesJson.results));

        // Top Rated Series
        const webShows = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/tv/top_rated', API_OPTIONS);
        // console.log(webShows);
        const webShowsJson = await webShows.json();
        // console.log(webShowsJson.results);
        dispatch(addTopRatedSeries(webShowsJson.results));

        // Popular Movies 
        const popularMovies = await fetch("https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/top_rated", API_OPTIONS)

        const popularMoviesJson = await popularMovies.json();

        // console.log(popularMoviesJson.results);
        dispatch(addPopularMovies(popularMoviesJson.results))


        // Trending Videos
        const Trending = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/trending/all/');

        const TrendingJson = await Trending.json();

        // console.log(TrendingJson?.results);

    }

    useEffect(() => {
      !nowPlayingMovies && getNowPlayingMovies();
    }, [])
};

export default useNowPlayingMovies;