import MovieCard from "./MovieCard";


const MovieList = ({title, movie}) => {

     return (

        <div className="pl-4 md:pl-20">
            <h1 className="text-md md:text-3xl mb-2 pb-1 text-white underline">{title}</h1>
            <MovieCard className="" MovieDetails={movie} />
        </div>
        
    )
};

export default MovieList;