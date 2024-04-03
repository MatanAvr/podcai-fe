import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorModeButton from "./ToggleColorModeButton";
import { Pages, FONT_SIZE } from "../../../ConstAndTypes/consts";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useState } from "react";
import podcaiLogo from "../../../Assets/Images/podcaiLogo.png";
import { setAuth } from "../../../Features/User/User";
import { enabledSections } from "../LandingPage";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";

const logoStyle = {
  maxHeight: "40px",
  height: "auto",
  marginStart: "10px",
};

const menuItemStyle = {
  py: "6px",
  px: "12px",
};

const CustomAppBar = () => {
  const [open, setOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentTheme = useAppSelector((state) => state.theme.themeMode);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();

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
    dispatch(setAuth({ newMode: false, token: "" }));
    changePageHandler("LandingPage");
    setOpen(false);
  };

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
                changePageHandler("LandingPage");
                scrollToSection("Hero");
              }
            }}
          >
            <img
              src={currentTheme === "light" ? podcaiLogo : podcaiLogo}
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
              <>
                <MenuItem
                  onClick={() => changePageHandler("Home")}
                  sx={menuItemStyle}
                >
                  <Typography variant={FONT_SIZE} color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => changePageHandler("Settings")}
                  sx={menuItemStyle}
                >
                  <Typography variant={FONT_SIZE} color="text.primary">
                    Settings
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => changePageHandler("Contact us")}
                  sx={menuItemStyle}
                >
                  <Typography variant={FONT_SIZE} color="text.primary">
                    Contact us
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <>
                {enabledSections.map((section, index) => {
                  return (
                    <MenuItem
                      key={`manu-item-${index}`}
                      onClick={() => scrollToSection(section)}
                      sx={menuItemStyle}
                    >
                      <Typography variant={FONT_SIZE} color="text.primary">
                        {section}
                      </Typography>
                    </MenuItem>
                  );
                })}
                <MenuItem
                  onClick={() => changePageHandler("Contact us")}
                  sx={menuItemStyle}
                >
                  <Typography variant={FONT_SIZE} color="text.primary">
                    Contact us
                  </Typography>
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
          <ToggleColorModeButton />
          {isAuth ? (
            <Button
              color="primary"
              variant="text"
              size="small"
              onClick={logoutHandler}
            >
              Log out
            </Button>
          ) : (
            <>
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

        {/* // MOBILE VIEW *** */}
        <Box sx={{ display: { sm: "", md: "none" } }}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ minWidth: "30px", p: "4px" }}
          >
            <MenuIcon />
          </Button>
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
                  alignItems: "end",
                  flexGrow: 1,
                }}
              >
                <ToggleColorModeButton />
              </Box>
              {isAuth ? (
                <>
                  <MenuItem onClick={() => changePageHandler("Home")}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => changePageHandler("Settings")}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => changePageHandler("Contact us")}>
                    Contact us
                  </MenuItem>
                </>
              ) : (
                <>
                  {enabledSections.map((section, index) => {
                    return (
                      <MenuItem
                        key={`manu-item-${index}`}
                        onClick={() => scrollToSection(section)}
                      >
                        {section}
                      </MenuItem>
                    );
                  })}
                  <MenuItem onClick={() => changePageHandler("Contact us")}>
                    Contact us
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
