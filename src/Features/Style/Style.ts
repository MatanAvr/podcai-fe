import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type styleMode = "dark" | "light";

export const styleSlice = createSlice({
  name: "style",
  initialState: {
    themeMode: "light" as styleMode,
  },
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      state.themeMode = action.payload ? "dark" : "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = styleSlice.actions;

export default styleSlice.reducer;
