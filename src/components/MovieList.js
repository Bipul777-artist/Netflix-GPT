import MovieCard from "./MovieCard";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {ChevronRight,
  ChevronLeft} from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { addHoveredContent } from "../utils/movieSlice";
import { throttle } from "../utils/constant";
import { lazy, Suspense, fallback } from "react";


const MovieList = ({title, movie}) => {

    const dispatch = useDispatch();
    const hoverContentId = useSelector((store) => store.movies.hoverContent)
    const [loadMovies, SetLoadMovies] = useState(6)
    const carouselRef = useRef(0);
    const [previewContentId, setPreviewContentId] = useState(null);
    const hoverTimerRef = useRef(null);
    const previewTimerRef = useRef(null);
    const LazyMovieCard = lazy(() => import('./MovieCard.js'));

    const clearTimers = useCallback(() => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
        if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
        hoverTimerRef.current = null;
        previewTimerRef.current = null
    }, [])

    const handleMouseEnter = useCallback((movieId) => {
        clearTimers();

        hoverTimerRef.current = setTimeout(() => {
            dispatch(addHoveredContent(movieId));
        }, 500)

        previewTimerRef.current = setTimeout(() => {
            setPreviewContentId(movieId);
        }, 500)

    }, [])

    const handleMouseLeave = useCallback(() => {
        clearTimers();
        dispatch(addHoveredContent(null));
        setPreviewContentId(null);
    }, [clearTimers])

    const MovieCardPlaceholder = () => (
        <div className="relative w-52 h-32 md:w-72 md:h-40 bg-gray-800 animate-pulse rounded-lg">
            {/* Apply the exact same aspect-ratio and dimensions as your MovieCard */}
            <div className="relative w-full aspect-[1.8/1] overflow-hidden rounded-t-lg"></div>
            {/* You might also want a placeholder for the bottom info bar if it contributes to height */}
            <div className="absolute min-h-[110px] bottom-0 left-0 right-0 rounded-b-lg px-3 pt-1.5 pb-3 bg-gray-900"></div>
        </div>
    );
    

    // Handling SmoothleftCursor Scroll
    const handleScroll = useCallback(throttle((direction) => {

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
    }, 150), []);

    if (!movie) return null;
    
     return (
        <div className="relative -mb-8 md:mb-0 md:px-6  group" >
                <h1 className="text-md md:text-3xl mb-2 px-2 pb-1 text-white underline">{title}</h1>
                <div className="overflow-x-hidden">
                    <div 
                        onMouseLeave={handleMouseLeave} 
                        ref={carouselRef} 
                        className="pl-2 w-[calc(100%+384px)] md:w-[calc(100%+768px)] flex -space-x-[60px] md:space-x-6 overflow-x-auto md:overflow-x-hidden overflow-y-hidden hover:py-8 md:pl-20"
                        
                    >
                    
                        {movie.slice(0, loadMovies).map((item, index) => {
                            // console.log(item);
                            
                                return (
                                    <>
                                        {
                                            index < 6 ? (
                                                <MovieCard  
                                                    key={item?.id}
                                                    EachMovie={item}
                                                    onMouseEnter = {() => handleMouseEnter(item.id)}
                                                    previewContentId = {previewContentId}
                                                    hoverContentId = {hoverContentId}
                                                    index = {index}
                                                />
                                        ) :
                                        (
                                            <Suspense fallback={<MovieCardPlaceholder />}>
                                                <LazyMovieCard 
                                                    key={item?.id}
                                                    EachMovie={item}
                                                    onMouseEnter = {() => handleMouseEnter(item.id)}
                                                    previewContentId = {previewContentId}
                                                    hoverContentId = {hoverContentId}
                                                    index= {index}
                                                />
                                            </Suspense>
                                        )
                                        }
                                    </>
                                )
                            
                        })}
                        
                    </div>
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