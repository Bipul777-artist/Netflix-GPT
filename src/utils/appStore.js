import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import movieSlice from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import favoritesReducer from "./favoriteSlice";
import { combineReducers } from "@reduxjs/toolkit";

// Step 1: Create a combined reducer with ALL your reducers
const rootReducer = combineReducers({
  user: userReducer,
  movies: movieSlice,
  gptSlice: gptReducer,
  config: configReducer,
  favorites: favoritesReducer  // This will be accessible at state.favorites
});

// Step 2: Configure persistence (only for favorites)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'], // Only favorites will be persisted
};

// Step 3: Create a persisted version of the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Use the persisted reducer in your store
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid warnings with Redux Persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Step 5: Export both the store and persistor
export const persistor = persistStore(appStore);
export default appStore;