import { useEffect, useState } from "react";
import { DELETE_ERROR_TIMEOUT } from "../Consts/consts";
import { ApiClient } from "../Api/axios";
import { useAppDispatch, useAppSelector } from "../Hooks/useStoreHooks";
import { setAuth, setLoggedUser } from "../Features/User";
import {
  Alert,
  Box,
  Divider,
  Icon,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isValidEmail } from "../Utils/Utils";
import { isAxiosError } from "axios";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useMyNavigation } from "../Hooks/useMyNavigation";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import googleIconSvg from "../Assets/Svg/google-icon.svg";
import { PasswordTextField } from "../Components/UI/PasswordTextField";
import { loginRequest } from "../Api/ApiTypesAndConsts";

const apiClientInstance = ApiClient.getInstance();

const defaultUser: loginRequest = {
  email: "",
  password: "",
};

export const Login = () => {
  const nav = useMyNavigation();
  const dispatch = useAppDispatch();
  const googleLoginEnabled = useAppSelector(
    (state) => state.featuresToggle.googleLoginEnabled
  );
  const [user, setUser] = useState<loginRequest>(defaultUser);
  const [userGoogleToken, setUserGoogleToken] = useState<TokenResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    const isEmailValid = validateEmail();
    if (!isEmailValid) {
      showEmailError();
    } else {
      try {
        const loginRes = await apiClientInstance.userLogin(user);
        if (loginRes.access_token) {
          const token = loginRes.access_token;
          const userToLogIn = loginRes;
          dispatch(setLoggedUser({ newLoggeduser: userToLogIn }));
          dispatch(setAuth({ newMode: true, token }));
          nav.push("Home");
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
    }
    setIsLoading(false);
  };

  const validateEmail = () => {
    const emailValid = isValidEmail(user.email);
    if (!emailValid) {
      showEmailError();
      return false;
    }
    clearEmailError();
    return true;
  };

  const showEmailError = () => {
    setEmailErr("Invalid email");
    setTimeout(() => {
      clearEmailError();
    }, DELETE_ERROR_TIMEOUT);
  };

  const clearEmailError = () => setEmailErr("");

  const googleLoginHandler = useGoogleLogin({
    onNonOAuthError: (nonAuthErr) => {
      console.error(nonAuthErr.type);
    },
    onSuccess: (tokenResponse) => {
      setUserGoogleToken(tokenResponse);
    },
    onError: (errorRespondse) =>
      console.error("google login error:", errorRespondse),
  });

  useEffect(() => {
    if (userGoogleToken) {
      updateLoginUser(userGoogleToken);
    }
  }, [userGoogleToken]);

  const updateLoginUser = async (userToken: TokenResponse) => {
    setLoadingGoogleLogin(true);
    try {
      const googleUser = await apiClientInstance.getGoogleUser(
        userToken.access_token
      );
    } catch (err) {
      console.error("updateLoginUser error:", err);
    } finally {
      setLoadingGoogleLogin(false);
    }
  };

  return (
    <Box
      id="login-page-wrapper"
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "auto" },
        display: "flex",
        flexDirection: "column",
        maxWidth: "95%",
        gap: 2,
      }}
      onSubmit={loginHandler}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <LockRoundedIcon color="primary" fontSize="large" />
        <Typography variant="h4">Log in</Typography>
      </Stack>
      <TextField
        id="email"
        label="Email"
        type="email"
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

      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={loginHandler}
        type="submit"
        // disabled={!(isValidEmail(user.email) && user.password.length > min)}
      >
        Log in
      </LoadingButton>
      {googleLoginEnabled && (
        <>
          <Divider>
            <Typography textAlign={"center"}>Or log in with</Typography>
          </Divider>

          <LoadingButton
            loading={loadingGoogleLogin}
            onClick={() => googleLoginHandler()}
            variant="outlined"
            startIcon={
              <Icon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 25,
                }}
              >
                <img
                  style={{ height: "100%", width: "100%" }}
                  src={googleIconSvg}
                  draggable={false}
                  alt="google logo"
                />
              </Icon>
            }
          >
            Google
          </LoadingButton>
        </>
      )}
      <Box textAlign={"center"}>
        <Typography>
          Don't have an account yet?&nbsp;{" "}
          <Link
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              nav.push("Sign up");
            }}
          >
            Sign up
          </Link>
        </Typography>
        <Link
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            nav.push("Forgot password");
          }}
        >
          <Typography>Forgot your password?</Typography>
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
