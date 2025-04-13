import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieCard from "./MovieCard";
import { IMG_CDN } from "../utils/constant";

const GPTMovieSuggestions = () => {

    
    const {contentNames, contentDetails } = useSelector(store => store.gptSlice);
    // console.log(contentDetails);
    if(!contentNames) return ;

    return (
        <div className="bg-transparent text-white bg-opacity-90 w-full h-screen">
           

                {contentNames.map((content, index) => (
                    <div>
                        <MovieList 
                            key={content}
                            title={content}
                            movie={contentDetails[index]}
                        />
                    </div>

                ))}
            
        </div>
    )
}

export default GPTMovieSuggestions;