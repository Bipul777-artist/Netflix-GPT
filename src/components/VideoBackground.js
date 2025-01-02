
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieId }) => {
    
    const FetchTrailer = useSelector((store) => store?.movies?.movieTrailers)
    
    useMovieTrailer(movieId);
  return (
    <div className="aspect-w-16 aspect-h-9 w-full border-b-2 border-black">
      <iframe
        className="w-full h-full"
        // src="https://www.youtube.com/embed/4poFokW1V5U?si=IDwFKh-y5djDZBL-?autoplay=1&mute=1"
        src={"https://www.youtube.com/embed/" + FetchTrailer + "?autoplay=1&mute=1"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackGround;
