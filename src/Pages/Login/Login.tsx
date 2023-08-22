import { useState } from "react";
import { loginRequest } from "../../ConstAndTypes/consts";
import "./Login.scss";
import { ApiClient } from "../../Services/axios";
import { useAppDispatch } from "../../Hooks/Hooks";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const apiClientInstance = ApiClient.getInstance();

const defaultUser: loginRequest = {
  email: "",
  password: "",
};

export const Login = () => {
  const [user, setUser] = useState<loginRequest>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    setErrorMsg("");
    try {
      const loginRes = await apiClientInstance.userLogin(user);
      if (loginRes.access_token) {
        const token = loginRes.access_token;
        const userToLogIn = loginRes;
        dispatch(setLoggedUser({ newLoggeduser: userToLogIn }));
        dispatch(setAuth({ newMode: true, token }));
        dispatch(moveToPage("Home"));
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "auto" },
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={submitHandler}
    >
      <Typography variant="h4" component="div">
        Login
      </Typography>
      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={onChange}
        value={user.email}
      />
      <TextField
        id="password"
        label="Password"
        variant="standard"
        onChange={onChange}
        value={user.password}
        type="password"
      />
      <LoadingButton
        loading={isLoading}
        variant="outlined"
        onClick={submitHandler}
      >
        {errorMsg && errorMsg}
        Login
      </LoadingButton>
    </Box>
  );
};
