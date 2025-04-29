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
        <div className="relative w-full pt-20 h-screen bg-black md:px-6">
            <h1 className="text-white mx-10 text-md md:text-2xl">My List</h1>
            
            <div className="flex w-full flex-wrap bg-black justify-between md:justify-evenly ">
                {favoritesList.map((item) => {
                            // console.log(item);
                            return (
                            <div className="mx-auto">    
                            <MovieCard 
                                
                                key={item?.id}
                                EachMovie={item}
                                
                            />
                            </div>)

                })}
            </div>
            
        </div>
    )
}

export default FavoriteList;