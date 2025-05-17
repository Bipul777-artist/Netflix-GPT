import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
    const {contentNames, contentDetails } = useSelector(store => store.gptSlice);
    const loadingStatus = useSelector(store => store.gptSlice.isLoading)
    // console.log(contentNames);
    // console.log(contentDetails);

    if (loadingStatus) {
        return (
            <div className="bg-transparent text-white bg-opacity-90 w-full h-screen">
              {/* Skeleton UI */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="bg-gray-600 rounded-lg p-2 animate-pulse">
                    <div className="bg-gray-400 h-40 rounded-lg mb-2"></div>
                    <div className="bg-gray-400 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-600 h-3 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          );
    }

    if (!contentNames) return

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