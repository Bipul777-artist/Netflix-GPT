import { useNavigate, useParams } from "react-router-dom";
import useHoveredVideo from "../hooks/useHoveredVideo";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect} from "react";
import { addContent } from "../utils/movieSlice";
import {API_OPTIONS, genreLookUp} from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark, faUsers, faStar, faFireFlameCurved,
    faPlus, faCheck, faPlay,
  faThumbsUp, faHeart, faThumbsDown,
}  from "@fortawesome/free-solid-svg-icons";
import useFavorites from "../hooks/useFavorites";

const PlayContent = () => {

    const {movieId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contentDetails = useSelector((store) => store.movies.content);
    const [contentData, setContentData] = useState([contentDetails]);
    const videokey = useSelector((store) => store.movies.YoutubeKey)
    const {videoId, fetchYoutubeKey} = useHoveredVideo();
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef(null);
    const [showLikeButton, setShowLikeButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
    const [isExiting, setIsExiting] = useState(false);
    
    const { isContentInFavorites, addContentToFavorites, removeContentFromFavorites } = useFavorites();
    const isFavorite= isContentInFavorites(movieId);
    const [animationState, setAnimationState] = useState(isContentInFavorites(movieId));
    console.log(isFavorite);

    useEffect(() => {
        setAnimationState(isFavorite);
      }, [isFavorite]);
      
      const handleToggleFavorite = () => {
        // Toggle the animation state immediately for visual feedback
        setAnimationState(!animationState);
        
        // Update Redux (using the current animationState as reference)
        if (!animationState) {
          addContentToFavorites(contentData);
        } else {
          removeContentFromFavorites(movieId);
        }
      };
    useEffect(() => {
        if(movieId){
            fetchYoutubeKey(movieId)
            // dispatch(addContent(contentDetails));
        }
    }, [movieId])

  

    useEffect(() => {
      
        setContentData(JSON.parse(localStorage.getItem('currentContentDetails')));
        // console.log("useEffect called");
        // console.log(JSON.parse(localStorage.getItem('currentContentDetails')))
        
   },[])

   const handleClose = () => {
        localStorage.removeItem('currentContentDetails');
        
        setIsExiting(true);
        setTimeout(() => {
            navigate("/browse");
        }, 300)
        
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

   const getGenres = (genreIds) => {

    if(!genreIds) {
        return 
    }

    return genreIds
      .map(data => genreLookUp[data] || null)
      .filter(name => name !== null)
      .join(" . ")
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
        <div className="relative overflow-x-hidden h-screen bg-black md:flex md:items-center md:justify-center">
             
        <div className="absolute h-screen inset-0 flex">
            <div className="w-1/2 h-full md:bg-gradient-to-r from-red-800/50 to-transparent"></div>
            <div className="w-1/2 h-full md:bg-gradient-to-l from-pink-900/50 to-transparent"></div>
        </div>

      
        <div className="w-full h-full relative">
            <div className="relative max-w-screen-lg max-h-[576px] mx-auto z-10 h-0 pb-[56.25%]">     
                <iframe 
                    ref={playerRef}
                    // className="absolute -top-4.5 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videokey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&loop=1&playlist=${videokey}`}
                    // src= {`https://www.youtube.com/embed/${videokey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=0&fs=0&playsinline=1&loop=1&rel=0&showinfo=0&playlist=${videokey}`} 
                    title="Movie Preview" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute z-10 border-1 rounded-md top-6 left-0 h-full w-full object-cover md:top-24 md:h-3/4"
                    loading="lazy"
                  ></iframe>
            
            {/* Black Overlay */}
            <div className=" md:h-1/4 w-full h-1/3 absolute z-30 -bottom-14 md:bottom-0 left-0 bg-black bg-opacity-75">

            </div>
            </div>
            {/* Sound Options */}
            <button
                onClick={toggleMute}
                className={`absolute z-30 top-36 right-10 transform bg-transparent border-2 ${isMuted ? 'text-slate-300  border-slate-400' : 'text-white border-white'} hover:border-white rounded-full hover:text-white p-4 transition-all md:top-3/4 md:-translate-y-2/3 md:right-1/4 md:translate-x-2/3`}
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
          
            {/* Handling Closing Button */}
            <button 
                onClick={() => handleClose()}
                className={`absolute z-30 top-8 right-6 bg-black rounded-full p-2 flex items-center justify-center border border-white 
                 hover:bg-gray-800 active:scale-95 
                 transition-all duration-150 
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                 ${isExiting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} md:top-32 md:translate-x-1/2 md:right-1/4`}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div className="w-full absolute overflow-hidden text-white font-sans text-md top-52 left-1 z-40 md:text-xl md:left-40 md:-translate-y-1/5 md:top-full">
            <div className="flex">
                <h1 className=" [text-shadow:_0_1px_2px_rgba(255,255,255,0.4)] pl-2 text-2xl md:text-4xl">{contentData.original_name || contentData.title}</h1>
                <div className="ml-2 flex">
                
                <button onClick={handleToggleFavorite} className="ml-2 transition-all duration-300 ease-in-out">
                  {animationState ? 
                  <FontAwesomeIcon className={`
                    p-2
                    bg-transparent
                    border-2 border-white rounded-full
                   
                    transition-all
                    duration-300
                    ${isFavorite ? 'scale-125' : 'scale-100'}
                    md:h-6 md:w-6 my-0.5`} icon={faCheck} /> : 
                  <FontAwesomeIcon className={`
                    p-2
                    bg-transparent
                    border-2 border-white
                    rounded-full
                    transition-all
                    duration-300
                    ${isFavorite ? 'scale-125' : 'scale-100'}
                    w-4 h-4 md:h-6 md:w-6 my-0.5`} icon={faPlus} />}
                </button>
                
                <div className="relative"
                    onClick={() => setShowLikeButton(!showLikeButton)}
                  onMouseEnter={() => setShowLikeButton(true)}
                  onMouseLeave={() => setShowLikeButton(false)}
                >
                  
                  
                  {showLikeButton ? 
                  <div className="flex justify-center items-center transition-all duration-300 ease-in-out gap-2">
                    <button 
                      onClick={() => handleReaction('love')} 
                      className={`
                        p-2
                    
                        rounded-full
                        transition-all
                        duration-300
                        ${clickedButton === 'love' ? 'scale-125' : 'scale-100'}
                      `}
                      >
                      <FontAwesomeIcon className="w-5 h-5 md:h-6 md:w-6 my-0.5"  icon={faHeart} />
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
                      <FontAwesomeIcon className="w-5 h-5  md:h-6 md:w-6 my-0.5" icon={faThumbsUp} />
                    
                    </button>
                    <button 
                      className={`
                        p-2 
                        
                        rounded-full
                        transition-all
                        duration-300
                        ${clickedButton === 'dislike' ? 'scale-125' : 'scale-100'}
                      `}
                      onClick={() => handleReaction('dislike')}>
                      
                      
                      <FontAwesomeIcon className="w-5 h-5 md:h-6 md:w-6 my-0.5" icon={faThumbsDown} />
                    </button>
                  </div> : (
                    <button>
                      {selectedOption === 'like' ? <FontAwesomeIcon className="text-blue-500 w-4 h-4 md:h-6 md:w-6 ml-2 border-2 border-white rounded-full p-2  my-2" icon={faThumbsUp} /> :
                      selectedOption === 'dislike' ? <FontAwesomeIcon className="text-red-600 w-4 h-4 md:h-6 md:w-6 ml-2 border-2 border-white rounded-full p-2  my-2" icon={faThumbsDown}/> :
                      selectedOption === 'love' ? <FontAwesomeIcon className="text-pink-600 border-2 border-white rounded-full p-2 w-4 h-4 md:h-6 md:w-6 ml-2 my-2" icon={faHeart}/> :
                      <FontAwesomeIcon className="w-5 h-5 md:h-6 md:w-6 ml-2 my-2" icon={faThumbsUp} />
                      }
                    </button>
                  )
                 }
                </div>
            </div>
            </div>

                <div className="flex mx-2 overflow-hidden gap-4 md:w-3/4 justify-between">
                <div className="pl-2">
                    <div className="flex mt-2 md:mt-4">
                        <p className="text-gray-500 font-semibold">Popularity </p>
                        <p className="text-white font-bold pl-2">{(contentData.popularity)}</p>
                        <FontAwesomeIcon className="pl-2 pt-1" icon={faFireFlameCurved} />
                    </div>
                     
                    <div className="flex mt-2 md:mt-4 ">
                        <p className="text-gray-500 font-semibold">Rating - </p> 
                        <p className="text-white font-bold pl-2">{contentData.vote_average}</p>
                        <FontAwesomeIcon className="pl-2 pt-1" icon={faStar} />
                    </div>
                    <div className="flex mt-2 md:mt-4">
                        <p className="text-gray-500 font-semibold">Voted By - </p>
                        <p className="text-white font-bold pl-2">{contentData.vote_count}</p>
                        <FontAwesomeIcon className="pl-2 pt-1" icon={faUsers} />
                    </div>
                
                    </div>
                    <div className="flex flex-col flex-nowrap md:flex-row">
                        <p className="text-gray-500 font-semibold">Genres - </p>
                        <p className="text-white pr-2 font-bold md:pl-2">{getGenres(contentData?.genre_ids)}</p>
                    </div>
                    </div>
                    <div className="hidden text-sm my-3 max-w-screen-lg md:block">
                        {contentDetails.overview}
                    </div>
                {/* <h3>{(contentDetails.release_date).getfullYear()}</h3> */}
            </div>
           

        </div>

        
        </div>

    )
};

export default PlayContent;