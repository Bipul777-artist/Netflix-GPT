import { createSlice } from "@reduxjs/toolkit";

const reactionSlice = createSlice({
  name: "reaction",
  initialState: {},
  reducers: {
    setReaction: (state, action) => {
      const { movieId, type } = action.payload;
      state[movieId] = type; // Store reaction type ("like", "love", "dislike") for the movie
    },
    clearReaction: (state, action) => {
      const { movieId } = action.payload;
      delete state[movieId]; // Optional: Remove reaction for a movie
    },
  },
});

export const { setReaction, clearReaction } = reactionSlice.actions;
export default reactionSlice.reducer;