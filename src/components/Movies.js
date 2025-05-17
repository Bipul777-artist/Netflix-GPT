import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import MovieList from "./MovieList"

const Movies = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const popularMovies = useSelector((store) => store.movies?.popularMovies);

    if (!movies) return ;

    const MainMovie = movies[10];
    const {overview, id , title} = MainMovie

    return (
        <div>
            <div>
                <VideoTitle title={title} overview={overview} />
                <VideoBackGround movieId={id} />
             </div>
             <div className=" bg-black">
                <div className="relative -mt-30 z-10 md:-mt-48">
                    <MovieList title={"Movie Playing"} movie={movies}/>
                    <MovieList title={"Fan Favorites"} movie={popularMovies}/>
                </div>
             </div>
             
        </div>
    )
};

export default Movies;