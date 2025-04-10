import { useEffect, useState } from "react"

const VideoTitle = ({title, overview}) => {

    const [visible, setVisible] = useState(true)
    
    useEffect(() => {
       const timer = setTimeout(() => {
            setVisible(false)
        },5000) ;

        return () => clearTimeout(timer)

    },[])

    return (

        <div className="absolute top-0 left-0 z-10 h-full pl-4 w-full bg-gradient-to-r from-black bg-opacity-30 md:h-dvh md:w-1/2 md:pl-20">
        
            {visible ? (
                <div className="{`transition-opacity duration-700 w-1/2 ${visible ? 'opacity-100' : 'opacity-0'}`}">
                    <h1 className=" [text-shadow:_0_1px_2px_rgba(255,255,255,0.4)] pl-2 text-2xl md:text-5xl font-bold pt-20 mb-4 text-md text-white md:p-2 md:pt-60 ">{title}</h1>
                    <h1 className="text-xs p-3 transition-all duration-500 text-white hidden md:block">{overview}</h1>
                </div>

            ) : 
            <div className={`transition-all duration-700 delay-700 absolute w-full ${visible ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <h1 className="[text-shadow:_0_1px_2px_rgba(255,255,255,0.4)] pl-2 text-xl md:text-4xl font-bold pt-20 mb-4 text-white md:p-2 md:pt-60">{title}</h1>
          </div>
        }

        <div className={`flex w-1/2 absolute h-8 md:h-12 top-1/2 mt-2 md:mt-4 md:w-2/3 gap-2 transition-all duration-700 delay-1000 ${visible ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'} top-[110px] md:top-1/2`}>
        <button className="bg-white font-serif text-sm p-1.5 border-1 border-white rounded-md hover:bg-gray-200 md:text-md md:p-2">
          Play Now
        </button>
        <button className="bg-gray-300 font-serif text-sm p-1.5 border-1 border-gray rounded-md hover:bg-white md:text-md md:p-3">
          More Info
        </button>
        </div>

        </div>
    )

 }
 
 export default VideoTitle;