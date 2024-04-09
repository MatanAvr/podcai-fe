import "./Main.scss";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login } from "../../Pages/Login/Login";
import { SignUp } from "../../Pages/SignUp/SignUp";
import { Home } from "../../Pages/Home/Home";
import { Settings } from "../../Pages/Settings/Settings";
import { Unsubscribe } from "../../Pages/Unsubscribe/Unsubscribe";
import { Box, Paper } from "@mui/material";
import LandingPage from "../../Pages/landing-page/LandingPage";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import { useEffect, useRef } from "react";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { ApiClient } from "../../Services/axios";
import { ToggleColorMode } from "../../Features/Theme/Theme";
import { ForgotPassword } from "../../Pages/ForgotPassword/ForgotPassword";
import { TermsOfService } from "../../Pages/TermsOfService/TermsOfService";
import { PrivacyPolicy } from "../../Pages/PrivacyPolicy/PrivacyPolicy";
import { ContactUs } from "../../Pages/ContactUs/ContactUs";
import { Updates } from "../../Pages/Updates/Updates";

const apiClientInstance = ApiClient.getInstance();

export const Main = () => {
  const dispatch = useAppDispatch();
  const hasMounted = useRef(false);

  useEffect(() => {
    // Checks theme mode and if there is a token in local storage
    if (hasMounted.current) return;
    const tokenLocal = localStorage.getItem("token");
    const themeLocal = localStorage.getItem("theme");
    if (tokenLocal) authAndLogin(tokenLocal);
    if (themeLocal && themeLocal === "dark") {
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
        pt: { xs: 8, sm: 8 },
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : "linear-gradient(#02294F, #121212)",
        backgroundSize: "100% 25%",
        backgroundRepeat: "no-repeat",
        borderRadius: "0px",
      })}
    >
      <div className="main-wrapper">
        <Box sx={{ display: "flex", width: "100%", py: 1 }} />
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
          <Route element={<PrivateRoute />}>
            <Route path="/Home" element={<Home />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/Settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Paper>
  );
};

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
