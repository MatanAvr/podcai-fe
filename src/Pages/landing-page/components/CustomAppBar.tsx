import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import { ToggleColorModeSwitch } from "./ToggleColorModeSwitch";
import { ALL_EPISODES_QUERY_KEY, Pages } from "../../../ConstAndTypes/consts";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useState } from "react";
import podcaiLogo from "../../../Assets/Images/podcaiLogo.png";
import { setAuth } from "../../../Features/User/User";
import { enabledLandingPageSections } from "../LandingPage";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";
import { useQueryClient } from "@tanstack/react-query";
import { getBrowser } from "../../../Utils/Utils";
import { deferredPrompt, pwaInstall } from "../../../Utils/pwaInstall";
import { IconButton, Avatar, Menu, ListItemIcon } from "@mui/material";
// Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import AddToHomeScreenRoundedIcon from "@mui/icons-material/AddToHomeScreenRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

const browser = getBrowser();
const logoStyle = {
  maxHeight: "40px",
  height: "auto",
  marginStart: "10px",
};

const CustomAppBar = () => {
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();
  const [open, setOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.user.auth);
  const addToHomeScreenEnabled = useAppSelector(
    (state) => state.featuresToggle.addToHomeScreenEnabled
  );
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const queryClient = useQueryClient();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const openMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeMenuHandler = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "LandingPage") {
      nav.push("LandingPage");
    }
    const sectionElement = document.getElementById(sectionId);
    let offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      console.error(`Could not find element with id:${sectionId}`);
    }
    setOpen(false);
  };

  const changePageHandler = (newPage: Pages) => {
    nav.push(newPage);
    setOpen(false);
  };

  const logoutHandler = () => {
    queryClient.removeQueries({ queryKey: [ALL_EPISODES_QUERY_KEY] });
    dispatch(setAuth({ newMode: false, token: "" }));
    changePageHandler("LandingPage");
    setOpen(false);
  };

  const manuItemsArr = [
    {
      name: "Home",
      icon: <HomeRoundedIcon fontSize="small" />,
      function: () => changePageHandler("Home"),
    },
    {
      name: "Settings",
      icon: <SettingsRoundedIcon fontSize="small" />,
      function: () => changePageHandler("Settings"),
    },
    {
      name: "Contact us",
      icon: <SupportAgentRoundedIcon fontSize="small" />,
      function: () => changePageHandler("Contact us"),
    },
  ];

  return (
    <AppBar
      id="app-bar"
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        alignItems: "center",
      }}
    >
      <Box
        id="toolbar"
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          py: 1.5,

          bgcolor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(24px)",
          borderColor: "divider",
          boxShadow:
            theme.palette.mode === "light"
              ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
              : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
        })}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
          }}
        >
          <Box
            id="podcai-logo"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 3,
              cursor: "pointer",
            }}
            onClick={() => {
              if (isAuth) {
                changePageHandler("Home");
              } else {
                if (currentPage === "LandingPage") {
                  scrollToSection("Hero");
                } else {
                  changePageHandler("LandingPage");
                }
              }
            }}
          >
            <img
              src={themeColor === "light" ? podcaiLogo : podcaiLogo}
              style={logoStyle}
              alt="Podcai logo"
              draggable="false"
            />
            <Typography color="text.primary" variant="h6">
              Podcai
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuth ? (
              <></>
            ) : (
              <>
                {enabledLandingPageSections.map((section, index) => {
                  return (
                    <MenuItem
                      key={`manu-item-${index}`}
                      onClick={() => scrollToSection(section)}
                    >
                      <Typography color="text.primary">{section}</Typography>
                    </MenuItem>
                  );
                })}
                <MenuItem onClick={() => changePageHandler("Contact us")}>
                  <Typography color="text.primary">Contact us</Typography>
                </MenuItem>
              </>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flex: 1,
            px: 3,
            gap: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {isAuth ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={openMenuHandler} sx={{ p: 0 }}>
                  <Avatar alt={loggedUser.name} src={""} />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  id="account-menu"
                  onClose={closeMenuHandler}
                  onClick={closeMenuHandler}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  open={Boolean(anchorElUser)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <ToggleColorModeSwitch />
                  </Box>
                  {manuItemsArr.map((menuItem, index) => {
                    return (
                      <MenuItem
                        key={`menu-item-${index}`}
                        onClick={menuItem.function}
                      >
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <Typography>{menuItem.name}</Typography>
                      </MenuItem>
                    );
                  })}
                  <Divider />
                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Log out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <ToggleColorModeSwitch />
              <Button
                color="primary"
                variant="outlined"
                size="small"
                onClick={() => changePageHandler("Login")}
              >
                Log in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => changePageHandler("Sign up")}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
        {/******************************************************************************************************************/}
        {/******************************************************************************************************************/}
        {/******************************************************************************************************************/}
        {/****************************************************** MOBILE VIEW ***********************************************/}
        {/******************************************************************************************************************/}
        {/******************************************************************************************************************/}
        {/******************************************************************************************************************/}
        <Box sx={{ display: { sm: "", md: "none" } }}>
          {isAuth ? (
            <IconButton onClick={toggleDrawer(true)} sx={{ p: 0, px: 0.5 }}>
              <Avatar alt={loggedUser.name} src={""} />
            </IconButton>
          ) : (
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ p: 0, px: 0.5 }}
            >
              <ListRoundedIcon />
            </Button>
          )}
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                minWidth: "60dvw",
                p: 2,
                backgroundColor: "background.paper",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    pb: 2,
                  }}
                >
                  <ToggleColorModeSwitch />
                </Box>
              </Box>
              <Divider />

              {addToHomeScreenEnabled &&
                browser === "Chrome" &&
                deferredPrompt !== null && (
                  <MenuItem
                    onClick={() => {
                      pwaInstall();
                    }}
                  >
                    <ListItemIcon>
                      <AddToHomeScreenRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Add to Home Screen</Typography>
                  </MenuItem>
                )}

              {isAuth ? (
                <>
                  {manuItemsArr.map((menuItem, index) => {
                    return (
                      <MenuItem
                        key={`menu-item-${index}`}
                        onClick={menuItem.function}
                      >
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <Typography>{menuItem.name}</Typography>
                      </MenuItem>
                    );
                  })}
                </>
              ) : (
                <>
                  {enabledLandingPageSections.map((section, index) => {
                    return (
                      <MenuItem
                        key={`manu-item-${index}`}
                        onClick={() => scrollToSection(section)}
                      >
                        <ListItemIcon>
                          {section === "Features" && (
                            <GradeRoundedIcon fontSize="small" />
                          )}
                          {section === "Highlights" && (
                            <AutoAwesomeRoundedIcon fontSize="small" />
                          )}
                          {section === "Faq" && (
                            <HelpOutlineRoundedIcon fontSize="small" />
                          )}
                        </ListItemIcon>
                        <Typography>{section}</Typography>
                      </MenuItem>
                    );
                  })}
                  <MenuItem onClick={() => changePageHandler("Contact us")}>
                    <ListItemIcon>
                      <SupportAgentRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Contact us</Typography>
                  </MenuItem>
                </>
              )}

              <Divider />
              {isAuth ? (
                <>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={logoutHandler}
                      sx={{ width: "100%" }}
                    >
                      Log out
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => changePageHandler("Login")}
                      sx={{ width: "100%" }}
                    >
                      Log in
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => changePageHandler("Sign up")}
                      sx={{ width: "100%" }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                </>
              )}
            </Box>
          </Drawer>
        </Box>
      </Box>
    </AppBar>
  );
};

export default CustomAppBar;
