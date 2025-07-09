
import { useEffect, useRef, useState } from "react";
import {CLOUD_FUNCTION_URL, FAQ, IMG_CDN} from "../utils/constant"
import {ChevronRight, ChevronLeft} from 'lucide-react'
import Accordian from "./Accordian";

const SecondPart = () => {

    const [videoList, setVideoList] = useState([])
    const[activeIndex, setActiveIndex] = useState(null);
    const carouselRef = useRef();

    const handleToggle  = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
     }
    
    useEffect(() => {
        fetchTrendingVideos()
    }, [])

    const handleScroll = (direction) => {
        const currentPosition = carouselRef.current.scrollLeft;
        let position = 600;
        if (direction === 'left') {
            carouselRef.current.scrollTo({
                left: currentPosition - position,
                behavior: 'smooth'
            })
        } else {
            carouselRef.current.scrollTo({
                left: currentPosition + position,
                behavior: 'smooth'
            })
        }

    }
   
    const fetchTrendingVideos = async () => {
        const trendingPath = '/trending/movie/day';
            const trendingUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(trendingPath)}`;
            // console.log("Fetching from:", trendingUrl); // For debugging
            const trendingResponse = await fetch(trendingUrl); // No API_OPTIONS
            const trendingJson = await trendingResponse.json();
            // console.log(trendingJson);
           
            setVideoList(trendingJson.results)
               
        
            // console.log(videoList);
    }

    return (
        <div className="bg-black pt-10 relative w-full h-full">
            <h2 className="text-white ml-10 text-xl my-4 md:ml-32 md:my-4 md:text-2xl">Trending Now</h2>
            <div ref={carouselRef} className="w-3/4 mx-auto flex flex-nowrap overflow-x-auto overflow-y-hidden md:overflow-x-hidden transition-all duration-300 ">
                
                {videoList?.map((data, index) => {
                    return (
                        <div>
                            <div key={index} className="w-3/4 mx-auto">
                                
                                <img className="min-w-32 px-1 min-h-40 md:px-2 border-2 border-black rounded-2xl transition-all duration-300 hover:scale-105 md:min-w-40 md:min-h-44" src={IMG_CDN + data?.backdrop_path} />
                                {/* <h3 className="text-white mx-6">{data?.title}</h3> */}

                            </div>
                            
                        </div>
                    )
                })}
               
                
            </div>
            {/* Handle Left, Right Feature */}
            <div className="">
                    <button className="absolute top-32 left-10">
                        <ChevronLeft
                            onClick={() => handleScroll('left')}
                            
                            className="w-6 h-12 md:w-8 md:h-24 text-white"
                            />
                    </button>

                    <button className="absolute top-32 right-10">
                        <ChevronRight
                            onClick={() => handleScroll('right')}
                            
                            className="w-6 h-12 md:w-8 md:h-24 text-white"
                        />
                    </button>                        
            </div>

            {/* Accordian */}
            <div>
            <div className="w-3/4 mx-auto">
                <h2 className="text-white  font-semibold text-xl my-4 md:ml-32 md:my-4 md:text-2xl">Frequently Asked Questions</h2>
                {
                    FAQ.map((data, index) => {
                        const isOpen = index === activeIndex;
                        return (
                        <Accordian 
                            key={data.id}
                            question={data.question}
                            answer={data.answer}
                            isOpen = {isOpen}
                            onToggle={() => handleToggle(index)}
                        />
                    )})
                }
            </div>
            </div>
        </div>
    )
}


export default SecondPart;