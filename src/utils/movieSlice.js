import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',

    initialState : {
        nowPlayingMovies:  null
    }, 

    reducers : {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies =  action.payload;
        },
        movieTrailers: (state, action) => {
            state.movieTrailers = action.payload;
        },
    }
})

export const {addNowPlayingMovies, movieTrailers} = movieSlice.actions;

export default movieSlice.reducer;