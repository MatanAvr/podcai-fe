import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";
import { TPages } from "../../../Types/Types";

export default function Hero() {
  const nav = useMyNavigation();

  const changePageHandler = (newPage: TPages) => {
    nav.push(newPage);
  };

  return (
    <Box id="Hero" width="100%">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          flexWrap={"wrap"}
          sx={{ width: { xs: "100%", sm: "70%" } }}
          textAlign={"center"}
        >
          <Typography variant="h2" fontWeight="bold">
            Daily personalized
          </Typography>
          <Typography variant="h2" fontWeight="bold">
            news podcasts
          </Typography>
          <Typography variant="h2" color="primary" fontWeight="bold">
            Powered by AI
          </Typography>
          <Typography variant="h6">
            Wanna get caught up quickly on the topics that matter most to you?
            <br />
            We got you covered.
          </Typography>
          <Typography variant="h4" color="primary">
            <b>Stay curious.</b>
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                changePageHandler("Sign up");
              }}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
