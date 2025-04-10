const VideoTitle = ({title, overview}) => {
    
    return (

        <div className="absolute top-0 left-0 z-10 h-full pl-4 w-screen bg-gradient-to-r from-black md:h-dvh md:w-1/3 md:pl-20">
            <h1 className="font-bold pt-20 mb-4 text-md text-white md:p-2 md:pt-60 md:text-3xl">{title}</h1>
            <h1 className="text-xs p-3 text-white hidden md:block">{overview}</h1>
            <div className="flex w-1/2 mt-2 md:mt-4 md:w-2/3 gap-2">

                <button className="bg-white p-1 border-1 border-white rounded-md hover:bg-gray-200 md:p-3">
                    Play Now
                </button>
                <button className="bg-gray-300 p-1 border-1 border-gray rounded-md hover:bg-white md:p-3">
                    More Info
                </button>
            </div>
        </div>
    )

 }
 
 export default VideoTitle;