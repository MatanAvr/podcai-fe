import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Pages } from "../../../ConstAndTypes/consts";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";

export default function Hero() {
  const nav = useMyNavigation();

  const changePageHandler = (newPage: Pages) => {
    nav.push(newPage);
  };

  return (
    <Box
      id="Hero"
      sx={{
        width: "100%",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: "100%", sm: "70%", textAlign: "center" } }}
        >
          <Typography variant="h3" color="primary" fontWeight={"bold"}>
            Stay curious,
            <br /> Stay informed
          </Typography>
          <Typography variant="h4" textAlign="center">
            Daily personalized news podcasts
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Powered by AI
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
