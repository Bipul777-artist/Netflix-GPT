import { IMG_CDN, genreLookUp, genre_name } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlay,
  faPlus,
  faThumbsUp, faHeart, faThumbsDown, faCircleChevronDown, faCheck, faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import VideoBackGround from "./VideoBackground";
import { useDispatch, useSelector } from "react-redux";
import { addHoveredContent, addContent } from "../utils/movieSlice";
import useHoveredVideo from "../hooks/useHoveredVideo";
import { useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
// If the preview feature and Watch Feature works, remove videoId from useHovered Hook and here!

const MovieCard = ({ EachMovie, key}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MovieKey = useSelector((store) => store.movies.hoverContent)
  const contentKey = useSelector((store) => store.movies.YoutubeKey)
  const {videoId, fetchYoutubeKey} = useHoveredVideo();
  // {console.log(EachMovie)};
  const [isHovering, setIsHovering] = useState(false);
  const [previewStarted, setPreviewStarted] = useState(false);
  const [showLikeButton, setShowLikeButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef();

  const { isContentInFavorites, addContentToFavorites, removeContentFromFavorites } = useFavorites();
  const isFavorite = isContentInFavorites(EachMovie.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeContentFromFavorites(EachMovie.id);
    } else {
      addContentToFavorites(EachMovie);
    }
  };

  const getVideoUrl = () => {

    return `https://www.youtube.com/embed/${contentKey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=0&fs=0&playsinline=1&loop=1&rel=0&showinfo=0&playlist=${contentKey}`
  };
  
  const callHover = (movieId) => {
      dispatch(addHoveredContent(movieId));
      setIsHovering(true);
  }

  const handleMouseAwayMovement = () => {
    setIsHovering(false) 
    setIsMuted(!isMuted);
  }
  
  useEffect(() => {
    if (MovieKey) {
      fetchYoutubeKey(MovieKey);
    }
  }, [MovieKey, fetchYoutubeKey])



  useEffect(() => {
    let timer;
    if (isHovering) {
      timer = setTimeout(() => {
        setPreviewStarted(true);
        // useHoveredVideo();
      }, 2000);
    } else {
      setPreviewStarted(false);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  const getGenreNames = (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds) || genreIds.length === 0) {
      return 
    }

    return genreIds
      .map(data => genreLookUp[data] || null)
      .filter(name => name !== null)
      .join(" . ")
  }

  const handlePlayContent = (movieId) => {
    if (window.innerWidth < 768) {
    navigate(`/watch/${movieId.id}`);
    // {console.log(movieId)};
    localStorage.setItem('currenContentId', movieId.id);
    localStorage.setItem('currentContentDetails', JSON.stringify(movieId));
    dispatch(addContent(movieId));
    } 
    // fetchYoutubeKey(movieId.id);
  }

  const handlePlayContentForLargeScreen = (e, movieId) => {
    e.stopPropagation();
    navigate(`/watch/${movieId.id}`);
    localStorage.setItem('currentContentDetails', JSON.stringify(movieId));
    dispatch(addContent(movieId));
  }

  const handleReaction = (reaction) => {
    if (selectedOption === reaction) {
      setSelectedOption(null)
    } else {
      setSelectedOption(reaction)
    }
  

    setClickedButton(reaction);

    setTimeout(() => {
      setClickedButton(null);
    }, 300)
  }

  const toggleMute = () => {
    if (playerRef.current) {
        // Access the YouTube iframe API
        if (isMuted) {
          playerRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        } else {
          playerRef.current.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        }
        setIsMuted(!isMuted);
      }
};

  return (
    <div className="relative group h-48 flex items-center justify-center"
    >
      <div className="w-72 h-40 relative">
        <div
          className={`relative rounded-lg overflow-hidden
            transition-all duration-500 ease-in-out ${
              isHovering 
                ? 'w-96 h-64 -translate-x-4 -translate-y-8 z-40 -top-4 shadow-xl' 
                : 'w-52 h-32 md:w-72 md:h-40 z-10'
            }`}
          onClick={() => handlePlayContent(EachMovie)}
          onMouseEnter={() => callHover(EachMovie.id)}
          onMouseLeave={() => handleMouseAwayMovement()}
          
        >
          
          <img
             
            src={IMG_CDN + EachMovie.backdrop_path || IMG_CDN + EachMovie.poster_path} 
            // alt={EachMovie.title || movie.name}
            className={`min-w-full min-h-full object-cover transition-opacity duration-300
              ${previewStarted ? 'opacity-0' : 'opacity-100'}`}
          />

          {previewStarted &&
            <div className="absolute inset-0 w-full h-full bg-black">
              <div className="relative w-full h-full overflow-hidden">
                <div className="w-full h-0 pb-[56.25%] relative">
                  
                    <iframe 
                    ref={playerRef}
                    src={getVideoUrl()} 
                    title="Movie Preview" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute top-1/2 left-0 w-full h-[176%] -translate-y-1/2"
                    loading="lazy"
                  ></iframe>
                </div>
                {/* Sound Options */}
                <button
                    onClick={toggleMute}
                    className="absolute z-30 bottom-8 right-10 transform bg-transparent md:text-gray-200 hover:text-white rounded-full p-4 transition-all md:bottom-1/3 md:-translate-y-2/3 md:right-1/4 md:translate-x-2/3"
                    >
                    
                        {isMuted ? <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <line x1="23" y1="9" x2="17" y2="15"></line>
                                <line x1="17" y1="9" x2="23" y2="15"></line>
                                </svg>
                            
                            </div> : 
                        (<div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                        </div>)
                        }
                    
                </button>
              </div>
            </div>
          }

          {isHovering &&
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 bg-black text-white">
              <h3 className="font-bold text-md">{EachMovie.original_title || EachMovie.name}</h3>
              <div className="flex">
                <button className="ml-2 ">
                  <FontAwesomeIcon className="h-6 w-6 my-0.5" icon={faPlay} />
                </button>
                
                <button onClick={handleToggleFavorite} className="ml-2 transition-all duration-600 ease-in-out">
                  {isFavorite ? 
                  <FontAwesomeIcon className={`
                    p-2
                    rounded-full
                    transistion-all
                    duration-300
                    ${isFavorite ? 'scale-125' : 'scale-100'}
                    h-6 w-6 my-0.5`} icon={faCheck} /> : 
                  <FontAwesomeIcon className={`
                    p-2
                    rounded-full
                    transistion-all
                    duration-300
                    ${isFavorite ? 'scale-125' : 'scale-100'}
                    h-6 w-6 my-0.5`} icon={faPlus} />}
                </button>
                
                <div className="relative"
                  onMouseEnter={() => setShowLikeButton(true)}
                  onMouseLeave={() => setShowLikeButton(false)}
                >
                  
                  
                  {showLikeButton ? 
                  <div className="flex justify-center items-center transition-all duration-600 ease-in-out gap-2">
                    <button 
                      onClick={() => handleReaction('love')} 
                      className={`
                        p-2
                        rounded-full
                        transistion-all
                        duration-300
                        ${clickedButton === 'love' ? 'scale-125' : 'scale-100'}
                      `}
                      >
                      <FontAwesomeIcon className="h-6 w-6 my-0.5"  icon={faHeart} />
                    </button>
                    <button
                      className={`
                        p-2 
                        hover:bg-slate-600
                        rounded-full 
                        transition-all 
                        duration-300
                        ${clickedButton === 'like' ? 'scale-125' : 'scale-100'}
                        
                      `}
                    
                      onClick={() => handleReaction('like')}>
                      <FontAwesomeIcon className="h-6 w-6 my-0.5" icon={faThumbsUp} />
                    
                    </button>
                    <button 
                      className={`
                        p-2 
                        
                        rounded-full
                        transistion-all
                        duration-300
                        ${clickedButton === 'dislike' ? 'scale-125' : 'scale-100'}
                      `}
                      onClick={() => handleReaction('dislike')}>
                      
                      
                      <FontAwesomeIcon className="h-6 w-6 my-0.5" icon={faThumbsDown} />
                    </button>
                  </div> : (
                    <button>
                      {selectedOption === 'like' ? <FontAwesomeIcon className="text-blue-500 h-6 w-6 ml-2 my-2" icon={faThumbsUp} /> :
                      selectedOption === 'dislike' ? <FontAwesomeIcon className="text-red-600 h-6 w-6 ml-2 my-2" icon={faThumbsDown}/> :
                      selectedOption === 'love' ? <FontAwesomeIcon className="text-pink-600 h-6 w-6 ml-2 my-2" icon={faHeart}/> :
                      <FontAwesomeIcon className="h-6 w-6 ml-2 my-2" icon={faThumbsUp} />
                      }
                    </button>
                  )
                 }
                </div>

                <button 
                  onClick={(e) => handlePlayContentForLargeScreen(e, EachMovie)}
                  className="ml-56">
                  <FontAwesomeIcon className="h-8 w-8 my-0.5" icon={faCircleChevronDown} />  
                </button>
              </div>
              <h3 className="text-sm text-white">{getGenreNames(EachMovie.genre_ids)}</h3>
            </div>
          }


        </div>
      </div>
     
    </div>
  )
};

export default MovieCard;
