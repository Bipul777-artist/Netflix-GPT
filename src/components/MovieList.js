import MovieCard from "./MovieCard";
import { useState, useRef, useEffect } from "react";
import {ChevronRight,
  ChevronLeft} from 'lucide-react'


const MovieList = ({title, movie}) => {

    const [loadMovies, SetLoadMovies] = useState(6)
    const [rowExpanded, setRowExpanded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [leftCursor, setLeftCursor] = useState(0);
    const carouselRef = useRef(0);
    if (!movie) return null;


    // Handling Smooth Scroll
    const handleScroll = (direction) => {
        const carousel = carouselRef.current;
        const currentScroll = carousel.scrollLeft;
        const position = 600;
        const targetScroll = direction === "left" 
            ? currentScroll - position 
            : currentScroll + position;
        
        // Smooth scroll animation function
        const smoothScroll = (start, end, duration) => {
            const startTime = performance.now();
            
            const animateScroll = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    // Easing function for smoother animation
                    const easeInOutQuad = progress < 0.5 
                        ? 2 * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                    
                    carousel.scrollLeft = start + (end - start) * easeInOutQuad;
                    requestAnimationFrame(animateScroll);
                } else {
                    carousel.scrollLeft = end;
                }
            };
            SetLoadMovies((prev) => prev + 6)
            requestAnimationFrame(animateScroll);
        };
        
        // Call smooth scroll with 300ms duration
        smoothScroll(currentScroll, targetScroll, 600);
    };
    

     return (
        <div className="relative -mb-8 md:mb-0 md:px-6 group" >
                <h1 className="text-md md:text-3xl mb-2 px-2 pb-1 text-white underline">{title}</h1>
                <div ref={carouselRef} className="pl-2 flex -space-x-[60px] md:space-x-6 overflow-x-auto md:overflow-x-hidden hover:py-8 md:pl-20">
                
                    {movie.slice(0, loadMovies).map((item) => {
                        // console.log(item);
                        return (
                        <MovieCard 
                            key={item?.id}
                            EachMovie={item}
                            
                        />)

                    })}
                </div>
            
            <div className="absolute h-full md:h-2/5 top-1/3 left-0 right-0 bottom-0 flex items-center justify-between">
                <button 
                    onClick={() => handleScroll('left')}
                    className="p-2 z-50 bg-black/50 h-full md:max-h-2/5 rounded-md hover:bg-black/75 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 ml-2"
                >
                    <ChevronLeft
                      
                        className="w-8 h-24 text-white font-semibold"
                    />
                </button>
                
                <button 
                    onClick={() => handleScroll('right')}
                    className=" p-2 z-50 bg-black/50 rounded-md h-full md:max-h-2/5 hover:bg-black/75 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 mr-2"
                >
                    <ChevronRight
                        
                        className="w-8 h-24 text-white font-semibold"
                    />
                </button>
            </div>
        </div>
    )
};

export default MovieList;