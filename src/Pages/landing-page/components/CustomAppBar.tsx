import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorModeButton from "./ToggleColorModeButton";
import { Pages } from "../../../ConstAndTypes/consts";
import { moveToPage } from "../../../Features/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useState } from "react";
import podcaiLogo from "../../../Assets/Images/Podcai logo.png";
import podcaiLogoDark from "../../../Assets/Images/Podcai logo - dark.png";
import { setAuth } from "../../../Features/User/User";

const logoStyle = {
  maxHeight: "30px",
  height: "auto",
  cursor: "pointer",
  marginStart: "5px",
};

const CustomAppBar = () => {
  const [open, setOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.user.auth);
  const currentTheme = useAppSelector((state) => state.theme.themeMode);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const dispatch = useAppDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "LandingPage") {
      dispatch(moveToPage("LandingPage"));
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
      setOpen(false);
    }
  };

  const changePageHandler = (newPage: Pages) => {
    dispatch(moveToPage(newPage));
    setOpen(false);
  };

  const logoutHandler = () => {
    dispatch(setAuth({ newMode: false, token: "" }));
    changePageHandler("LandingPage");
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0.5,
              }}
            >
              <img
                src={currentTheme === "light" ? podcaiLogo : podcaiLogoDark}
                style={logoStyle}
                alt="logo of podcai"
                onClick={() => {
                  if (isAuth) {
                    changePageHandler("Home");
                  } else {
                    changePageHandler("LandingPage");
                    scrollToSection("hero");
                  }
                }}
              />

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {isAuth ? (
                  <>
                    <MenuItem
                      onClick={() => changePageHandler("Home")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Home
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => changePageHandler("Settings")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Settings
                      </Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => scrollToSection("features")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Features
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => scrollToSection("testimonials")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Testimonials
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => scrollToSection("highlights")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Highlights
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => scrollToSection("pricing")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Pricing
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => scrollToSection("faq")}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        FAQ
                      </Typography>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
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
                    variant="text"
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
              {/* // MOBILE VIEW *** */}
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
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={() => scrollToSection("features")}>
                        Features
                      </MenuItem>
                      <MenuItem onClick={() => scrollToSection("testimonials")}>
                        Testimonials
                      </MenuItem>
                      <MenuItem onClick={() => scrollToSection("highlights")}>
                        Highlights
                      </MenuItem>
                      <MenuItem onClick={() => scrollToSection("pricing")}>
                        Pricing
                      </MenuItem>
                      <MenuItem onClick={() => scrollToSection("faq")}>
                        FAQ
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
                          variant="contained"
                          onClick={() => changePageHandler("Sign up")}
                          sx={{ width: "100%" }}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
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
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
