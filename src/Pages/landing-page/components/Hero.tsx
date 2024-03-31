import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h2"
            textAlign="center"
            color="primary"
            fontWeight={"bold"}
          >
            Stay curious,
            <br /> Stay informed
          </Typography>
          <Typography variant="h4" textAlign="center">
            Daily personalized news podcasts
            <br />
            <b>powered by AI</b>
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
          {/* <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Sign up&quot; you agree to our&nbsp;
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => changePageHandler("Terms of service")}
              color="primary"
            >
              Terms of Service
            </Link>
            .
          </Typography> */}
        </Stack>
        <Typography
          variant="h4"
          sx={{ pt: 8, my: { xs: 2, sm: 4 } }}
          textAlign={"center"}
        >
          A convenient and enjoyable way to stay informed <br />
          about the topics that interest you.
        </Typography>
      </Container>
    </Box>
  );
}
