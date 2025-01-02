import { IMG_CDN } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

const MovieCard = ({ MovieDetails }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef();
  

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);
  
  
  const setPrevIndex = () => {
    setScrollPosition((prevPosition) => prevPosition - 600);
  }

  const setNextIndex = () => {
    setScrollPosition((prevPosition) => prevPosition + 600)
  };


  return (
    <div className="relative h-44 w-full">
      <div
        ref={carouselRef}
        className=" flex overflow-hidden gap-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {MovieDetails?.map((movie, index) => {
          return (
            <div key={index} className="flex w-52">
              {movie.poster_path && 
              <img
                className="hover:scale-110 hover:overflow-visible hover:min-w-1/2 hover:min-h-1/2 min-w-52 h-40 transition duration-500 cursor-pointer border-1 rounded-md"
                src={IMG_CDN + movie.poster_path}
              /> }
              
            </div>
          );
        })}
      </div>
      <div className="w-32 h-36 ">
        <FontAwesomeIcon
          onClick={setNextIndex}
          className="w-16 h-16 text-white font-semibold absolute top-10 right-5 "
          icon={faChevronRight}
        />
        {scrollPosition &&
        <FontAwesomeIcon
          onClick={setPrevIndex}
          className="w-16 h-16 text-white font-semibold absolute top-10 left-5"
          icon={faChevronLeft}
        />}
      </div>
    </div>
  );
};

export default MovieCard;
