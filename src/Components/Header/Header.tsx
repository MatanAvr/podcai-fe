import { Pages } from "../../ConstAndTypes/consts";
import { Button } from "../UI/Button/Button";
import "./Header.scss";
import { useEffect } from "react";
import { setAuth } from "../../Features/User/User";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";

interface headerIprops {
  // currentPage: Pages;
  // changePageHandler: (newPage: Pages) => void;
}

const startBtnsArr: Pages[] = ["About", "Features", "Team"];
const endBtnsArr: Pages[] = ["Login", "SignUp"];

export const Header = ({}: headerIprops) => {
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const dispatch = useAppDispatch();

  const changePageHandler = (newPage: Pages) => {
    dispatch(moveToPage(newPage));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuth({ newMode: true, token }));
    } else {
      dispatch(setAuth({ newMode: false, token: "" }));
    }
  }, []);

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
        </div>

        {isAuth && <div style={{ color: "green" }}>loggedIn</div>}

        <div className="buttons-container">
          {!isAuth &&
            endBtnsArr.map((btn, index) => {
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
          {isAuth && (
            <>
              <Button
                key={`LHB-${0}`}
                text={"Home"}
                onClick={() => changePageHandler("Home")}
                // active={active}
              />
              <Button
                key={`LHB-${1}`}
                text={"Logout"}
                onClick={() => {
                  dispatch(setAuth({ newMode: false, token: "" }));
                  changePageHandler("Login");
                  console.log("Logout");
                }}
                // active={active}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
