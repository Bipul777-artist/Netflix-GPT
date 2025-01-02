import { HomePage_img } from "../utils/constant";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
    return (
        <>
            <div className="">
                <div>
                    <img className="absolute -z-10" src= {HomePage_img} />
                </div>
                <GPTSearchBar />
                <GPTMovieSuggestions />
            </div>
        </>
    )
};

export default GPTSearch;