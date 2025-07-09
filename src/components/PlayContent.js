import { useNavigate, useParams } from "react-router-dom";
import useHoveredVideo from "../hooks/useHoveredVideo";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect} from "react";
import { addContent } from "../utils/movieSlice";
import {IMG_CDN, genreLookUp, CLOUD_FUNCTION_URL} from "../utils/constant";
import {
  XCircle,          // Alternative for faCircleXmark
  Users,            // Alternative for faUsers
  Star,             // Alternative for faStar
  Flame,            // Alternative for faFireFlameCurved
  Plus,             // Alternative for faPlus
  Check,            // Alternative for faCheck
  Play,             // Alternative for faPlay
  ThumbsUp,         // Alternative for faThumbsUp
  Heart,            // Alternative for faHeart
  ThumbsDown,       // Alternative for faThumbsDown
} from 'lucide-react';
import useFavorites from "../hooks/useFavorites";
import AlbumArtPreview from "./HoveredSkeleton";
import MovieCard from "./MovieCard";

const PlayContent = () => {

    const {movieId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contentDetails = useSelector((store) => store.movies.content);
    // const [contentData, setContentData] = useState(contentDetails);
    const videokey = useSelector((store) => store.movies.YoutubeKey);
    // console.log(videokey);
    const {videoId, fetchYoutubeKey} = useHoveredVideo();
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef(null);
    const [showLikeButton, setShowLikeButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
    const [isExiting, setIsExiting] = useState(false);
    // Related Content
    const [relatedContent, setRelatedContent] = useState([]);
    // console.log(relatedContent);
    const [loadingRelated, setLoadingRelated] = useState(false);
    
    const { isContentInFavorites, addContentToFavorites, removeContentFromFavorites } = useFavorites();
    const isFavorite= isContentInFavorites(movieId);
    const [animationState, setAnimationState] = useState(isContentInFavorites(movieId));
    // console.log(isFavorite);

    useEffect(() => {
        setAnimationState(isFavorite);
    }, [isFavorite]);
      
      const handleToggleFavorite = () => {
        // Toggle the animation state immediately for visual feedback
        setAnimationState(!animationState);
        
        // Update Redux (using the current animationState as reference)
        if (!animationState) {
          addContentToFavorites(contentDetails);
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


  //  Fetch Related Contents
      useEffect(() => {
        if (contentDetails && contentDetails.genre_ids && contentDetails.genre_ids.length > 0) {
          fetchRelatedContent(contentDetails.genre_ids);
          // setcontentDetails(JSON.parse(localStorage.getItem('currentContentDetails')));
        }
      }, [contentDetails?.genre_ids]);

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

    const fetchRelatedContent = async (genreIds) => {
      if (!genreIds || genreIds.length === 0) return;
      
      setLoadingRelated(true);
      try {
        // Convert array of genre IDs to comma-separated string
        const genreParam = contentDetails.genre_ids;
        
    
        // Create the TMDB path that you want to access
        const moviePath = `/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=${genreParam}`
        
        const movieUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(moviePath)}`

        const webShowPath = `/discover/tv?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=${genreParam}`
        const webShowUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(webShowPath)}}`

        const [movie, webShow] = await Promise.allSettled([
          fetch(movieUrl),
          fetch(webShowUrl)

        ])

        if(movie.status === "fulfilled" && movie.value.ok ) {
          const result = movie.value 
          
            const response = await result.json();
            // console.log("Movie" + response);
          

            const filteredResults = response?.results.filter(item => 
              item.id !== parseInt(movieId)
            ).slice(0, 12); 
            
            setRelatedContent(filteredResults);
            // console.log(relatedContent);
          
        }
        else if (webShow.status === "fulfilled" ) {
          const result = webShow.value 
          if (result.ok){
            const response = await result.json();
            // console.log("WebShow " + response);
            // const data = await response.json();
            // console.log(data);

            const filteredResults = response.results.filter(item => 
              item.id !== parseInt(movieId)
            ).slice(0, 8); 
            
            setRelatedContent(filteredResults);
            // console.log(relatedContent);
          }
        }
       
      } catch (error) {
        // console.error("Error fetching related content:", error);
      } finally {
        setLoadingRelated(false);
      }
    };

    // Displaying Related Content

    const renderRelatedContent = () => {
      if (loadingRelated) {
        return (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        );
      }
      
      if (!relatedContent || relatedContent.length === 0) {
        return null;
      }
      
      return (
        <div className="px-4 w-full md:min-w-4/5 mx-auto mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white my-4">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {/* {console.log(relatedContent)} */}
            {relatedContent.map(item => (
              
              <div 
                
                key={item.id} 
                className="bg-black rounded-md h-full overflow-hidden shadow-lg cursor-pointer transition transform hover:scale-105"
                onClick={() => {
                  // Navigate to the selected content's page
                  localStorage.setItem('currenContentId', item.id);
                  localStorage.setItem('currentContentDetails', JSON.stringify(item));
                  navigate(`/watch/${item.id}`);
                  dispatch(addContent(item));
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative pb-[150%]">
                  {item.poster_path ? (
                    <img 
                      src={IMG_CDN + item?.poster_path}
                      alt={item.title || item.name}
                      className="absolute inset-0 min-w-full min-h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="px-2 py-2">
                  <h3 className="[text-shadow:_0_1px_2px_rgba(255,255,255,0.4)] text-white text-sm text-center md:text-md font-medium truncate">
                    {item.title || item.name}
                  </h3>
                  {/* <div className="flex items-center mt-1">
                    <span className="text-white text-center text-xs md:text-md">
                      {Math.round(item.vote_average * 10)}% Match
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
            {/* <MovieCard EachMovie={relatedContent}/> */}
          </div>
        </div>
      );
    };
    // }

    return (
      <div className=" flex flex-col items-center gap-40 md:gap-12 overflow-x-hidden relative md:h-full bg-black">
       
          <div className="w-full h-full relative">
              <div className="relative max-w-screen-lg max-h-[576px] mx-auto z-10 -md:h-20 pb-[56.25%]"> 
                {videokey ? 
                <div> 
                  <iframe 
                      ref={playerRef}
                      // className="absolute -top-4.5 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videokey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&loop=1&playlist=${videokey}`}
                      // src= {`https://www.youtube.com/embed/${videokey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=0&fs=0&playsinline=1&loop=1&rel=0&showinfo=0&playlist=${videokey}`} 
                      title="Movie Preview" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute z-10 border-1 rounded-md top-0 left-0 h-full w-full object-cover md:top-6 md:h-3/4"
                      loading="lazy"
                  ></iframe>
              
                  {/* Black Overlay */}
                      <div className=" md:h-1/4 w-full h-1/3 absolute z-30 -bottom-14 md:bottom-0 left-0 bg-black bg-opacity-75">

                      </div>
                  
                  {/* Sound Options */}
                  <button
                      onClick={toggleMute}
                      className={`absolute z-30 top-36 right-10  md:w-14 md:h-14 transform bg-transparent border-2 ${isMuted ? 'text-slate-300  border-slate-400' : 'text-white border-white'} hover:border-white rounded-full hover:text-white p-4 transition-all md:top-3/4 md:-translate-y-2/3 md:right-1/4 md:translate-x-2/3`}
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
                </div> : 
                (<AlbumArtPreview />)}  
              </div>
            
              {/* Handling Closing Button */}
              <button 
                  onClick={() => handleClose()}
                  className={`absolute z-30 top-8 right-6 h-10 w-10 md:w-14 md:h-14 bg-black rounded-full p-2 flex items-center justify-center border border-white 
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
              <div className="w-full absolute overflow-hidden text-white font-sans text-md z-40 md:text-xl md:left-40 md:-translate-y-1/5 md:top-3/4">
              <div className="flex">
                  <h1 className=" [text-shadow:_0_1px_2px_rgba(255,255,255,0.4)] pl-2 text-2xl md:text-4xl">{contentDetails.original_name || contentDetails.title}</h1>
                  <div className="ml-2 flex">
                  
                  <button onClick={handleToggleFavorite} className="ml-2 transition-all duration-300 ease-in-out">
                    {animationState ? 
                    <Check className={`
                      p-2
                      bg-transparent
                      border-2 border-white rounded-full
                    
                      transition-all
                      duration-300
                      ${isFavorite ? 'scale-125' : 'scale-100'}
                      md:h-6 md:w-6 my-0.5`}  /> : 
                    <Plus className={`
                      p-2
                      bg-transparent
                      border-2 border-white
                      rounded-full
                      transition-all
                      duration-300
                      ${isFavorite ? 'scale-125' : 'scale-100'}
                      w-4 h-4 md:h-6 md:w-6 my-0.5`} />}
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
                        <Heart className="w-5 h-5 md:h-6 md:w-6 my-0.5"  />
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
                        <ThumbsUp className="w-5 h-5  md:h-6 md:w-6 my-0.5"  />
                      
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
                        
                        
                        <ThumbsDown className="w-5 h-5 md:h-6 md:w-6 my-0.5"  />
                      </button>
                    </div> : (
                      <button>
                        {selectedOption === 'like' ? <ThumbsUp className="text-blue-500 w-4 h-4 md:h-6 md:w-6 ml-2 border-2 border-white rounded-full p-2  my-2"  /> :
                        selectedOption === 'dislike' ? <ThumbsDown className="text-red-600 w-4 h-4 md:h-6 md:w-6 ml-2 border-2 border-white rounded-full p-2  my-2" /> :
                        selectedOption === 'love' ? <Heart className="text-pink-600 border-2 border-white rounded-full p-2 w-4 h-4 md:h-6 md:w-6 ml-2 my-2" /> :
                        <ThumbsUp className="w-5 h-5 md:h-6 md:w-6 ml-2 my-2"  />
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
                          <p className="text-white font-bold pl-2">{(contentDetails.popularity)}</p>
                          <Flame className="pl-2 pt-1"  />
                      </div>
                      
                      <div className="flex mt-2 md:mt-4 ">
                          <p className="text-gray-500 font-semibold">Rating - </p> 
                          <p className="text-white font-bold pl-2">{contentDetails.vote_average}</p>
                          <Star className="pl-2 pt-1" />
                      </div>
                      <div className="flex mt-2 md:mt-4">
                          <p className="text-gray-500 font-semibold">Voted By - </p>
                          <p className="text-white font-bold pl-2">{contentDetails.vote_count}</p>
                          <Users className="pl-2 pt-1"  />
                      </div>
                  
                      </div>
                      <div className="flex flex-col flex-nowrap md:flex-row">
                          <p className="text-gray-500 font-semibold">Genres - </p>
                          <p className="text-white pr-2 font-bold md:pl-2">{getGenres(contentDetails?.genre_ids)}</p>
                      </div>
                      </div>
                      <div className="hidden text-sm my-3 max-w-screen-lg md:block">
                          {contentDetails.overview}
                      </div>
                 
              </div>
            
          </div>
        
        <div>
          {renderRelatedContent()}
        </div>
      </div>            
    )
};

export default PlayContent;