import CodeBackground from "../utils/CodeBackground";
import { HomePage_img } from "../utils/constant";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
    return (
        <div className="w-full h-screen">
            
            <CodeBackground />
           
            <div className="absolute top-1/2 w-full h-screen left-1/2 -translate-x-1/2 -translate-y-1/2">
               
                <GPTSearchBar />
                <GPTMovieSuggestions />
            </div>
        </div>
    )
};

export default GPTSearch;