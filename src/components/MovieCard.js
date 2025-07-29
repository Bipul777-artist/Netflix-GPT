import { IMG_CDN, genreLookUp, genre_name, IsMuted, IsUnMuted} from "../utils/constant";
import React, {  Suspense, fallback, useMemo, useCallback } from "react";
import Play from 'lucide-react/dist/esm/icons/play.js';
import Plus from 'lucide-react/dist/esm/icons/plus.js';
import Heart from 'lucide-react/dist/esm/icons/heart.js';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up.js';
import ThumbsDown from 'lucide-react/dist/esm/icons/thumbs-down.js';
import ChevronDownCircle from 'lucide-react/dist/esm/icons/chevron-down-circle.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import { useEffect, useState, useRef } from "react";
import VideoBackGround from "./VideoBackground";
import { useDispatch, useSelector } from "react-redux";
import { addHoveredContent, addContent } from "../utils/movieSlice";
import useHoveredVideo from "../hooks/useHoveredVideo";
import { useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import AlbumArtPreview from "./HoveredSkeleton";
import LazyVideoPreview from "./LazyVideoPreview";
import useIntersection from "../hooks/useInterSection";


const MovieCard = React.memo(({ EachMovie, index, onMouseEnter, previewContentId, hoverContentId}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MovieKey = useSelector((store) => store.movies.hoverContent)
  const contentKey = useSelector((store) => store.movies.YoutubeKey)
  const {videoId, fetchYoutubeKey} = useHoveredVideo();
  const [hoverTimer, setHoverTimer] = useState(null);
  const [cardRef, isVisible] = useIntersection(0.5);
  const showVideoPreview = hoverContentId === EachMovie.id && previewContentId === EachMovie.id
  
  const [state, setState] = useState({
    imageLoaded : false,
    showLikeButton: false,
    selectedOption: null,
    clickedButton: null,
    isMuted: true,
    moreInfo: false
  })

  const isHovering = hoverContentId === EachMovie.id
  const previewStarted = previewContentId === EachMovie.id
  const playerRef = useRef(null);
  const { isContentInFavorites, addContentToFavorites, removeContentFromFavorites } = useFavorites();
  const isFavorite = useMemo(() => isContentInFavorites(EachMovie.id), [isContentInFavorites, EachMovie.id]);

   // Optimized state updater
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const getVideoUrl = useMemo(() => {
    
    return `https://www.youtube.com/embed/${contentKey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=0&fs=0&playsinline=1&loop=1&rel=0&showinfo=0`;
  },[contentKey])
  
  useEffect(() => {
    if (MovieKey && isHovering) {
      fetchYoutubeKey(MovieKey);
    }
  }, [MovieKey, fetchYoutubeKey, isHovering])


  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeContentFromFavorites(EachMovie.id);
    } else {
      addContentToFavorites(EachMovie);
    }
  }, [isFavorite, removeContentFromFavorites, addContentToFavorites, EachMovie]);

  const getGenreNames = useCallback((genreIds) => {
    if (!genreIds || !Array.isArray(genreIds) || genreIds.length === 0) {
      return 
    }
    return genreIds
      .map(data => genreLookUp[data] || null)
      .filter(name => name !== null)
      .join(" . ")
  }, [EachMovie.genre_ids])

  const handlePlayContent = useCallback((movieId) => {
    if (window.innerWidth < 768) {
    navigate(`/watch/${movieId.id}`);
    // {console.log(movieId)};
    localStorage.setItem('currenContentId', movieId.id);
    localStorage.setItem('currentContentDetails', JSON.stringify(movieId));
    dispatch(addHoveredContent(movieId.id))
    dispatch(addContent(movieId));
    window.scrollTo(0, 0);
    } 
    // fetchYoutubeKey(movieId.id);
  }, [navigate, dispatch])

  const handlePlayContentForLargeScreen = useCallback((e, movieId) => {
    e.stopPropagation();
    navigate(`/watch/${movieId.id}`);
    // console.log(movieId);
    localStorage.setItem('currentContentDetails', JSON.stringify(movieId));
    dispatch(addContent(movieId));
    window.scrollTo(0, 0);
  }, [navigate, dispatch])

  const handleReaction = useCallback((reaction) => {

    const newSelectedOption = state.selectedOption === reaction ? null : reaction

    updateState({
      selectedOption : newSelectedOption, 
      clickedButton : reaction
    })
   
    setTimeout(() => {
      // setClickedButton(null);
      updateState({clickedButton: null})
    }, 300)
  }, [state.selectedOption, updateState])

  const toggleMute = () => {
    playerRef.current?.toggleMute();   // delegate to iframe
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  // Get base dimensions (from non-hovered state)
    const baseWidthMd = 288; // md:w-72 (72 * 4px/unit in Tailwind)
    const baseHeightMd = 160; // md:h-40 (40 * 4px/unit in Tailwind)

    // Get target dimensions (from your desired w-96 h-64)
    const hoverWidth = 384; // w-96 (96 * 4px/unit)
    const hoverHeight = 256; // h-64 (64 * 4px/unit)

    const scaleX = hoverWidth / baseWidthMd; // 384 / 288 = 1.333...
    const scaleY = hoverHeight / baseHeightMd; // 256 / 160 = 1.6

    const finalTranslateX = isHovering ? '-12px' : '0px'; // Move 12px left
    const finalTranslateY = isHovering ? '-8px' : '0px';  // Move 8px up

  return (
    <div className="relative w-52 md:w-72 h-32 md:h-40 flex items-center justify-center">
    
      {EachMovie.backdrop_path &&
      <div onMouseEnter={onMouseEnter} className="relative w-52 h-32 md:w-72 md:h-40 ">
        
        <div
          ref={cardRef}
          className={`absolute aspect-[1.8/1] rounded-lg transition-all duration-500 ease-in-out z-10 w-52 h-32 md:w-72 md:h-40 transform-gpu origin-top-left
            ${
              isHovering 
                ? `scale-x-[1.33] scale-y-[2.0] translate-x-[${finalTranslateX}] translate-y-[${finalTranslateY}] z-40 shadow-xl`                 : ''
            }`
          }    
          onClick={() => handlePlayContent(EachMovie)}
        >
          {!state.imageLoaded && (
            <div className="  min-w-full bg-red-600 border-1 rounded-md min-h-full object-cover ">

            </div>
          )}
          <div className="relative w-full aspect-[1.8/1] overflow-hidden rounded-t-lg">
           <img
            src={IMG_CDN + EachMovie.backdrop_path || IMG_CDN + EachMovie.poster_path} 
            alt={EachMovie.title }
            className={`min-w-full min-h-full  border-1 border-black md:rounded-md object-cover transition-opacity duration-300
              ${previewStarted ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => updateState({imageLoaded :  true})}
            loading={index < 6 ? 'eager' : 'lazy'}
            fetchPriority={index < 3 ? 'high' : 'auto'}
            />
          </div>
          {/* Video Preview */}
          {isVisible && showVideoPreview &&
            <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden bg-black">
              <div className="relative w-full h-full ">
              
                <div className="w-full h-full">
                  <Suspense fallback={<AlbumArtPreview />}>
                    <LazyVideoPreview 
                      ref={playerRef}
                      src={getVideoUrl}
                      muted={state.isMuted} 
                      
                    />
                  </Suspense>
                  
                  
                  <button
                      onClick={toggleMute}
                      className="absolute z-30 bottom-8 right-10 transform bg-transparent md:text-gray-200 hover:text-white rounded-full p-4 transition-all md:bottom-1/3 md:-translate-y-2/3 md:right-1/4 md:translate-x-2/3"
                      >
                      
                          {state.isMuted ? <IsMuted />: <IsUnMuted />
                          
                          }
                      
                  </button>
                  
                  
                </div>
                
                
              </div>
            </div>
          }

          {isHovering &&
            <div className="absolute min-h-[110px] bottom-0 left-0 right-0 rounded-b-lg px-3 pt-1.5 pb-3 bg-black text-white">
              <h3 className="font-bold -my-1.5 text-xs">{EachMovie.original_title || EachMovie.name}</h3>
              <div className="flex -my-2 items-center max-w-full">
                
                
                <button onClick={handleToggleFavorite} className="ml-2 transition-all duration-600 ease-in-out">
                  {isFavorite ? 
                  <Check className={`
                    p-1
                    rounded-full
                    transistion-all
                    duration-300
                    ${isFavorite ? 'scale-125' : 'scale-100'}
                    h-6 w-6 my-0.5`}  /> : 
                  <Plus className={`
                    
                    rounded-full
                    p-1
                    ${isFavorite ? 'scale-125' : 'scale-100'}
                    h-6 w-6 my-0.5`} />}
                </button>
                
                <div className="relative"
                  onMouseEnter={() => updateState({showLikeButton : true})}
                  onMouseLeave={() => updateState({showLikeButton:  false}) }
                >
                  
                  
                  {state.showLikeButton ? 
                  <div className="flex justify-center items-center animate-fadeUp gap-2">
                    <button 
                      onClick={() => handleReaction('love')} 
                      className={`
                        pt-1.5 pb-1
                        h-6 w-6
                        rounded-full
                        transistion-all
                        duration-300
                        
                        ${state.clickedButton === 'love' ? 'scale-125' : 'scale-100'}
                      `}
                      >
                      <Heart className="h-full w-full" />
                    </button>
                    <button
                      className={`
                        pt-1.5 pb-1
                        h-6 w-6
                        rounded-full 
                        transition-all 
                        duration-300
                        
                        ${state.clickedButton === 'like' ? 'scale-125' : 'scale-100'}
                        
                      `}
                    
                      onClick={() => handleReaction('like')}>
                      <ThumbsUp className="h-full w-full" />
                    
                    </button>
                    <button 
                      className={`
                        pt-1.5 pb-1
                        h-6 w-6
                        rounded-full
                        transistion-all
                        duration-300
                        ${state.clickedButton === 'dislike' ? 'scale-75' : 'scale-100'}
                      `}
                      onClick={() => handleReaction('dislike')}>
                      
                      
                      <ThumbsDown className="h-full w-full" />
                    </button>
                  </div> : (
                    <button className="">
                      {state.selectedOption === 'like' ? <ThumbsUp className="text-blue-500 h-6 w-6 ml-2 pt-2"  /> :
                      state.selectedOption === 'dislike' ? <ThumbsDown className="text-red-600 h-6 w-6 ml-2 pt-2" /> :
                      state.selectedOption === 'love' ? <Heart className="text-pink-600 h-6 w-6 ml-2 pt-2" /> :
                      <ThumbsUp className="h-6 w-6 ml-2 pt-1.5 pb-1" />
                      }
                    </button>
                  )
                 }
                </div>

                <button 
                  onMouseEnter={() => updateState({ moreInfo : true})} 
                  onMouseLeave={() => setTimeout(() => {updateState({moreInfo : false})}, 100)}
                  onClick={(e) => handlePlayContentForLargeScreen(e, EachMovie)}
                  className="ml-auto transition-all duration-600 ease-in-out">
                  <ChevronDownCircle className="h-6 w-6  my-0.5"  />  
                  {state.moreInfo && <p className="absolute text-xs right-4 -top-2 px-1 z-50 py-0.5 border-1 rounded-md bg-gray-200 text-black animate-fadeIn opacity-95">More Info</p>}
                </button>
              </div>
              <h3 className="text-[8px] text-white">{getGenreNames(EachMovie.genre_ids)}</h3>
            </div>
          }


        </div>
        
      </div>}
     
    </div>
  )
});

export default MovieCard;

