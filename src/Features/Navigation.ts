import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pages } from "../ConstAndTypes/consts";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    currentPage: "" as Pages,
  },
  reducers: {
    moveToPage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { moveToPage } = navigationSlice.actions;

export default navigationSlice.reducer;
