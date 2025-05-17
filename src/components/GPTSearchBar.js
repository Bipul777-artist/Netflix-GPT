
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";
import { genAI} from "../utils/openapi";
import { useRef, useState } from "react";
import { API_OPTIONS, CLOUD_FUNCTION_URL } from "../utils/constant";
import { addContentDetails, clearContentDetails, setIsLoading } from "../utils/gptSlice";
// import { clearNowPlayingMovies } from "../utils/movieSlice";


const GPTSearchBar = () => {

    const dispatch = useDispatch();
    // const clearEntries = useSelector((store) => store.gptSlice.contentNames);
    // const showType = useSelector(store => store.gptSlice.contentType);
    const [showType, setShowType] = useState("Movies")
    const selectedOption = useRef(null);
    const input = useRef(null);
    const [inputText, setInputText] = useState('');
    const {contentNames, contentDetails } = useSelector(store => store.gptSlice);
    const langKey = useSelector(store => store.config.lang);
    // console.log(langKey);

    const geminiProxyUrl = 'https://comfy-bonbon-7c052c.netlify.app/.netlify/functions/geminiProxy'; // Your NEW function URL
    // const hfProxyUrl = 'https://comfy-bonbon-7c052c.netlify.app/netlify/functions/hfProxy'

    const test_url = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/geminiProxy'  // Production path (relative to your site root)
  : 'http://localhost:8888/.netlify/functions/geminiProxy';  // Development path

    // const hfProxyUrl = './netlify/functions/hfProxy'
    const HandleContentType = () => {
        
        setShowType("Movies" ? "Web Series" : "Movies");
        setInputText("");
        dispatch(clearContentDetails());
    }

    const searchTMDBMovie = async (movie) => {
        // console.log("Searching in TMDB");
       
        // const movies = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS)
        // console.log(movies);
        const moviePath = `/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`
        const movieUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(moviePath)}`
        const movies = await fetch(movieUrl);

        dispatch(setIsLoading(true));

        if (!movies.ok) {
            // console.error(`TMDB Error for query: Status ${movies.status}`);
            return null; // Stop here and return null if fetch failed
        }
        
        const moviesJson = await movies.json();
        // console.log(moviesJson);
        // console.log(moviesJson.results);
        return moviesJson.results; 
        // console.log(moviesJson.results);
        // console.log(selectedOption.current.value);
    }

    const searchWebSeries = async (show) => {
        dispatch(setIsLoading(true));
        // const webshows = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/search/tv?query='+ show +'&include_adult=false&language=en-US&page=1', API_OPTIONS)
        const webSeriesPath = `/search/movie?query=${show}&include_adult=false&language=en-US&page=1`
        const webSeriesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(webSeriesPath)}`
        const webshows = await fetch(webSeriesUrl);
        
        if (!webshows.ok) {
            console.error(`TMDB Error for query: Status ${webshows.status}`);
            return null; // Stop here and return null if fetch failed
        }
        const webShowsJson = await webshows.json();
        // console.log(webShowsJson);

        return webShowsJson.results;
    }

    const handleGPTSearch = async (e) => {
       
        const userInput = input.current.value;
        e.preventDefault();

        const MovieQuery = `List exactly 5 movie titles related to: ${userInput}. Output only a comma-separated list.` ;

        const WebShowsQuery = `List exactly 5 web series titles related to: "${userInput}". Output only a comma-separated list.`;

        // Calling Gemini API
        if (showType === "Movies") {
        try {
            const MovieResults = await fetch(test_url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: MovieQuery }),
                // body: JSON.stringify({ 
                //     test: 'Hello from frontend' 
                //   }),
              });

            if (!MovieResults.ok) {
                // Handle error from the proxy function
                const errorData = await MovieResults.json();
                throw new Error(errorData.error || `HTTP error! status: ${MovieResults.status}`);
            }
            
            const data = await MovieResults.json();
            console.log(data);

    // 3. Check if the expected 'result' field exists
        // if (!data || typeof data.result !== 'string') {
        //     // console.error("Unexpected response format from proxy:", data);
        //     throw new Error("Received unexpected data format from proxy function.");
        // }

        let text = '';
        const candidate = data.candidates[0];
        
        // Debug the candidate structure
        console.log("Candidate structure:", JSON.stringify(candidate));
        
        if (candidate.content && typeof candidate.content === 'string') {
            text = candidate.content;
        } else if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
            text = candidate.content.parts[0];
        } else if (candidate.content && candidate.content.text) {
            text = candidate.content.text;
        } else {
            console.error("Unable to find text content in response", candidate);
            throw new Error("Could not extract text from API response");
        }
        
        // console.log("Extracted text:", text);

        // 5. Split the string (add trim() for robustness)
        // Split by comma, then trim whitespace from each resulting name
        // const moviesNames = text.trim().split(',').map(name => name.trim()).filter(name => name.length > 0);
        // console.log("Movie Name:", moviesNames);

        const OutputText = text.text;
        // console.log("OutputText:", OutputText);

        const moviesNames = OutputText.split(',').map(data => data.trim()).filter(data => data.length > 0)
        // console.log("Movies:", moviesNames)

        // console.log("Parsed movie names:", moviesNames);

        // For the names we received, we will search the movies in TMDB
        const promiseArray = moviesNames.map((movie) => searchTMDBMovie(movie)); // Use the correctly parsed names

        const moviesTMDB = await Promise.all(promiseArray);
            dispatch(addContentDetails({contentNames : moviesNames, contentDetails : moviesTMDB}))
        }
        catch (error) {
            // console.error("Error fetching from Gemini proxy:", error);
        }
        finally {
            dispatch(setIsLoading(false));
        }
    }

        
        else if (showType === "Web Series") {
            // console.log("Web series hain");
            
            try{
                const WebShowsResults = await fetch(test_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: WebShowsQuery }), // Send prompt in body
                })
                console.log(WebShowsResults);
               
                const data = await WebShowsResults.json();
                let text = '';
                const candidate = data.candidates[0];
                
                // Debug the candidate structure
                console.log("Candidate structure:", JSON.stringify(candidate));
                
                if (candidate.content && typeof candidate.content === 'string') {
                    text = candidate.content;
                } else if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
                    text = candidate.content.parts[0];
                } else if (candidate.content && candidate.content.text) {
                    text = candidate.content.text;
                } else {
                    console.error("Unable to find text content in response", candidate);
                    throw new Error("Could not extract text from API response");
                }

                const OutputText = text.text;
                // console.log("OutputText:", OutputText);

                const moviesNames = OutputText.split(',').map(data => data.trim()).filter(data => data.length > 0)
                // console.log("Movies:", moviesNames)

                // console.log("Parsed movie names:", moviesNames);

                // For the names we received, we will search the movies in TMDB
                const promiseArray = moviesNames.map((movie) => searchTMDBMovie(movie)); // Use the correctly parsed names

                const moviesTMDB = await Promise.all(promiseArray);
                dispatch(addContentDetails({contentNames : moviesNames, contentDetails : moviesTMDB}))
                
            }

            catch (error) {
                console.error("Error fetching from Gemini proxy:", error);
            }
            finally {
                dispatch(setIsLoading(false));
            }
         
        }

    }
   

    return (
        <div className="pt-[20%] flex flex-col items-center justify-center overflow-hidden md:pt-[10%]">
            <div className="text-white text-md font-semibold md:text-2xl">
                <h1 className="text-center">
                    Don't have a name?
                </h1>
                <h1 className="px-2">Let us know what gener you want to see and we will suggest some names.</h1>
                <select ref={selectedOption} onChange={HandleContentType} className="ml-6 bg-red-700 text-white border-1 rounded-md border-white px-1 py-1.5 md:px-1.5 md:py-2.5 my-4 md:ml-16">
                    <option>Movies </option>
                    <option>Web Series</option>
                </select>
            </div>
            <form onSubmit={handleGPTSearch} className="p-6 w-full flex flex-col justify-between items-center gap-2 md:grid md:grid-cols-12 md:bg-transparent md:gap-3 md:w-1/2">
                <input ref={input} onChange={(e) => setInputText(e.target.value)} className="md:col-span-9 px-3 py-2 border-2 border-white rounded-md w-full" type="text" 
                    placeholder={lang[langKey].gptPlaceHolder} value={inputText}
                />
                <button onClick={handleGPTSearch} className="w-1/4 bg-red-700 px-2.5 py-1.5 text-white text-2xl border-1 border-red rounded-md md:col-span-3 md:w-full">
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar;