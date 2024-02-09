import "./Main.scss";
import { Routes, Route } from "react-router-dom";
import { ComingSoon } from "../../Pages/ComingSoon/ComingSoon";
import { About } from "../../Pages/About/About";
import { Features } from "../../Pages/Features/Features";
import { Team } from "../../Pages/Team/Team";
import { Login } from "../../Pages/Login/Login";
import { SignUpNew } from "../../Pages/SignUpNew/SignUpNew";
import { Home } from "../../Pages/Home/Home";
import { Settings } from "../../Pages/Settings/Settings";
import { Unsubscribe } from "../../Pages/Unsubscribe/Unsubscribe";
import { Paper } from "@mui/material";

export const Main = () => {
  return (
    <Paper sx={{ height: "100%", width: "100%", overflowY: "auto", pt: 1 }}>
      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<ComingSoon />} />
          <Route path="/About" element={<About />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign up" element={<SignUpNew />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Unsubscribe" element={<Unsubscribe />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </div>
    </Paper>
  );
};
