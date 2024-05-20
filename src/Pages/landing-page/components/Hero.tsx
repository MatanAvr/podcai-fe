import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";
import { TPages } from "../../../Types/Types";
import glowSvgLight from "../../../Assets/Svg/bg-light.svg";
import glowSvgDark from "../../../Assets/Svg/bg-dark.svg";
import { useAppSelector } from "../../../Hooks/useStoreHooks";
import Button from "@mui/material/Button/Button";

export default function Hero() {
  const nav = useMyNavigation();
  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const relevantSvg = themeColor === "dark" ? glowSvgDark : glowSvgLight;
  const changePageHandler = (newPage: TPages) => {
    nav.push(newPage);
  };

  return (
    <Box
      id="Hero"
      width="100%"
      sx={{
        backgroundImage: `url(${relevantSvg})`,
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      py={{ sx: 6, md: 10 }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack flexWrap={"wrap"} gap={2}>
          <Box sx={{ pb: 8 }}>
            <Typography variant="h2" fontWeight="bold">
              Daily personalized
            </Typography>
            <Typography variant="h2" fontWeight="bold">
              news podcasts
            </Typography>
            <Typography
              variant="h2"
              color="primary"
              fontWeight="bold"
              // sx={{
              //   backgroundImage:
              //     "linear-gradient(45deg,#a163f1,#6363f1 22%,#3498ea 40%,#40dfa3 67%, rgba(64, 223, 163, 0))",
              //   backgroundSize: "100% 100%",
              //   backgroundRepeat: "no-repeat",
              //   backgroundClip: "text",
              //   WebkitTextFillColor: "transparent",
              //   lineHeight: "unset",
              // }}
            >
              Powered by AI
            </Typography>

            <Typography variant="h6">
              Wanna get caught up quickly on the topics that matter most to you?
              <br />
              We got you covered.
            </Typography>
          </Box>
          <Button
            sx={{
              minWidth: 150,
              maxWidth: 250,
              alignSelf: "center",
            }}
            variant="contained"
            size="large"
            onClick={() => {
              changePageHandler("Sign up");
            }}
          >
            Try the free beta now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
