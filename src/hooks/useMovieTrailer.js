import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieTrailers , addBackUpImg} from "../utils/movieSlice";
import {API_OPTIONS} from "../utils/constant";

const useMovieTrailer = (movieId) => {
    // console.log("Hook Received:", movieId)
    const dispatch = useDispatch();
    const TrailerVideo = useSelector(store => store?.movies?.movieTrailers)
    const CLOUD_FUNCTION_URL = "https://comfy-bonbon-7c052c.netlify.app/.netlify/functions/tmdbProxy";

    const FetchVideo = async () => {

      const moviePath = `/movie/${movieId}/videos`
      const movieUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(moviePath)}`;
      const tvPath = `/tv/${movieId}/videos`
      const tvUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(tvPath)}`;

      const path = `/tv/${movieId}`
      const WebShowDetails = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(path)}`

      const ShowPath = `/movie/${movieId}`
      const MovieDetails = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(path)}`
      // {console.log(tvUrl);}

      const [movie, webShow] = await Promise.allSettled([

      fetch(movieUrl),
      fetch(tvUrl)

  ])

  if (movie.status === "fulfilled" && movie.value.ok) {
    try {
    const videoJson = await movie.value.json();
    // console.log(videoJson);

    if (videoJson.results && videoJson.results.length !== 0) {

      const Trailers =  videoJson.results.filter((x) => x.type === "Trailer");

      const MovieTrailer =  Trailers.length ? Trailers[0] : videoJson.results[0];
      // console.log(MovieTrailer.key);
      dispatch(movieTrailers(MovieTrailer.key));
    } else {
        const Image = await fetch(MovieDetails);
        {/* console.log(Image); */}
        const ImageData = await Image.json();
        if (ImageData && ImageData.backdrop_path) {
          dispatch(addBackUpImg(ImageData.backdrop_path));
          {console.log(ImageData)}
        }
    }
  }

  catch {
        const Image = await fetch(MovieDetails);
        {/* console.log(Image); */}
        const ImageData = await Image.json();
        if (ImageData && ImageData.backdrop_path) {
          dispatch(addBackUpImg(ImageData.backdrop_path));
          {console.log(ImageData)}
        }
  }
  }

  else if (webShow.status === "fulfilled" && webShow.value.ok) {
    try {
    const videoJson = await webShow.value.json();
    // console.log("Webseries fetched");
    // console.log(videoJson);
    if (videoJson.results && videoJson.results.length !== 0) {
      
        const Trailers =  videoJson.results.filter(x => x.type === "Trailer");
        const WebShowTrailer =  Trailers.length ? Trailers[0] : videoJson.results[0];
        // console.log(WebShowTrailer.key);

        dispatch(movieTrailers(WebShowTrailer.key))
      
    } else {
      
        const Image = await fetch(WebShowDetails);
        {/* console.log(Image); */}
        const ImageData = await Image.json();
        if (ImageData && ImageData.backdrop_path) {
          dispatch(addBackUpImg(ImageData.backdrop_path));
          {console.log(ImageData)}
        }
      
    } 
    }
    catch (error) {
     
        const Image = await fetch(WebShowDetails);
        {/* console.log(Image); */}
        const ImageData = await Image.json();
        if (ImageData && ImageData.backdrop_path) {
          dispatch(addBackUpImg(ImageData.backdrop_path));
          {console.log(ImageData)}
        }

      
    }
    // {videoJson.results ? (
    // <div>
    //   const Trailers =  videoJson.results.filter((x) => x.type === "Trailer");
    //   const trailerVideo =  Trailers.length ? Trailers[0] : videoJson.results[0];
    //   // console.log(trailerVideo.key);

    //   dispatch(movieTrailers(trailerVideo.key))
    // </div>
    //  ) : 
    //  (
    //   <div>
    //     const Image = await fetch(WebShowDetails);
    //     {/* console.log(Image); */}
    //     const ImageData = await Image.json();
    //     dispatch(addBackUpImg(ImageData.backdrop_path));
    //     {console.log(ImageData)}

    //   </div>
    //  )
    // }
  }

  };

  useEffect(() => {
   if(!TrailerVideo)  {
    FetchVideo()
   }
  }, [movieId]);
};

export default useMovieTrailer;