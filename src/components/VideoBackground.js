
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieId }) => {
    
    const FetchTrailer = useSelector((store) => store?.movies?.movieTrailers)
    
    useMovieTrailer(movieId);
  return (
    <div className="w-full border-b-2 border-black relative">
      <div className="relative w-full h-0 pb-[56.25%]">
        <iframe
          className="absolute -top-4.5 md:-top-20 left-0 w-full h-full"
          // src="https://www.youtube.com/embed/4poFokW1V5U?si=IDwFKh-y5djDZBL-?autoplay=1&mute=1"
          src={"https://www.youtube.com/embed/" + FetchTrailer + "?autoplay=1&mute=1"}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoBackGround;
