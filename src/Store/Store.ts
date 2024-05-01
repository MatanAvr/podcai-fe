import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User";
import navigationReducer from "../Features/Navigation";
import themeReducer from "../Features/Theme";
import featureToggleReducer from "../Features/FeaturesToggle";

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
