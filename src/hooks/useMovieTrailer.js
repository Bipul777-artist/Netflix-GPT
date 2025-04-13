import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieTrailers } from "../utils/movieSlice";
import {API_OPTIONS} from "../utils/constant";

const useMovieTrailer = (movieId) => {


    const dispatch = useDispatch();
    const TrailerVideo = useSelector(store => store.movies.movieTrailers)

    const FetchVideo = async () => {
    //     const video = await fetch(
    //     "https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
    //     API_OPTIONS
    // );

    const [movie, webShow] = await Promise.allSettled([
      fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/' + movieId + '/videos' , API_OPTIONS),
      fetch('https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/tv/'+ movieId + '/videos', API_OPTIONS)

  ])

  if (movie.status === "fulfilled" && movie.value.ok) {

    const videoJson = await movie.value.json();
    // console.log(videoJson);
    

    const Trailers = videoJson.results.filter((x) => x.type === "Trailer");
    const trailerVideo = Trailers.length ? Trailers[0] : videoJson.results[0];
    // console.log(trailerVideo.key);
    dispatch(movieTrailers(trailerVideo.key));
  }

  if (webShow.status === "fulfilled" && webShow.value.ok) {

    const videoJson = await webShow.value.json();
    // console.log(videoJson);
    const Trailers = videoJson.results.filter((x) => x.type === "Trailer");
    const trailerVideo = Trailers.length ? Trailers[0] : videoJson.results[0];
    // console.log(trailerVideo.key);

    dispatch(movieTrailers(trailerVideo.key));
  }

  };

  useEffect(() => {
    !TrailerVideo && FetchVideo();
  }, []);
};

export default useMovieTrailer;