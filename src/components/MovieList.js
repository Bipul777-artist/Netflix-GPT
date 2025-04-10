import MovieCard from "./MovieCard";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";


const MovieList = ({title, movie}) => {

    const [rowExpanded, setRowExpanded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [leftCursor, setLeftCursor] = useState(0);
    const carouselRef = useRef(0);
    if (!movie) return null;


    const handleScroll = (direction) => {
        const currentScroll = carouselRef.current.scrollLeft;
        let position = 600;
        if (direction === "left") {
            carouselRef.current.scrollTo({
                left : currentScroll - position,
                behavior: "smooth"
            }) 
           
        } else {
            carouselRef.current.scrollTo({
                left : currentScroll + position,
                behavior: "smooth"
            }) 
        }
    };
    

     return (
        <div className="relative -mb-8 md:mb-0 md:px-6 group"
            
        >
        
                <h1 className="text-md md:text-3xl mb-2 px-2 pb-1 text-white underline">{title}</h1>
                <div ref={carouselRef} className="pl-2 flex -space-x-[60px] md:space-x-6 overflow-x-auto md:overflow-x-hidden hover:py-8 md:pl-20">
                
                    {movie.map((item) => {
                        // console.log(item);
                        return (
                        <MovieCard 
                            key={item?.id}
                            EachMovie={item}
                            
                        />)

                    })}
                </div>
            
            <div className="absolute h-full top-0 left-0 right-0 bottom-0 flex items-center justify-between">
                <button 
                    onClick={() => handleScroll('left')}
                    className="p-2 z-50 bg-black/50 h-full rounded-md hover:bg-black/75 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 ml-2"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="w-8 h-24 text-white"
                    />
                </button>
                
                <button 
                    onClick={() => handleScroll('right')}
                    className=" p-2 z-50 bg-black/50 rounded-md h-full hover:bg-black/75 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 mr-2"
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-8 h-24 text-white"
                    />
                </button>
            </div>
        </div>
    )
};

export default MovieList;