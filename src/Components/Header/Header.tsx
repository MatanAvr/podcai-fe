import { Pages } from "../../ConstAndTypes/consts";
import "./Header.scss";
import { useEffect, useRef, useState } from "react";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { isMobile } from "../../Utils/Utils";
import { ApiClient } from "../../Services/axios";
import podcaiLogo2 from "../../Assets/Images/podcai-logo2.jpg";
import { toggleDarkMode } from "../../Features/Style/Style";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

const apiClientInstance = ApiClient.getInstance();

export const Header = () => {
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const themeMode = useAppSelector((state) => state.style.themeMode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const hasMounted = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEnhancedEffect(() => {
    navigate(`/${currentPage}`);
  }, [currentPage]);

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
              src={podcaiLogo2}
              sizes="small"
              sx={{ mr: 1 }}
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

          {!isAuth && !isMobile() && <></>}
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
                keepMounted
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem
                  sx={{ background: "white", color: "black" }}
                  onClick={() => {
                    dispatch(setAuth({ newMode: false, token: "" }));
                    changePageHandler("ComingSoon");
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Log out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  changePageHandler("Login");
                }}
                variant="contained"
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
