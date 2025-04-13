
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

import { useRef, useState,useEffect } from "react";
import VideoTrailerSkeleton from "./VideoSkeleton";

const VideoBackGround = ({ movieId }) => {

  const playerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [isVideoReady, setIsVideoReady] = useState(true);
    const FetchTrailer = useSelector((store) => store?.movies?.movieTrailers)
    // console.log(FetchTrailer);
    const FetchSeries = useSelector((store) => store.movies.topRatedSeries)
    useMovieTrailer(movieId);
    const [volume, setVolume] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      setIsVideoReady(false);
    }, [movieId]);

    useEffect(() => {
      if (FetchTrailer || FetchSeries) {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [FetchTrailer, FetchSeries]);

    const handleIframeLoad = () => {
      setIsVideoReady(true);
      setIsLoading(false);
    };

    const toggleMute = () => {
      if (playerRef.current) {
          // Access the YouTube iframe API
          if (volume) {
            playerRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
          } else {
            playerRef.current.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
          }
          setVolume(!volume);
        }
  };

  return (
    <div className="w-full border-b-2 border-black relative">
  

      {isLoading ? (
        <VideoTrailerSkeleton />) : 
        (<>
          {(FetchTrailer || FetchSeries) ? (
            <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              ref={playerRef}
              className="absolute -top-4.5 md:-top-20 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${FetchTrailer || FetchSeries}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&loop=1&playlist=${FetchTrailer || FetchSeries}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={handleIframeLoad}
              allowFullScreen
            ></iframe>
          </div>
          ) : (
            <div className="w-full h-0 pb-[56.25%] bg-black flex items-center justify-center">
              <p className="text-white">Video unavailable</p>
            </div>
          )
        }

        {(FetchTrailer || FetchSeries) && 
            <button
            onClick={toggleMute}
            className="absolute z-30 top-36 right-10 transform bg-black bg-opacity-80 hover:bg-opacity-70 text-white rounded-full p-4 transition-all md:top-2/4 md:translate-y-2/3 md:right-40"
            >
                {volume ? (<div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                    
                    </div>) : 
                (<div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                </div>)
                }
            
            </button>
        }
        </>)
      }
        

    </div>
  );
};

export default VideoBackGround;
