import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User";
import navigationReducer from "../Features/Navigation";
import themeReducer from "../Features/Theme";
import featureToggleReducer from "../Features/FeaturesToggle";
import configReducer from "../Features/Config";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    theme: themeReducer,
    featuresToggle: featureToggleReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
