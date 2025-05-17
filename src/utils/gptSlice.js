
import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gptSlice',
    initialState: {
        GPTSlice: false,
        contentNames: null,
        contentDetails: null,
        contentType: 'Movies',
        isLoading: false,
    },
    reducers: {
        toggleGPTView : (state) => {
            state.GPTSlice = !state.GPTSlice;
        },
        addContentDetails : (state, action) => {
            const {contentNames, contentDetails} = action.payload;
            state.contentNames = contentNames;
            state.contentDetails = contentDetails;
        },
        clearContentDetails : (state, action) => {
            state.contentNames = null;
        },
        changeContentType : (state, action) => {
            state.contentType = action.payload;
        },
        setIsLoading : (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const {toggleGPTView, addContentDetails, changeContentType, setIsLoading, clearContentDetails} = gptSlice.actions

export default gptSlice.reducer;
