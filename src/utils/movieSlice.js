import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',

    initialState : {
        nowPlayingMovies:  null,
        topRatedSeries : null,
        popularMovies :null,
        popularShows: null,
        trendingVideos: null,
        movieTrailers: null,
        hoverContent: null,
        hoverYoutubeKey: null, 
        contentKey: null, 
        YoutubeKey: null,
        content: [],
        backUpImg: null,
    }, 

    reducers : {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies =  action.payload;
        },
        movieTrailers: (state, action) => {
            state.movieTrailers = action.payload;
        },
        addTopRatedSeries: (state, action) => {
            state.topRatedSeries = action.payload;
        },
        addPopularMovies : (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrendingVideos: (state, action) => {
            state.trendingVideos = action.payload;
        },
        addPopularShows: (state, action) => {
            state.popularShows = action.payload;
        },
        addHoveredContent : (state, action) => {
            state.hoverContent = action.payload;
        },
        addMovieYoutubeKey : (state, action) => {
            state.YoutubeKey = action.payload;
        },
        addContentKey : (state, action) => {
            state.contentKey = action.payload;
        },
        addContent: (state, action) => {
            state.content = action.payload;
        },
        addBackUpImg : (state, action) => {
            state.backUpImg = action.payload;
        }
    }
})

export const {addNowPlayingMovies, movieTrailers, addTopRatedSeries, addBackUpImg, addPopularShows, addPopularMovies,addTrendingVideos, addContent, addMovieYoutubeKey, addContentKey , addHoveredContent, clearNowPlayingMovies} = movieSlice.actions;

export default movieSlice.reducer;