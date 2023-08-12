import "./Main.scss";
import { Pages } from "../../ConstAndTypes/consts";
import { ComingSoon } from "../../Pages/ComingSoon/ComingSoon";
import { About } from "../../Pages/About/About";
import { Features } from "../../Pages/Features/Features";
import { Team } from "../../Pages/Team/Team";
import { Login } from "../../Pages/Login/Login";
import { SignUp } from "../../Pages/SignUp/SignUp";
import { Home } from "../../Pages/Home/Home";

interface mainIprops {
  currentPage: Pages;
}

export const Main = ({ currentPage }: mainIprops) => {
  return (
    <div className="main-wrapper">
      {currentPage === "ComingSoon" && <ComingSoon />}
      {currentPage === "About" && <About />}
      {currentPage === "Features" && <Features />}
      {currentPage === "Team" && <Team />}
      {currentPage === "Login" && <Login />}
      {currentPage === "SignUp" && <SignUp />}
      {currentPage === "Home" && <Home />}
    </div>
  );
};
