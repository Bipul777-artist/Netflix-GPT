
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
            // console.log('Aborting previous fetch request');
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


            // --- Corrected Structure for Movie Result ---
            if (movie.status === "fulfilled" && movie.value.ok) { // Check if promise resolved
                // console.log()

                const movieJson = await movie.value.json();
                console.log(movieJson);
                if (movieJson.results && movieJson.results.length > 0) {
                    const clipObj = movieJson.results.find((x) => x.type === "Clip");
                    foundKey = clipObj?.key || movieJson.results[0]?.key;
                }
             
                else {
                // Handle cases where promise fulfilled BUT HTTP status was error (e.g., 401, 404, 500)
                if (movieJson.results !== 404) { // Don't log 404 as an error if movie/tv just doesn't exist
                    console.error(`TMDB Proxy Error (Movie): Status ${movieJson.results}`);
                }
        }
                }       
            else { // movie.status === "rejected"
    // Handle cases where the fetch promise itself failed (network error, CORS, AbortError)
        if (movie.reason.name !== 'AbortError') { // Don't log cancellation errors
            console.error("Fetching Movie Videos Failed:", movie.reason);
        }
            }


            if (!foundKey && webShow.status === "fulfilled" && webShow.value.ok) { // Check !foundKey first
                const webShowJson = await webShow.value.json();
                // const response = webShow.value; // Get the Response object
                if (webShowJson.results && webShowJson.results.length > 0) {
                    const clipObj = webShowJson.results.find((x) => x.type === "Clip");
                    foundKey = clipObj?.key || webShowJson.results[0]?.key;
                }

               
                else {
                    // Handle cases where promise fulfilled BUT HTTP status was error
                    if (webShowJson.results.status !== 404) {
                        console.error(`TMDB Proxy Error (Web Series): Status ${webShowJson.results.status}`);
                    }
                }
            } else if (!foundKey && webShow.status === 'rejected') { // Note: 'else if' because we only care if !foundKey
                // Handle cases where the fetch promise itself failed
                if (webShow.reason.name !== 'AbortError') {
                    console.error("Fetching Web Series Videos Failed:", webShow.reason);
                }
            }

                // --- Final State Update (only if this request wasn't aborted) ---
                // We check signal.aborted again just in case it was aborted *during* processing
            if (!signal.aborted) {
                    // console.log(`Setting videoId for ${movieId} to: ${foundKey}`); // Debug log
                setVideoId(foundKey); // Set to the key found or null if none found
                    
                dispatch(addMovieYoutubeKey(foundKey)); // Dispatch if needed
                    
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
    }, [CLOUD_FUNCTION_URL, dispatch])

    return {videoId, fetchYoutubeKey, error};

}
export default useHoveredVideo;