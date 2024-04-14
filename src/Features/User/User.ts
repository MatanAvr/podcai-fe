import { createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../../Services/axios";
import { loggedInUser } from "../../ConstAndTypes/consts";

const apiClientInstance = ApiClient.getInstance();

const emptyUser: loggedInUser = {
  name: "",
  email: "",
  voice: "Aria",
  categories: [],
  country: "us",
  language: "en",
  should_send_episode_email: false,
  subscription: "Basic",
  profile_pic: "",
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
        localStorage.setItem("token", token);
      } else {
        apiClientInstance.removeToken();
        localStorage.removeItem("token");
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
