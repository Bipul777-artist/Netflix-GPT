import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',

    initialState : {
        nowPlayingMovies:  null,
        topRatedSeries : null,
        popularMovies :null,
        movieTrailers: null,
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
    }
})

export const {addNowPlayingMovies, movieTrailers, addTopRatedSeries, addPopularMovies, clearNowPlayingMovies} = movieSlice.actions;

export default movieSlice.reducer;