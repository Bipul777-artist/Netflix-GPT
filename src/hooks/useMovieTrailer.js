import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieTrailers } from "../utils/movieSlice";
import {API_OPTIONS} from "../utils/constant";

const useMovieTrailer = (movieId) => {
    
    const dispatch = useDispatch();
    const TrailerVideo = useSelector(store => store.movies.movieTrailers)
    const FetchVideo = async () => {
        const video = await fetch(
        "https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
        API_OPTIONS
    );

    const videoJson = await video.json();
    // console.log(videoJson?.results);

    const Trailers = videoJson.results.filter((x) => x.type === "Trailer");
    const trailerVideo = Trailers.length ? Trailers[0] : videoJson.results[0];
    dispatch(movieTrailers(trailerVideo.key));
  };

  useEffect(() => {
    !TrailerVideo && FetchVideo();
  }, []);
};

export default useMovieTrailer;