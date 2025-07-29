import MovieList from "./MovieList";


const SecondaryContainer = ({nowPlayingMovies, topRatedSeries, popularMovies}) => {

    // const movies = useSelector((store) => store.movies)
    // if (!movies) return (
    //     <div className="bg-red-700 text-white w-full h-4">
    //         LOADING
    //     </div>
    // )
    
    // console.log(movies);

    return (

        <div className="bg-black">
            <div className="relative -mt-36 z-10 md:-mt-48 ">
                <MovieList title={"Movie Playing"} movie={nowPlayingMovies}/>
                <MovieList title={"Web Shows"}  movie={topRatedSeries}/>
                <MovieList title={"Popular Movies"} movie={popularMovies}/>
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