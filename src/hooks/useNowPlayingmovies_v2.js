import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies, addPopularMovies, addTopRatedSeries, addTrendingVideos } from "../utils/movieSlice";
import { useEffect } from "react";

const CLOUD_FUNCTION_URL = "https://comfy-bonbon-7c052c.netlify.app/.netlify/functions/tmdbProxy";

const useNowPlayingmovies_v2 = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)

    const getNowPlayingMovies = async () => {
        try{
            // Popular Movies
            const nowPlayingPath = '/movie/now_playing';
            const nowPlayingUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(nowPlayingPath)}`;

            const moviesResponse = await fetch(nowPlayingUrl); // API_OPTIONS removed
            const moviesJson = await moviesResponse.json();
            if (moviesResponse.ok) { // Basic check if fetch was successful
                 dispatch(addNowPlayingMovies(moviesJson.results));
            } else {
                //  console.error("Error fetching Now Playing:", moviesJson);
            }

             // --- Top Rated Series ---
             const topRatedSeriesPath = '/tv/top_rated';
             const topRatedSeriesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(topRatedSeriesPath)}`;
             // console.log("Fetching from:", topRatedSeriesUrl); // For debugging
             const webShowsResponse = await fetch(topRatedSeriesUrl); // API_OPTIONS removed
             const webShowsJson = await webShowsResponse.json();
              if (webShowsResponse.ok) {
                 dispatch(addTopRatedSeries(webShowsJson.results));
              } else {
                //  console.error("Error fetching Top Rated Series:", webShowsJson);
              }

            //   Top Rated Movies
            const popularMoviesPath = "/movie/top_rated"; // Or change to /movie/popular
            const popularMoviesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(popularMoviesPath)}`;
            // console.log("Fetching from:", popularMoviesUrl); // For debugging
            const popularMoviesResponse = await fetch(popularMoviesUrl); // API_OPTIONS removed
            const popularMoviesJson = await popularMoviesResponse.json();
            if (popularMoviesResponse.ok) {
                dispatch(addPopularMovies(popularMoviesJson.results)); // Still dispatching to addPopularMovies
            } else {
                // console.error("Error fetching Popular/TopRated Movies:", popularMoviesJson);
            }

             // --- Trending Videos ---
           
            const trendingPath = '/trending/all';
            const trendingUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(trendingPath)}`;
            // console.log("Fetching from:", trendingUrl); // For debugging
            const trendingResponse = await fetch(trendingUrl); // No API_OPTIONS
            const trendingJson = await trendingResponse.json();
            if (trendingResponse.ok) {
               
                 dispatch(addTrendingVideos(trendingJson.results)); 
                
            } else {
                //  console.error("Error fetching Trending:", trendingJson);
            }

        }

        catch (error){
            // console.error("An error occurred during fetch operations:", error);
        }
    }

    useEffect(() => {
        // Your condition to fetch remains the same for now
        // Make sure the selector reflects the data you are actually checking
        if (!nowPlayingMovies) { // Or a more comprehensive check if needed
            getNowPlayingMovies();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch, nowPlayingMovies]); // Include selectors used in the condition
    
}

export default useNowPlayingmovies_v2;