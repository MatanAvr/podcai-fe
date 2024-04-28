import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type themeColor = "dark" | "light";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeColor: "light" as themeColor,
  },
  reducers: {
    ToggleColorMode: (state, action: PayloadAction<themeColor>) => {
      state.themeColor = action.payload === "dark" ? "dark" : "light";
      localStorage.setItem("theme", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { ToggleColorMode } = themeSlice.actions;

export default themeSlice.reducer;
