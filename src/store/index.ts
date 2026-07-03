import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import favoritesReducer from "./slices/favoritesSlice";
import langReducer from "./slices/langSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoritesReducer,
    lang: langReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
