import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import movieSlice from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import favoritesReducer from "./favoriteSlice";
import { combineReducers } from "@reduxjs/toolkit";
import reactionReducer from "./reactionSlice";
import items from "./items"

const rootReducer = combineReducers({
  user: userReducer,
  movies: movieSlice,
  gptSlice: gptReducer,
  config: configReducer,
  favorites: favoritesReducer,
  item: items,
  reaction: reactionReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'user'], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
    
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});


export const persistor = persistStore(appStore);
export default appStore;