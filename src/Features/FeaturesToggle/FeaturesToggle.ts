import { createSlice } from "@reduxjs/toolkit";

export const featuresToggleSlice = createSlice({
  name: "featureToggle",
  initialState: {
    addToHomeScreenEnabled: true,
    googleLoginEnabled: false,
    googleSignUpEnabled: false,
  },
  reducers: {
    setAddToHomeScreen: (state, action: { payload: { newMode: boolean } }) => {
      state.addToHomeScreenEnabled = action.payload.newMode;
    },
    setGoogleLogin: (state, action: { payload: { newMode: boolean } }) => {
      state.googleLoginEnabled = action.payload.newMode;
    },
    setGoogleSignUp: (state, action: { payload: { newMode: boolean } }) => {
      state.googleSignUpEnabled = action.payload.newMode;
    },
  },
});

export const { setAddToHomeScreen, setGoogleLogin, setGoogleSignUp } =
  featuresToggleSlice.actions;

export default featuresToggleSlice.reducer;
