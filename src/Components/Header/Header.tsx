import { Pages } from "../../ConstAndTypes/consts";
import "./Header.scss";
import { useEffect, useRef, useState } from "react";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { isMobile } from "../../Utils/Utils";
import { ApiClient } from "../../Services/axios";
import podcaiLogo from "../../Assets/Images/logo.jpg";
import { toggleDarkMode } from "../../Features/Style/Style";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
const apiClientInstance = ApiClient.getInstance();

const startBtnsArr: Pages[] = ["About", "Features", "Team"];
const endBtnsArr: Pages[] = ["Login", "Sign up"];
const mobile = isMobile();

export const Header = () => {
  const [manuOpen, setManuOpen] = useState<boolean>(false);
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const themeMode = useAppSelector((state) => state.style.themeMode);
  const hasMounted = useRef(false);

  const dispatch = useAppDispatch();

  const changePageHandler = (newPage: Pages) => {
    dispatch(moveToPage(newPage));
  };

  useEffect(() => {
    if (hasMounted.current) return;
    const tokenLocal = localStorage.getItem("token");
    if (tokenLocal) authAndLogin(tokenLocal);
    hasMounted.current = true;
  }, []);

  const authAndLogin = async (token: string) => {
    try {
      dispatch(setAuth({ newMode: true, token })); // attach token to apiClient
      //try to login with the token
      const authResUser = await apiClientInstance.userAuth();
      dispatch(setLoggedUser({ newLoggeduser: authResUser }));
      dispatch(moveToPage("Home"));
    } catch (err) {
      dispatch(setAuth({ newMode: false, token: "" }));
    }
  };

  const toggleDarkModeLocal = () => {
    dispatch(toggleDarkMode(themeMode === "dark" ? false : true));
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
      // sx={{ flexWrap: "wrap" }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            onClick={() =>
              isAuth
                ? changePageHandler("Home")
                : changePageHandler("ComingSoon")
            }
          >
            <Avatar
              alt="podcai logo"
              src={podcaiLogo}
              sizes="small"
              sx={{ scale: 0.6, mx: 0.5 }}
            />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              podcai
            </Typography>
          </Button>
          <FormControlLabel
            sx={{ mx: 0.5 }}
            control={
              <Switch
                checked={themeMode === "dark"}
                onChange={toggleDarkModeLocal}
                name="jason"
              />
            }
            label="Dark mode"
          />
          {!isAuth && (
            <>
              <Button
                onClick={() => {
                  changePageHandler("Team");
                }}
                variant="text"
                sx={{ my: 1, mx: 1.5 }}
              >
                Team
              </Button>

              <Button
                onClick={() => {
                  changePageHandler("Features");
                }}
                variant="text"
                sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Button>

              <Button
                onClick={() => {
                  changePageHandler("About");
                }}
                variant="text"
                sx={{ my: 1, mx: 1.5 }}
              >
                About
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {isAuth ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={() => {}} sx={{ p: 0 }} size="small">
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Button
                onClick={() => {
                  dispatch(setAuth({ newMode: false, token: "" }));
                  changePageHandler("Login");
                }}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  changePageHandler("Login");
                }}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  changePageHandler("Sign up");
                }}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Sign-up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
