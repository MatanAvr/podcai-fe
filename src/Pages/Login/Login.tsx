import { useState } from "react";
import { loginRequest } from "../../ConstAndTypes/consts";
import "./Login.scss";
import { ApiClient } from "../../Services/axios";
import { useAppDispatch } from "../../Hooks/Hooks";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { Alert, Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isValidEmail } from "../../Utils/Utils";
import { isAxiosError } from "axios";

const apiClientInstance = ApiClient.getInstance();

const defaultUser: loginRequest = {
  email: "",
  password: "",
};

export const Login = () => {
  const [user, setUser] = useState<loginRequest>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const loginHandler = async (e: React.FormEvent) => {
    //validate field
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
    } catch (error) {
      if (isAxiosError(error)) {
        if (typeof error.response?.data.detail === "string") {
          setErrorMsg(error.response?.data.detail);
        } else {
          setErrorMsg("General error");
        }
      } else {
        setErrorMsg("General error");
      }
    }
    setIsLoading(false);
  };

  const validateEmail = () => {
    let error = "";
    const emailValid = isValidEmail(user.email);
    if (!emailValid) {
      error = "Invalid email";
      setEmailErr(error);
    } else {
    }
    if (error !== "") {
      return false;
    }
    setEmailErr(error);
    return true;
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "auto" },
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={loginHandler}
    >
      <Typography variant="h4" component="div">
        Login
      </Typography>

      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={onChange}
        onBlur={validateEmail}
        value={user.email}
        error={emailErr.length > 0 ? true : false}
        helperText={emailErr}
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
        variant="contained"
        onClick={loginHandler}
        // disabled={!(isValidEmail(user.email) && user.password.length > 3)}
      >
        Login
      </LoadingButton>
      {errorMsg && (
        <Alert sx={{ my: 1 }} severity="error">
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};
