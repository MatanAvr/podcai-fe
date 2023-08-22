import "./Main.scss";
import { Pages } from "../../ConstAndTypes/consts";
import { ComingSoon } from "../../Pages/ComingSoon/ComingSoon";
import { About } from "../../Pages/About/About";
import { Features } from "../../Pages/Features/Features";
import { Team } from "../../Pages/Team/Team";
import { Login } from "../../Pages/Login/Login";
import { Home } from "../../Pages/Home/Home";
import { Paper } from "@mui/material";
import { SignUpNew } from "../../Pages/SignUpNew/SignUpNew";

interface mainIprops {
  currentPage: Pages;
}

export const Main = ({ currentPage }: mainIprops) => {
  return (
    <Paper sx={{ height: "100%", width: "100%", overflowY: "auto", pt: 1 }}>
      <div className="main-wrapper">
        {currentPage === "ComingSoon" && <ComingSoon />}
        {currentPage === "About" && <About />}
        {currentPage === "Features" && <Features />}
        {currentPage === "Team" && <Team />}
        {currentPage === "Login" && <Login />}
        {currentPage === "SignUp" && <SignUpNew />}
        {currentPage === "Home" && <Home />}
      </div>
    </Paper>
  );
};
