import MovieCard from "./MovieCard";


const MovieList = ({title, movie}) => {

     return (

        <div className=" pl-4 md:pl-20">
            <h1 className="text-3xl mb-2 text-white ">{title}</h1>
            <MovieCard className="" MovieDetails={movie} />
           
        </div>
        
    )
};

export default MovieList;