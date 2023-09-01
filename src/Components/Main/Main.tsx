import "./Main.scss";
import { ComingSoon } from "../../Pages/ComingSoon/ComingSoon";
import { About } from "../../Pages/About/About";
import { Features } from "../../Pages/Features/Features";
import { Team } from "../../Pages/Team/Team";
import { Login } from "../../Pages/Login/Login";
import { Home } from "../../Pages/Home/Home";
import { Paper } from "@mui/material";
import { SignUpNew } from "../../Pages/SignUpNew/SignUpNew";
import { Settings } from "../../Pages/Settings/Settings";
import { useAppSelector } from "../../Hooks/Hooks";

interface mainIprops {
  // currentPage: Pages;
}

export const Main = ({}: mainIprops) => {
  const currentPage = useAppSelector((state) => state.navigation.currentPage);

  return (
    <Paper sx={{ height: "100%", width: "100%", overflowY: "auto", pt: 1 }}>
      <div className="main-wrapper">
        {currentPage === "ComingSoon" && <ComingSoon />}
        {currentPage === "About" && <About />}
        {currentPage === "Features" && <Features />}
        {currentPage === "Team" && <Team />}
        {currentPage === "Login" && <Login />}
        {currentPage === "Sign up" && <SignUpNew />}
        {currentPage === "Home" && <Home />}
        {currentPage === "Settings" && <Settings />}
      </div>
    </Paper>
  );
};
