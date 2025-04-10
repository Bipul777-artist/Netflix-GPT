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
            {/* <h1 className="text-white">contentNames</h1> */}
            {/* {contentNames.map((data) => {
                return (
                    <div>
                        <h1 className="font-semibold text-3xl">{data}</h1>
                        {contentDetails.map((movie) => {
                            return (
                            <div className="flex">
                                {movie.map((value) => {
                                    if (value?.title === data)
                                    {return (
                                        <div className="flex">
                                            <img src= {IMG_CDN + value?.poster_path} />
                                        </div>

                                    )}
                                })}
                            </div>
                            )
                        })}
                    </div>
                    
                )
               
            })} */}
            
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