import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPages } from "../Types/Types";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    currentPage: "" as TPages,
  },
  reducers: {
    moveToPage: (state, action: PayloadAction<TPages>) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { moveToPage } = navigationSlice.actions;

export default navigationSlice.reducer;
