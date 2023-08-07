import { Pages } from "../../ConstAndTypes/consts";
import { Button } from "../UI/Button/Button";
import { DynamicLogo } from "../UI/DynamicLogo/DynamicLogo";
import "./Header.scss";

interface headerIprops {
  currentPage: Pages;
  changePageHandler: (newPage: Pages) => void;
}

const startBtnsArr: Pages[] = ["Login", "SignUp"];
const endBtnsArr: Pages[] = ["About", "Features", "Team"];

export const Header = ({ currentPage, changePageHandler }: headerIprops) => {
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="buttons-container">
          <Button type="logo" onClick={() => changePageHandler("ComingSoon")} />
          {startBtnsArr.map((btn, index) => {
            const active = btn === currentPage ? true : false;
            return (
              <Button
                key={`SBA-${index}`}
                text={btn}
                onClick={() => changePageHandler(btn)}
                active={active}
              />
            );
          })}
          {/* <Button text="Login" onClick={() => changePageHandler("Login")} /> */}
          {/* <Button text="Sign up" onClick={() => changePageHandler("SignUp")} /> */}
        </div>

        {/* {currentPage} */}

        <div className="buttons-container">
          {endBtnsArr.map((btn, index) => {
            const active = btn === currentPage ? true : false;
            return (
              <Button
                key={`EBA-${index}`}
                text={btn}
                onClick={() => changePageHandler(btn)}
                active={active}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
