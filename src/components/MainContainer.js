import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if (!movies) return 

    const MainMovie = movies[0];

    const {overview, id , title} = MainMovie

    // console.log(MainMovie);
   return (
        <div className="relative border-b-2 border-black h-[300px] md:h-1/3">
            
            <VideoTitle title={title} overview={overview} />
            <VideoBackGround movieId={id} />
            
        </div>
    )
}

export default MainContainer;