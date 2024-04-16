import { createSlice } from "@reduxjs/toolkit";

export const featuresToggleSlice = createSlice({
  name: "featureToggle",
  initialState: {
    addToHomeScreenEnabled: true,
    googleLoginEnabled: false,
    googleSignUpEnabled: false,
    uploadProfilePicEnabled: false,
    adminDashboardenabled: false,
  },
  reducers: {
    setAddToHomeScreenFT: (
      state,
      action: { payload: { newMode: boolean } }
    ) => {
      state.addToHomeScreenEnabled = action.payload.newMode;
    },
    setGoogleLoginFT: (state, action: { payload: { newMode: boolean } }) => {
      state.googleLoginEnabled = action.payload.newMode;
    },
    setGoogleSignUpFT: (state, action: { payload: { newMode: boolean } }) => {
      state.googleSignUpEnabled = action.payload.newMode;
    },
    setUploadProfilePicEnabledFT: (
      state,
      action: { payload: { newMode: boolean } }
    ) => {
      state.uploadProfilePicEnabled = action.payload.newMode;
    },
    setAdminDashboardenabledFT: (
      state,
      action: { payload: { newMode: boolean } }
    ) => {
      state.uploadProfilePicEnabled = action.payload.newMode;
    },
  },
});

export const {
  setAddToHomeScreenFT,
  setGoogleLoginFT,
  setGoogleSignUpFT,
  setUploadProfilePicEnabledFT,
  setAdminDashboardenabledFT,
} = featuresToggleSlice.actions;

export default featuresToggleSlice.reducer;
