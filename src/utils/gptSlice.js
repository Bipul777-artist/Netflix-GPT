
import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gptSlice',
    initialState: {
        GPTSlice: false,
    },
    reducers: {
        toggleGPTView : (state) => {
            state.GPTSlice = !state.GPTSlice;
        }
    }
});

export const {toggleGPTView} = gptSlice.actions

export default gptSlice.reducer;
