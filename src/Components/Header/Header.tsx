import { Pages } from "../../ConstAndTypes/consts";
import { Button } from "../UI/Button/Button";
import "./Header.scss";
import { useEffect, useState } from "react";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { IconButton } from "../UI/IconButton/IconButton";
import { AiOutlineMenu } from "react-icons/ai";
import { Manu } from "../UI/Manu/Manu";
import { isMobile } from "../../Utils/Utils";
import { ApiClient } from "../../Services/axios";
import { Avatar } from "../UI/Avatar/Avatar";
const apiClientInstance = ApiClient.getInstance();

// interface headerIprops {}

const startBtnsArr: Pages[] = ["About", "Features", "Team"];
const endBtnsArr: Pages[] = ["Login", "SignUp"];
const mobile = isMobile();

export const Header = () => {
  const [manuOpen, setManuOpen] = useState<boolean>(false);
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const dispatch = useAppDispatch();

  const changePageHandler = (newPage: Pages) => {
    dispatch(moveToPage(newPage));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authAndLogin(token);
    } else {
      dispatch(setAuth({ newMode: false, token: "" }));
    }
  }, [dispatch]);

  const authAndLogin = async (token: string) => {
    dispatch(setAuth({ newMode: true, token }));
    const authResUser = await apiClientInstance.userAuth();
    dispatch(setLoggedUser({ newLoggeduser: authResUser }));
    dispatch(moveToPage("Home"));
  };

  const toggleManu = () => {
    setManuOpen((prev) => !prev);
  };

  return (
    <div className={`header-wrapper`}>
      <div className={`header-container ${mobile ? "mobile" : ""}`}>
        <div className="buttons-container">
          {isAuth && (
            <IconButton onClick={toggleManu}>
              <AiOutlineMenu size={25} />
            </IconButton>
          )}
          <Button type="logo" onClick={() => changePageHandler("ComingSoon")} />
          {!isAuth &&
            startBtnsArr.map((btn, index) => {
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

        {/* {
          <div style={{ color: "green" }}>
            {mobile ? "mobile" : "not-mobile"}
          </div>
        } */}

        <div className="buttons-container">
          {!isAuth && (
            <>
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
            </>
          )}
          {isAuth && (
            <>
              <IconButton onClick={() => {}}>
                <Avatar />
              </IconButton>
              <Button
                key={`LHB-${0}`}
                text={"Home"}
                onClick={() => changePageHandler("Home")}
              />
              <Button
                key={`LHB-${1}`}
                text={"Logout"}
                onClick={() => {
                  dispatch(setAuth({ newMode: false, token: "" }));
                  changePageHandler("Login");
                  console.log("Logout");
                }}
              />
            </>
          )}
        </div>
      </div>
      <Manu isOpen={manuOpen} />
    </div>
  );
};
