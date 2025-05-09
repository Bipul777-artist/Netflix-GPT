import { HomePage_img } from "../utils/constant";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
    return (
        <>
            <div className="bg-black h-screen w-full overflow-x-hidden bg-opacity-70">
                <div className="">
                    <img alt="Cards" className="fixed h-screen -z-10 md:w-full md:h-full" src= {HomePage_img} />
                </div>
                <GPTSearchBar />
                <GPTMovieSuggestions />
            </div>
        </>
    )
};

export default GPTSearch;