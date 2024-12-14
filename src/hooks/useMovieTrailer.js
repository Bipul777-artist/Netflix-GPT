import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieTrailers } from "../utils/movieSlice";
import {API_OPTIONS} from "../utils/constant"

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const FetchVideo = async () => {
        const video = await fetch(
        "https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
        API_OPTIONS
    );

    const videoJson = await video.json();
    // console.log(videoJson?.results);

    const Trailers = videoJson.results.filter((x) => x.type === "Trailer");
    const trailerVideo = Trailers.length ? Trailers[0] : videoJson.results[0];
    console.log(trailerVideo);
    dispatch(movieTrailers(trailerVideo.key));
  };

  useEffect(() => {
    FetchVideo();
  }, []);
};

export default useMovieTrailer;