import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TConfig, TPlaySpeedOptions } from "../Types/Types";
import {
  LS_ALL_EPISODES_OPEN_KEY,
  LS_PLAYBACK_SPEED_KEY,
} from "../Consts/consts";
import { LS } from "../Utils/localStorage";

const defaultConfig: TConfig = {
  playbackSpeed: 1,
  allEpisodesOpen: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState: {
    ...defaultConfig,
  },
  reducers: {
    setPlaySpeedConfig: (state, action: PayloadAction<TPlaySpeedOptions>) => {
      state.playbackSpeed = action.payload;
      LS.getInstance().save(LS_PLAYBACK_SPEED_KEY, action.payload);
    },
    setAllEpisodeOpenConfig: (state, action: PayloadAction<boolean>) => {
      state.allEpisodesOpen = action.payload;
      LS.getInstance().save(LS_ALL_EPISODES_OPEN_KEY, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlaySpeedConfig, setAllEpisodeOpenConfig } =
  configSlice.actions;

export default configSlice.reducer;
