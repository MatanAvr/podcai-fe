import "./Main.scss";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login } from "../../Pages/Login";
import { SignUp } from "../../Pages/SignUp";
import { Home } from "../../Pages/landing-page/components/Home/Home";
import { Settings } from "../../Pages/Settings";
import { Unsubscribe } from "../../Pages/Unsubscribe";
import { Box, Paper } from "@mui/material";
import LandingPage from "../../Pages/landing-page/LandingPage";
import { useAppDispatch, useAppSelector } from "../../Hooks/useStoreHooks";
import { useEffect, useRef } from "react";
import { setAuth, setLoggedUser } from "../../Features/User";
import { ApiClient } from "../../Api/axios";
import { ToggleColorMode } from "../../Features/Theme";
import { ForgotPassword } from "../../Pages/ForgotPassword";
import { TermsOfService } from "../../Pages/TermsOfService";
import { PrivacyPolicy } from "../../Pages/PrivacyPolicy";
import { ContactUs } from "../../Pages/ContactUs";
// import { Updates } from "../../Pages/Updates/Updates";
import {
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from "../../Consts/consts";
import { useMyNavigation } from "../../Hooks/useMyNavigation";
import { AdminDashboard } from "../../Pages/AdminDashboard/AdminDashboard";
import { RoleEnum } from "../../Enums/Enums";
import { TRole } from "../../Types/Types";

const apiClientInstance = ApiClient.getInstance();

export const Main = () => {
  const dispatch = useAppDispatch();
  const hasMounted = useRef(false);
  const nav = useMyNavigation();

  useEffect(() => {
    // Checks theme mode and if there is a token in local storage
    if (hasMounted.current) return;
    const localToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (localToken) {
      authAndLogin(localToken);
      nav.push("Home");
    }
    if (localTheme && localTheme === "dark") {
      dispatch(ToggleColorMode("dark"));
    }
    hasMounted.current = true;
  }, []);

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

  return (
    <Paper
      sx={(theme) => ({
        height: "100%",
        width: "100%",
        overflowY: "auto",
        pt: 8,
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : "linear-gradient(#02294F, #121212)",
        backgroundSize: "100% 25%",
        backgroundRepeat: "no-repeat",
        borderRadius: "0px",
      })}
    >
      <Box className="main-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign up" element={<SignUp />} />
          <Route path="/Unsubscribe" element={<Unsubscribe />} />
          <Route path="/Forgot password" element={<ForgotPassword />} />
          <Route path="/Terms of service" element={<TermsOfService />} />
          <Route path="/Privacy policy" element={<PrivacyPolicy />} />
          <Route path="/Contact us" element={<ContactUs />} />
          {/* <Route path="/Updates" element={<Updates />} /> */}

          {/* Private route using PrivateRoute component */}
          <Route element={<PrivateRoute roleRequired={"Any"} />}>
            <Route path="/Home" element={<Home />} />
          </Route>
          <Route path="/" element={<PrivateRoute roleRequired={"Any"} />}>
            <Route path="/Settings" element={<Settings />} />
          </Route>

          <Route
            path="/"
            element={<PrivateRoute roleRequired={RoleEnum.Admin} />}
          >
            <Route path="/Admin dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Paper>
  );
};

interface PrivateRouteProps {
  roleRequired: TRole | "Any";
}
const PrivateRoute = ({ roleRequired }: PrivateRouteProps) => {
  const userState = useAppSelector((state) => state.user);
  const isAuthenticated = userState.auth;
  let isRoleValid = true;
  if (roleRequired !== "Any" && roleRequired !== userState.loggedUser.role) {
    isRoleValid = false;
  }
  return isAuthenticated && isRoleValid ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
