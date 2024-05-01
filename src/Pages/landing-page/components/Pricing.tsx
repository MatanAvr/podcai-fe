import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { LANDING_PAGE_PY } from "../../../Consts/consts";
import { useMyNavigation } from "../../../Hooks/useMyNavigation";

const tiers = [
  {
    title: "Basic",
    price: "4.99",
    description: [
      "Short episodes (3-4 minutes)",
      "2 podcaster voices",
      "30 days before episdoes deletion",
      "14 days no login => stop generate episodes (you will be notice)",
    ],
    buttonText: "Start now",
    buttonVariant: "outlined",
  },
  {
    title: "Standart",
    subheader: "Recommended",
    price: "9.99",
    description: [
      "Medium length episodes (7-8 minutes)",
      "6 podcaster voices",
      "60 days before episdoes deletion",
      "30 days no login => stop generate episodes (you will be notice)",
      "Mark episodes as favorite",
    ],
    buttonText: "Start now",
    buttonVariant: "contained",
  },
  {
    title: "Premium",
    price: "14.99",
    description: [
      "Medium length episodes (7-8 minutes)",
      "6 podcaster voices",
      "90 days before episdoes deletion",
      "60 days no login => stop generate episodes (you will be notice)",
      "Mark episodes as favorite",
    ],
    buttonText: "Start now",
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  const nav = useMyNavigation();
  return (
    <Container
      id="Pricing"
      sx={{
        py: LANDING_PAGE_PY,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Pricing
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {tiers.map((tier, index) => (
          <Grid
            item
            key={`${tier.title}-${index}`}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                border: tier.title === "Standart" ? "1px solid" : undefined,
                borderColor:
                  tier.title === "Standart" ? "primary.main" : undefined,
                background:
                  tier.title === "Standart"
                    ? "linear-gradient(#033363, #021F3B)"
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: tier.title === "Standart" ? "white" : "",
                  }}
                >
                  <Typography component="h3" variant="h5">
                    {tier.title}
                  </Typography>
                  {tier.title === "Standart" && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color: tier.title === "Standart" ? "white" : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    ${tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; / month
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: "grey.500",
                  }}
                />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color:
                          tier.title === "Standart"
                            ? "primary.light"
                            : "primary.main",
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subtitle2"
                      sx={{
                        color: tier.title === "Standart" ? "white" : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as "outlined" | "contained"}
                  // component="a"
                  // href="/"
                  // target="_blank"
                  onClick={() => nav.push("Sign up")}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
