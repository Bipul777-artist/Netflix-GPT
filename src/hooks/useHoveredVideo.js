
import { useDispatch, useSelector } from "react-redux";
import { CLOUD_FUNCTION_URL } from "../utils/constant";
import { addMovieYoutubeKey } from "../utils/movieSlice";
import { useCallback, useEffect, useState, useRef } from "react";

const useHoveredVideo = () => {
    const tmdbKey = useSelector((store) => store.movies.contentKey);
    // console.log(tmdbKey);
    // const movieKey = useSelector((store) => store.movies.hoverContent);
    // console.log(movieKey);
    const [videoId, setVideoId] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const fetchControllerRef = useRef(null);

    const fetchYoutubeKey = useCallback(async(movieId) => {

        if (!movieId) {
            setVideoId(null);
            if (fetchControllerRef.current) {
                fetchControllerRef.current.abort(); // Abort any lingering request
                fetchControllerRef.current = null;
            }
            return;
        }

        // --- Cancellation Logic ---
        // 1. Abort any *previous* ongoing request before starting a new one
        if (fetchControllerRef.current) {
            // console.log('Aborting previous fetch request'); // Debug log
            fetchControllerRef.current.abort();
        }

        // 2. Create a new AbortController for *this* request
        const controller = new AbortController();
        // 3. Store this new controller in the ref, replacing the old one
        fetchControllerRef.current = controller;
        const signal = controller.signal;

        // Reset error state for the new request
        setError(null);


        try { 
            const moviePath = `/movie/${movieId}/videos`
            const moviesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(moviePath)}`
            const webSeriesPath  = `/tv/${movieId}/videos`
            const webSeriesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(webSeriesPath)}`

            const [movie, webShow] = await Promise.allSettled([
                fetch(moviesUrl, { signal }),
                fetch(webSeriesUrl, { signal })
            ])

            // If signal.aborted is true here, it means a *newer* request already started
            // and aborted this one while it was in flight.
            if (signal.aborted) {
                // console.log(`Fetch aborted for movieId: ${movieId}, ignoring results.`); // Debug log
                return; // Stop processing if this request was cancelled
            }

            let foundKey = null;

            // Check the response and go ahead
            if (movie.status === "fulfilled" && movie.value.ok) {
                const movieData = await movie.value.json();
                // console.log(movieData);
                if (movieData.results && movieData.results.length > 0) {
                    // 
                    const clipObj = movieData?.results.find((x) => x.type === "Clip");
                    foundKey = clipObj?.key || movieData.results[0]?.key;
                    // console.log(clipObj);
                    // if (clipObj)  {
                    //     const YTKEY = clipObj.key;
                    //     // console.log(YTKEY);
                    //     setVideoId(YTKEY);
                    //     // console.log(videoId);
                    //     dispatch(addMovieYoutubeKey(YTKEY));
                    // }

                    // else {
                    //     setVideoId(movieData?.results[0].key)
                    //     dispatch(addMovieYoutubeKey(movieData?.results[0].key));
                    // };

                }
                else if (movie.status === 'fulfilled' && !movie.value.ok) {
                    // Log non-abort errors if fetch succeeded but API returned error
                if (movie.value.status !== 404) console.error(`TMDB Proxy Error (Movie): Status ${movie.value.status}`);
                } else if (movie.status === 'rejected' && movie.reason.name !== 'AbortError') {
                    console.error("Fetching Movie Videos Failed:", movie.reason);
                }
                
            }

            // 
            if (!foundKey && webShow.status === "fulfilled" && webShow.value.ok) {
                const webShowData = await webShow.value.json();
                // console.log(webShowData);
                if (webShowData.results && webShowData.results.length > 0) {
                    const clipObj = webShowData?.results.find((x) => x.type === "Clip");
                    foundKey = clipObj?.key || webShowData.results[0]?.key;
                    // if (clipObj) {
                    //     const YTKEY = clipObj.key;
                    //     setVideoId(YTKEY);
                    //     dispatch(addMovieYoutubeKey(YTKEY));
                        
                    // }
                    // else {
                    //     setVideoId(webShowData?.results[0].key)
                    //     dispatch(addMovieYoutubeKey(webShowData?.results[0].key));
                    // };
                } else if (!foundKey && webShow.status === 'fulfilled' && !webShow.value.ok) {
                    if (webShow.value.status !== 404) console.error(`TMDB Proxy Error (Web Series): Status ${webShow.value.status}`);
               } else if (!foundKey && webShow.status === 'rejected' && webShow.reason.name !== 'AbortError') {
                   console.error("Fetching Web Series Videos Failed:", webShow.reason);
               }
                
            }

            // --- Final State Update (only if this request wasn't aborted) ---
            // We check signal.aborted again just in case it was aborted *during* processing
            if (!signal.aborted) {
                // console.log(`Setting videoId for ${movieId} to: ${foundKey}`); // Debug log
                setVideoId(foundKey); // Set to the key found or null if none found
                if (foundKey) {
                    dispatch(addMovieYoutubeKey(foundKey)); // Dispatch if needed
                }
             } else {
                // console.log(`Fetch aborted during processing for ${movieId}, state not updated.`); // Debug log
             }
            
        }  
        catch (error) {
            if (error.name !== 'AbortError') {
                console.error(`Error in fetchYoutubeKey for ${movieId}:`, error);
                setError(error);
                setVideoId(null); // Reset video on unexpected error
            } else {
                 // console.log(`Caught expected AbortError for ${movieId}`); // Debug log
            }
        } 
        finally {
            // Optional: Clear the ref *if* it still holds the controller for *this* call.
            // This prevents aborting a *newer* call if the finally block runs late.
            if (fetchControllerRef.current === controller) {
                fetchControllerRef.current = null;
            }
       }
    }, [CLOUD_FUNCTION_URL])

    return {videoId, fetchYoutubeKey, error};

}
export default useHoveredVideo;