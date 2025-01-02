import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {

    const movies = useSelector((store) => store.movies)
    
    // console.log(movies);

    return (

       movies && <div className="bg-black">
            <div className="-mt-48 relative z-10">
                <MovieList title={"Movie Playing"} movie={movies?.nowPlayingMovies}/>
                <MovieList title={"Web Shows"} movie={movies?.topRatedSeries}/>
                <MovieList title={"Popular Movies"} movie={movies?.popularMovies}/>
                    {/* Movie List - Popular
                        MovieCards * N
                    Movie List Now Playing
                    Web Series 
                    Anime 
                    Documenteries */}
            </div>
        </div>
    )
 }
 
 export default SecondaryContainer;