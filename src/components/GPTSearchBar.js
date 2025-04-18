
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";
import { genAI} from "../utils/openapi";
import { useRef, useState } from "react";
import { API_OPTIONS, CLOUD_FUNCTION_URL } from "../utils/constant";
import { addContentDetails, clearContentDetails } from "../utils/gptSlice";
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

    // const geminiProxyUrl = 'https://comfy-bonbon-7c052c.netlify.app/.netlify/functions/geminiProxy'; // Your NEW function URL

    const hfProxyUrl = 'https://comfy-bonbon-7c052c.netlify.app/.netlify/functions/hfProxy'
    // const hfProxyUrl = '/.netlify/functions/hfProxy'
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
        const movies = fetch(movieUrl);
        
        const moviesJson = await movies.json();
        // console.log(moviesJson);
        // console.log(moviesJson.results);
        return moviesJson.results; 
        // console.log(moviesJson.results);
        // console.log(selectedOption.current.value);
    }

    const searchWebSeries = async (show) => {
        // const webshows = await fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/search/tv?query='+ show +'&include_adult=false&language=en-US&page=1', API_OPTIONS)
        const webSeriesPath = `/search/movie?query=${show}&include_adult=false&language=en-US&page=1`
        const webSeriesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(webSeriesPath)}`
        const webshows = await fetch(webSeriesUrl);
        const webShowsJson = await webshows.json();
        // console.log(webShowsJson);

        return webShowsJson.results;
    }


    const handleGPTSearch = async (e) => {
       
        e.preventDefault();

        const MovieQuery = "Act as a Movie Recommendation System and suggest me name of five movies for the query" + input.current.value + ". Give me names in comma seperated like in this example. Example Format : Dev-D, Devdas, Kabir Singh, Whiplash, Fight Club" ;

        const WebShowsQuery = "Act as a Web Series Recommendation System and suggest me name of five web series for the query" + input.current.value + ". Give me names in comma seperated like in this example. Example Format :  Dev-D, Devdas, Kabir Singh, Whiplash, Fight Club";

        // Calling Gemini API
        if (showType === "Movies") {
        try {
            const MovieResults = await fetch(hfProxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: MovieQuery }), // Send prompt in body
            })

            if (!MovieResults.ok) {
                // Handle error from the proxy function
                const errorData = await MovieResults.json();
                throw new Error(errorData.error || `HTTP error! status: ${MovieResults.status}`);
            }
            // console.log(MovieResults);
            // const response = await  MovieResults.json();
            // const text =  response.result;
    
            // const moviesNames = text.split(", ");
            // // console.log(moviesNames);
    
            // // For the names we received, we will search the movies in TMDB
            // const promiseArray = moviesNames.map((movie, key) => searchTMDBMovie(movie))
    
            // const moviesTMDB = await Promise.all(promiseArray);
            // console.log(moviesTMDB);
            const data = await MovieResults.json();

    // 3. Check if the expected 'result' field exists
        if (!data || typeof data.result !== 'string') {
            console.error("Unexpected response format from proxy:", data);
            throw new Error("Received unexpected data format from proxy function.");
        }

        // 4. Access the 'result' property which holds the movie string
        const text = data.result;
        console.log("Extracted movie string:", text); // Log the actual string

        // 5. Split the string (add trim() for robustness)
        // Split by comma, then trim whitespace from each resulting name
        const moviesNames = text.trim().split(',').map(name => name.trim()).filter(name => name.length > 0);

        console.log("Parsed movie names:", moviesNames);

        // For the names we received, we will search the movies in TMDB
        const promiseArray = moviesNames.map((movie) => searchTMDBMovie(movie)); // Use the correctly parsed names

        const moviesTMDB = await Promise.all(promiseArray);
            dispatch(addContentDetails({contentNames : moviesNames, contentDetails : moviesTMDB}))
        }
        catch (error) {
            console.error("Error fetching from Gemini proxy:", error);
        }
    }

        // If users want to search for Movies
    //     if (showType === "Movies")
    //     {
    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //     const gptResults = await model.generateContent(MovieQuery);
    //     // console.log(gptResults);
    //     const response =  gptResults.response;
    //     const text =  response.text();

    //     const moviesNames = text.split(", ");
    //     // console.log(moviesNames);

    //     // For the names we received, we will search the movies in TMDB
    //     const promiseArray = moviesNames.map((movie, key) => searchTMDBMovie(movie))

    //     const moviesTMDB = await Promise.all(promiseArray);
    //     // console.log(moviesTMDB);
    //     dispatch(addContentDetails({contentNames : moviesNames, contentDetails : moviesTMDB}))    
    // } 
        
        else if (showType === "Web Series") {
            // console.log("Web series hain");
            

            try{
                const WebShowsResults = await fetch(hfProxyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: WebShowsQuery }), // Send prompt in body
                })

                // const gptResults =  await model.generateContent(WebShowsQuery);
                // console.log(gptResults.response.text());
                const showsNames = WebShowsResults.response.text().split(", ");
                // console.log(WebShowsResults.choices?.[0]?.message?.content);
                // const showsNames =  WebShowsResults.choices?.[0]?.message?.content.split(',');
                // console.log(showsNames);

                // // // Searching the web series in TMDB
                const promiseArray = showsNames.map((show) => searchWebSeries(show))
                const showsTMDB = await Promise.all(promiseArray);

                dispatch((addContentDetails({contentNames : showsNames, contentDetails : showsTMDB})))
            }

            catch (error) {
                console.error("Error fetching from Gemini proxy:", error);
            }
            // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            // const gptResults =  await model.generateContent(WebShowsQuery);
            // console.log(gptResults.response.text());
            // const showsNames = gptResults.response.text().split(", ");
            // console.log(gptResults.choices?.[0]?.message?.content);
            // const showsNames =  gptResults.choices?.[0]?.message?.content.split(',');
            // console.log(showsNames);

            // Searching the web series in TMDB
            // const promiseArray = showsNames.map((show) => searchWebSeries(show))
            // const showsTMDB = await Promise.all(promiseArray);

            // dispatch((addContentDetails({contentNames : showsNames, contentDetails : showsTMDB})))
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
            <form onSubmit={handleGPTSearch} className="p-6 w-full flex flex-col justify-between items-center gap-2 md:grid md:grid-cols-12 md:bg-black md:gap-3 md:w-1/2">
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