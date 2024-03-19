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
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Podcai
            </Typography>
          </Typography>
          <Typography variant="h4" textAlign="center">
            Personalized news podcasts
            <br />
            powered by AI
          </Typography>

          <Typography variant="h5" textAlign="center">
            Stay curious, stay informed
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            {/* <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              inputProps={{
                autocomplete: "off",
                ariaLabel: "Enter your email address",
              }}
            /> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                changePageHandler("Sign up");
              }}
            >
              Sign up now!
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Sign up now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms of Service
            </Link>
            .
          </Typography>
        </Stack>
        {/* <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            height: { xs: 200, sm: 700 },
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        /> */}
      </Container>
    </Box>
  );
}
