import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LS_THEME_KEY } from "../Consts/consts";
import { LS } from "../Utils/localStorage";
type themeColor = "dark" | "light";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeColor: "light" as themeColor,
  },
  reducers: {
    ToggleColorMode: (state, action: PayloadAction<themeColor>) => {
      state.themeColor = action.payload;
      LS.getInstance().save(LS_THEME_KEY, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { ToggleColorMode } = themeSlice.actions;

export default themeSlice.reducer;
