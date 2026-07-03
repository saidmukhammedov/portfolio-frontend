import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types";

interface FavoritesState {
  items: Project[];
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Project>) => {
      const exists = state.items.find((p) => p._id === action.payload._id);
      if (exists) {
        state.items = state.items.filter((p) => p._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
