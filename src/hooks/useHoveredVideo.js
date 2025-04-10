
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addMovieYoutubeKey } from "../utils/movieSlice";
import { useCallback, useEffect, useState } from "react";

const useHoveredVideo = () => {
    const tmdbKey = useSelector((store) => store.movies.contentKey);
    // console.log(tmdbKey);
    // const movieKey = useSelector((store) => store.movies.hoverContent);
    // console.log(movieKey);
    const [videoId, setVideoId] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchYoutubeKey = useCallback(async(movieId) => {
        try {
            // Try both Web-Series And Movies 
            const [movie, webShow] = await Promise.allSettled([
                fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/' + movieId + '/videos' , API_OPTIONS),
                fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/tv/'+ movieId + '/videos', API_OPTIONS)

            ])

            // Check the response and go ahead
            if (movie.status === "fulfilled" && movie.value.ok) {
                const movieData = await movie.value.json();
                // console.log(movieData);
                if (movieData.results && movieData.results.length > 0) {
                    // 
                    const clipObj = movieData?.results.find((x) => x.type === "Clip");
                    // console.log(clipObj);
                    if (clipObj)  {
                        const YTKEY = clipObj.key;
                        // console.log(YTKEY);
                        setVideoId(YTKEY);
                        // console.log(videoId);
                        dispatch(addMovieYoutubeKey(YTKEY));
                    }

                    else {
                        setVideoId(movieData?.results[0].key)
                        dispatch(addMovieYoutubeKey(movieData?.results[0].key));
                    };

                }
                
            }

            // 
            if (webShow.status === "fulfilled" && webShow.value.ok) {
                const webShowData = await webShow.value.json();
                // console.log(webShowData);
                if (webShowData.results && webShowData.results.length > 0) {
                    const clipObj = webShowData?.results.find((x) => x.type === "Clip");
                    if (clipObj) {
                        const YTKEY = clipObj.key;
                        setVideoId(YTKEY);
                        dispatch(addMovieYoutubeKey(YTKEY));
                        
                    }
                    else {
                        setVideoId(webShowData?.results[0].key)
                        dispatch(addMovieYoutubeKey(webShowData?.results[0].key));
                    };
                }
                
            }
            
        }  
        catch {
            setError(error)
            setVideoId(null);
        } 
    }, [])

    return {videoId, fetchYoutubeKey, error};

}
export default useHoveredVideo;