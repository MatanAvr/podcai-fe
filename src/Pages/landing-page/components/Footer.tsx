import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import TwitterIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import podcaiLogo from "../../../Assets/Images/Podcai logo.png";
import podcaiLogoDark from "../../../Assets/Images/Podcai logo - dark.png";
import { useAppSelector } from "../../../Hooks/Hooks";
import { enabledSections } from "../LandingPage";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { Pages } from "../../../ConstAndTypes/consts";
import { moveToPage } from "../../../Features/Navigation/Navigation";
import { Divider } from "@mui/material";

const twitterLink = "https://twitter.com/podcai";
const instagramLink = "https://instagram.com/podcai";
const facebookLink = "https://www.facebook.com/podcai.co";
const linkedinLink = "https://www.linkedin.com/company/podcai";

const logoStyle = {
  width: "140px",
  height: "auto",
};

const linkStyle = { cursor: "pointer" };
const linkColor = undefined;

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      Podcai&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
};

export default function Footer() {
  const currentTheme = useAppSelector((state) => state.theme.themeMode);
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const dispatch = useAppDispatch();

  const changePageHandler = (newPage: Pages) => {
    dispatch(moveToPage(newPage));
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "LandingPage") {
      dispatch(moveToPage("LandingPage"));
    }
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 6 },
        py: { xs: 4, sm: 2 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flex: 1, gap: 6 }}>
          {/* Product -------------------------------------------------*/}
          <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body1" fontWeight={"bold"}>
              Product
            </Typography>

            {enabledSections.map((section, index) => {
              return (
                <Link
                  key={`link-${index}`}
                  sx={linkStyle}
                  color={linkColor}
                  onClick={() => scrollToSection(section)}
                >
                  {section}
                </Link>
              );
            })}
          </Box>
          {/* Company -------------------------------------------------*/}
          {/* <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body1" fontWeight={"bold"}>
              Company
            </Typography>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Terms of service")}
            >
              About us
            </Link>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Terms of service")}
            >
              Careers
            </Link>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Terms of service")}
            >
              Press
            </Link>
          </Box> */}
          {/* // Legal -------------------------------------------------*/}
          <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body1" fontWeight={"bold"}>
              Legal
            </Typography>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Terms of service")}
            >
              Terms of Service
            </Link>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Privacy policy")}
            >
              Privacy Policy
            </Link>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Contact us")}
            >
              Contact us
            </Link>
          </Box>
        </Box>
        {/* Newsletter related  ---------------------------------------------*/}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box>
              <img
                src={currentTheme === "light" ? podcaiLogo : podcaiLogoDark}
                style={logoStyle}
                alt="Podcai logo"
                draggable="false"
              />
            </Box>
            <Typography variant="body1" fontWeight={"bold"} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autocomplete: "off",
                  ariaLabel: "Enter your email address",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 4 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Copyright />
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="primary"
            href={twitterLink}
            target="_blank"
            aria-label="X"
            sx={{ alignSelf: "center" }}
            size="large"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="primary"
            href={instagramLink}
            target="_blank"
            aria-label="Instagram"
            sx={{ alignSelf: "center" }}
            size="large"
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            color="primary"
            href={facebookLink}
            target="_blank"
            aria-label="Facebook"
            sx={{ alignSelf: "center" }}
            size="large"
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            color="primary"
            href={linkedinLink}
            target="_blank"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
            size="large"
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
