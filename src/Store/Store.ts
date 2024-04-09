import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/User";
import navigationReducer from "../Features/Navigation/Navigation";
import themeReducer from "../Features/Theme/Theme";
import featureToggleReducer from "../Features/FeaturesToggle/FeaturesToggle";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    theme: themeReducer,
    featuresToggle: featureToggleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
