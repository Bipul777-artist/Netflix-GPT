// src/utils/favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesList: []
  },
  reducers: {
    addToFavorites: (state, action) => {
      // Avoid duplicates
      if (!state.favoritesList.some(item => item.id === action.payload.id)) {
        state.favoritesList.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favoritesList = state.favoritesList.filter(
        item => item.id !== action.payload.id
      );
    },
    clearAllFavorites: (state) => {
      state.favoritesList = [];
    }
  }
});

export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;