import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TwitterIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { enabledLandingPageSections } from "../LandingPage";
import { Divider } from "@mui/material";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";
import { TPages } from "../../../Types/Types";
import Logo from "../../../Components/UI/Logo";
import { useScrollToSection } from "../../../Hooks/useScrollToSection";
import { openInNewTab } from "../../../Utils/Utils";

const twitterLink = "https://twitter.com/podcai";
const instagramLink = "https://instagram.com/podcai";
const facebookLink = "https://www.facebook.com/podcai.co";
const linkedinLink = "https://www.linkedin.com/company/podcai";

const socialMediaButtons = [
  { name: "X", link: twitterLink, icon: <TwitterIcon /> },
  { name: "Instagram", link: instagramLink, icon: <InstagramIcon /> },
  { name: "Facebook", link: facebookLink, icon: <FacebookIcon /> },
  { name: "Linkedin", link: linkedinLink, icon: <LinkedInIcon /> },
];

const linkStyle = { cursor: "pointer" };
const linkColor = "text.primary";

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
  const nav = useMyNavigation();
  const scrollToSection = useScrollToSection();

  const changePageHandler = (newPage: TPages) => {
    nav.push(newPage);
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
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        width="100%"
      >
        <Box
          display="flex"
          alignItems="flex-start"
          flex={1}
          gap={4}
          minWidth={{ xs: "100%", sm: "60%" }}
        >
          <Logo />
        </Box>
        <Box display="flex" gap={5} px={2}>
          {/* Product -------------------------------------------------*/}
          <Box
            display={{ xs: "flex", sm: "flex" }}
            flexDirection="column"
            gap={1}
          >
            <Typography fontWeight={"bold"}>Product</Typography>

            {enabledLandingPageSections.map((section, index) => {
              return (
                <Link
                  key={`link-${index}`}
                  sx={linkStyle}
                  color={linkColor}
                  onClick={() => scrollToSection(section)}
                  underline="hover"
                >
                  {section}
                </Link>
              );
            })}
          </Box>
          {/* Company -------------------------------------------------*/}
          <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography fontWeight={"bold"}>Company</Typography>
            <Link
              sx={linkStyle}
              color={linkColor}
              onClick={() => changePageHandler("Contact us")}
              underline="hover"
            >
              Contact us
            </Link>
          </Box>
        </Box>
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
        <Stack direction="row" justifyContent="left" spacing={1} useFlexGap>
          {socialMediaButtons.map((socialMedia, index) => {
            return (
              <IconButton
                onClick={() => openInNewTab(socialMedia.link)}
                key={`social-medie-button-${index}`}
                color="primary"
                // href={socialMedia.link}
                // target="_blank"
                // rel="external nofollow noopener"
                aria-label={socialMedia.name}
                sx={{ alignSelf: "center" }}
                size="large"
              >
                {socialMedia.icon}
              </IconButton>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}
