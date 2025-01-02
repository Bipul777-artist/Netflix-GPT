import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import movieSlice from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";


const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: movieSlice,
        gptSlice: gptReducer,
        config : configReducer,
    }
});


export default appStore;