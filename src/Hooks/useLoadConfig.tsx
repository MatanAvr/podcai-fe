import { ApiClient } from "../Api/axios";
import {
  LS_TOKEN_KEY,
  LS_THEME_KEY,
  LS_ALL_EPISODES_OPEN_KEY,
  LS_PLAYBACK_SPEED_KEY,
} from "../Consts/consts";
import {
  setAllEpisodeOpenConfig,
  setPlaySpeedConfig,
} from "../Features/Config";
import { ToggleColorMode } from "../Features/Theme";
import { setAuth, setLoggedUser } from "../Features/User";
import { LS } from "../Utils/localStorage";
import { useMyNavigation } from "./useMyNavigation";
import { useAppDispatch } from "./useStoreHooks";

const apiClientInstance = ApiClient.getInstance();

export const useLoadConfig = () => {
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();

  const authAndLogin = async (token: string) => {
    try {
      // Try to login with the token from local storage
      dispatch(setAuth({ newMode: true, token })); // Attach token to apiClient
      const authUserRes = await apiClientInstance.userAuth();
      dispatch(setLoggedUser({ newLoggeduser: authUserRes }));
    } catch (err) {
      dispatch(setAuth({ newMode: false, token: "" }));
    }
  };

  // CONFIG
  const loadConfig = async () => {
    const localTheme = LS.getInstance().load(LS_THEME_KEY);
    if (localTheme && localTheme === "dark") {
      dispatch(ToggleColorMode("dark"));
    }

    const localPlaybackSpeed = LS.getInstance().load(LS_PLAYBACK_SPEED_KEY);
    if (localPlaybackSpeed) {
      dispatch(setPlaySpeedConfig(localPlaybackSpeed));
    }

    const localAllEpisodesOpen = LS.getInstance().load(
      LS_ALL_EPISODES_OPEN_KEY
    );
    if (localAllEpisodesOpen) {
      dispatch(setAllEpisodeOpenConfig(localAllEpisodesOpen));
    }

    const localToken = LS.getInstance().load(LS_TOKEN_KEY);
    if (localToken) {
      await authAndLogin(localToken);
      nav.push("Home");
    }
  };

  return loadConfig;
};
