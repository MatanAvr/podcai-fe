import { Card, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Pages } from "../../../ConstAndTypes/consts";
import { moveToPage } from "../../../Features/Navigation/Navigation";
import { useAppDispatch } from "../../../Hooks/Hooks";

export default function Hero() {
  const dispatch = useAppDispatch();

  const changePageHandler = (newPage: Pages) => {
    dispatch(moveToPage(newPage));
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
          <Typography variant="h2" color="primary" fontWeight={"bold"}>
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
