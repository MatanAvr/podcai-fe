import "./Main.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "../../Pages/Login/Login";
import { SignUp } from "../../Pages/SignUp/SignUp";
import { Home } from "../../Pages/Home/Home";
import { Settings } from "../../Pages/Settings/Settings";
import { Unsubscribe } from "../../Pages/Unsubscribe/Unsubscribe";
import { Paper } from "@mui/material";
import LandingPage from "../../Pages/landing-page/LandingPage";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useEffect, useRef } from "react";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { ApiClient } from "../../Services/axios";
import { ToggleColorMode } from "../../Features/Theme/Theme";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { ForgotPassword } from "../../Pages/ForgotPassword/ForgotPassword";
import { TermsOfService } from "../../Pages/TermsOfService/TermsOfService";
import { PrivacyPolicy } from "../../Pages/PrivacyPolicy/PrivacyPolicy";
import { ContactUs } from "../../Pages/ContactUs/ContactUs";

const apiClientInstance = ApiClient.getInstance();

export const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const isAuth = useAppSelector((state) => state.user.auth);
  const hasMounted = useRef(false);

  useEnhancedEffect(() => {
    navigate(`/${currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    // checks theme mode and if there is a token in local storage
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
      //try to login with the token from local storage
      dispatch(setAuth({ newMode: true, token })); // attach token to apiClient
      const authUserRes = await apiClientInstance.userAuth();
      dispatch(setLoggedUser({ newLoggeduser: authUserRes }));
      // dispatch(moveToPage("Home"));
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
        pt: { xs: 10, sm: 10 },
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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign up" element={<SignUp />} />
          <Route path="/Unsubscribe" element={<Unsubscribe />} />
          <Route path="/Forgot password" element={<ForgotPassword />} />
          <Route path="/Terms of service" element={<TermsOfService />} />
          <Route path="/Privacy policy" element={<PrivacyPolicy />} />
          <Route path="/Contact us" element={<ContactUs />} />
          {/* private routes */}
          <Route path="/Home" element={isAuth ? <Home /> : <LandingPage />} />
          <Route
            path="/Settings"
            element={isAuth ? <Settings /> : <LandingPage />}
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Paper>
  );
};
