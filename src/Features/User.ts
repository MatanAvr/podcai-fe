import { createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../Api/axios";
import { SuscirptionEnum, RoleEnum } from "../Enums/Enums";
import { loggedInUser } from "../Types/Types";
import { LS_TOKEN_KEY } from "../Consts/consts";
import { LS } from "../Utils/localStorage";

const apiClientInstance = ApiClient.getInstance();

const emptyUser: loggedInUser = {
  name: "",
  email: "",
  voice: "Aria",
  categories: [],
  country: "us",
  language: "en",
  should_send_episode_email: false,
  subscription: SuscirptionEnum.Basic,
  profile_pic: "",
  role: RoleEnum.User,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedUser: emptyUser,
    auth: false,
  },
  reducers: {
    setLoggedUser: (
      state,
      action: { payload: { newLoggeduser: loggedInUser } }
    ) => {
      state.loggedUser = action.payload.newLoggeduser;
    },
    setAuth: (
      state,
      action: { payload: { newMode: boolean; token: string } }
    ) => {
      const { newMode, token } = action.payload;
      state.auth = newMode;
      if (newMode) {
        apiClientInstance.setToken(token);
        LS.getInstance().save(LS_TOKEN_KEY, token);
      } else {
        apiClientInstance.removeToken();
        LS.getInstance().delete(LS_TOKEN_KEY);
      }
    },
    updateLoggedUser: (
      state,
      action: { payload: { updatedUser: loggedInUser } }
    ) => {
      state.loggedUser = action.payload.updatedUser;
    },
  },
});

export const { setAuth, setLoggedUser, updateLoggedUser } = userSlice.actions;

export default userSlice.reducer;
