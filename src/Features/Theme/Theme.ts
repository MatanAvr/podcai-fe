import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type themeMode = "dark" | "light";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: "light" as themeMode,
  },
  reducers: {
    ToggleColorMode: (state, action: PayloadAction<themeMode>) => {
      state.themeMode = action.payload === "dark" ? "dark" : "light";
      localStorage.setItem("theme", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { ToggleColorMode } = themeSlice.actions;

export default themeSlice.reducer;
