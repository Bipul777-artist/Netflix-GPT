import { useState } from "react";
import useFavorites from "../hooks/useFavorites";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
const FavoriteList = () => {
    const { favoritesList } = useFavorites();
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate("/browse");
        }, 300)
        
   }

    if (favoritesList.length === 0) {
        return <div className="bg-black">No favorites added Yet</div>;
      }

    return(
        <div className="relative w-full h-screen bg-black md:px-6 group"
            
        >
        
                <h1 className="text-md absolute top-20 left-10 md:text-3xl px-2 text-white">My List</h1>
                <div className="pl-2 absolute top-1/2 -translate-y-1/2 flex -space-x-[60px] md:space-x-6 flex-wrap hover:py-8 md:pl-20">
                
                    {favoritesList.map((item) => {
                        // console.log(item);
                        return (
                        <MovieCard 
                            key={item?.id}
                            EachMovie={item}
                            
                        />)

                    })}
                    <button 
                onClick={() => handleClose()}
                className={`absolute z-30 -top-8 right-24 bg-black rounded-full p-2 flex border border-white 
                 hover:bg-gray-800 active:scale-95 
                 transition-all duration-150 
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                 ${isExiting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} `}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                    </button>
                </div>
            
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
                <button 
                    onClick={() => handleScroll('left')}
                    className="p-2 z-50 bg-black/50 rounded-full hover:bg-black/75 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 ml-2"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="w-6 h-6 text-white"
                    />
                </button>
                
                <button 
                    onClick={() => handleScroll('right')}
                    className=" p-2 z-50 bg-black/50 rounded-full hover:bg-black/75 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 mr-2"
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-6 h-6 text-white"
                    />
                </button>
            </div> */}
        </div>
    )
}

export default FavoriteList;