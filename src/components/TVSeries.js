import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackGround from "./VideoBackground";
import MovieList from "./MovieList";

const TVSeries = () => {

    const series = useSelector((store) => store.movies?.topRatedSeries);

    const movies = useSelector((store) => store.movies)
    if (!movies) return (
        <div className="bg-red-700 text-white w-full h-4">
            LOADING
        </div>
    )

    if (!series) return ;

    const MainMovie = series[3];
    // console.log(MainMovie);
    const {overview, id , original_name} = MainMovie

    return (
        <div>
            <VideoTitle title={original_name} overview={overview} />
            <VideoBackGround movieId={id} />
            <div className=" bg-black">
                <div className="relative -mt-30 z-10 md:-mt-48">
                    <MovieList title={"Highly Rated Web Shows"} movie={movies?.topRatedSeries} />
                    <MovieList title={"Popular Web Shows"} movie={movies?.popularShows} />
                </div>
             </div>
        </div>
    )
};

export default TVSeries;