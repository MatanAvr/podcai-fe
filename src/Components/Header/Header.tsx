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
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
const apiClientInstance = ApiClient.getInstance();

const startBtnsArr: Pages[] = ["About", "Features", "Team"];
const endBtnsArr: Pages[] = ["Login", "Sign up"];
const mobile = isMobile();

export const Header = () => {
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const themeMode = useAppSelector((state) => state.style.themeMode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Box sx={{ flexGrow: 1 }}>
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

          {/* <FormControlLabel
            sx={{ mx: 0.5 }}
            control={
              <Switch
                checked={themeMode === "dark"}
                onChange={toggleDarkModeLocal}
                name="jason"
              />
            }
            label="Dark mode"
          /> */}

          {!isAuth && !isMobile() && (
            <>
              <Button
                onClick={() => {
                  changePageHandler("Team");
                }}
                variant="text"
                // sx={{ my: 1, mx: 1.5 }}
              >
                Team
              </Button>

              <Button
                onClick={() => {
                  changePageHandler("Features");
                }}
                variant="text"
                // sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Button>

              <Button
                onClick={() => {
                  changePageHandler("About");
                }}
                variant="text"
                // sx={{ my: 1, mx: 1.5 }}
              >
                About
              </Button>
            </>
          )}
        </Box>
        <Box>
          {isAuth ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleMenu} sx={{ p: 0 }} size="small">
                  <Avatar />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  sx={{ background: "white", color: "black" }}
                  onClick={() => {
                    changePageHandler("Settings");
                    handleClose();
                  }}
                >
                  Settings
                </MenuItem>

                <MenuItem
                  sx={{ background: "white", color: "black" }}
                  onClick={() => {
                    dispatch(setAuth({ newMode: false, token: "" }));
                    changePageHandler("Login");
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>

              {/* <Button
                onClick={() => {
                  dispatch(setAuth({ newMode: false, token: "" }));
                  changePageHandler("Login");
                }}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Logout
              </Button> */}
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
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
