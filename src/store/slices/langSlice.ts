import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "lang",
  initialState: { currentLang: localStorage.getItem("i18nextLng") || "uz" },
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLang = action.payload;
    },
  },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
