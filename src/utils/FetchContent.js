import { CLOUD_FUNCTION_URL } from "./constant";
const getMovieData = async () => {

    const nowPlayingPath = '/movie/now_playing';
    const nowPlayingUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(nowPlayingPath)}`;
   
    const topRatedSeriesPath = '/tv/top_rated';
    const topRatedSeriesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(topRatedSeriesPath)}`;
    
    const popularMoviesPath = "/movie/top_rated"; // Or change to /movie/popular
    const popularMoviesUrl = `${CLOUD_FUNCTION_URL}?path=${encodeURIComponent(popularMoviesPath)}`;

     const [
            nowPlayingResponse,
            topRatedSeriesResponse,
            popularMoviesResponse
        ] = await Promise.all([
            fetch(nowPlayingUrl),
            fetch(topRatedSeriesUrl),
            fetch(popularMoviesUrl)
        ]);

    const [
        nowPlayingMoviesJson,
        topRatedSeriesResponseJson,
        popularMoviesResponseJson
    ]   = await Promise.all([
        nowPlayingResponse.json(),
        topRatedSeriesResponse.json(),
        popularMoviesResponse.json()
    ])

    return {
        nowPlayingMovies : nowPlayingMoviesJson.results,
        topRatedSeries: topRatedSeriesResponseJson.results,
        popularMovies: popularMoviesResponseJson.results
    }
    
}

export default getMovieData;