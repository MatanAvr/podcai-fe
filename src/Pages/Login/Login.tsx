import { useState } from "react";
import { DELETE_ERROR_TIMEOUT, loginRequest } from "../../ConstAndTypes/consts";
import { ApiClient } from "../../Services/axios";
import { useAppDispatch } from "../../Hooks/Hooks";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { Alert, Box, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isValidEmail } from "../../Utils/Utils";
import { isAxiosError } from "axios";
import PasswordTextField from "../../Components/UI/PasswordTextField/PasswordTextField";

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
    e.preventDefault();
    //validate fields
    setIsLoading(true);
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
    if (!emailValid && user.email.length > 0) {
      error = "Invalid email";
      setEmailErr(error);
      setTimeout(() => {
        setEmailErr("");
      }, DELETE_ERROR_TIMEOUT);
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
        maxWidth: "80%",
        gap: 1,
      }}
      onSubmit={loginHandler}
    >
      <Typography variant="h4" sx={{ alignSelf: "center" }}>
        Log in
      </Typography>
      <TextField
        id="email"
        label="Email"
        inputMode="email"
        variant="outlined"
        size="small"
        onChange={onChange}
        onBlur={validateEmail}
        value={user.email}
        error={emailErr.length > 0 ? true : false}
        helperText={emailErr}
        required
      />
      <PasswordTextField
        id="password"
        label="Password"
        variant="outlined"
        size="small"
        onChange={onChange}
        value={user.password}
        required
      />
      <Link
        sx={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          dispatch(moveToPage("Forgot password"));
        }}
      >
        Forgot your password?
      </Link>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={loginHandler}
        type="submit"
        disabled={!(isValidEmail(user.email) && user.password.length > 3)}
      >
        Log in
      </LoadingButton>

      <Box mt={1}>
        Don't have an account yet?&nbsp;
        <Link
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(moveToPage("Sign up"));
          }}
        >
          Sign up
        </Link>
      </Box>

      {errorMsg && (
        <Alert sx={{ my: 1 }} severity="error">
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};
