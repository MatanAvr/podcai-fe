import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import { useState } from "react";
import topicsDark from "../../../Assets/Images/Hero-images/topics-dark.webp";
import topicsLight from "../../../Assets/Images/Hero-images/topics-light.webp";
import podcaiPreviewDark from "../../../Assets/Images/Hero-images/podcai-dark.webp";
import podcaiPreviewLight from "../../../Assets/Images/Hero-images/podcai-light.webp";
import podcastersPhoto from "../../../Assets/Images/Hero-images/podcasters.webp";
import { LANDING_PAGE_PY, MAX_NUM_OF_TOPICS } from "../../../Consts/consts";

const features = [
  {
    icon: <NewspaperRoundedIcon fontSize="large" />,
    title: "Topics",
    description: `Podcai offers a selection of 9 topics for podcasts. 
    Choose up to ${MAX_NUM_OF_TOPICS}, and Podcai will generate your personalized daily podcasts.`,
    imageLight: `url('${topicsDark}')`,
    imageDark: `url('${topicsLight}')`,
  },
  {
    icon: <GroupsIcon fontSize="large" />,
    title: "Podcaster voices",
    description: "6 featured podcaster voices are available to choose from.",
    imageLight: `url('${podcastersPhoto}')`,
    imageDark: `url('${podcastersPhoto}')`,
  },
  {
    icon: <DevicesRoundedIcon fontSize="large" />,
    title: "Available on all platforms",
    description: `Podcai is a web-based app that is available on all platforms.`,
    imageLight: `url('${podcaiPreviewLight}')`,
    imageDark: `url('${podcaiPreviewDark}')`,
  },
];

export default function Features() {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setSelectedFeatureIndex(index);
  };

  const selectedFeature = features[selectedFeatureIndex];

  return (
    <Container id="Features" sx={{ py: LANDING_PAGE_PY }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Features
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {features.map(({ title }, index) => (
              <Chip
                key={`feature-chip-${index}`}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedFeatureIndex === index
                        ? "primary.light"
                        : "";
                    }
                    return selectedFeatureIndex === index
                      ? "primary.light"
                      : "";
                  },
                  background: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedFeatureIndex === index ? "none" : "";
                    }
                    return selectedFeatureIndex === index ? "none" : "";
                  },
                  backgroundColor:
                    selectedFeatureIndex === index ? "primary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedFeatureIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? features[selectedFeatureIndex].imageLight
                    : features[selectedFeatureIndex].imageDark,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box sx={{ px: 1, pb: 1 }}>
              <Typography fontWeight="bold">{selectedFeature.title}</Typography>
              <Typography sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                fontWeight="bold"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  "& > svg": { transition: "0.2s" },
                  "&:hover > svg": { transform: "translateX(2px)" },
                }}
              ></Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {features.map(({ icon, title, description }, index) => (
              <Card
                key={`feature-card-${index}`}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedFeatureIndex === index
                      ? "action.selected"
                      : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedFeatureIndex === index
                        ? "primary.light"
                        : "grey.200";
                    }
                    return selectedFeatureIndex === index
                      ? "primary.dark"
                      : "grey.800";
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === "light") {
                          return selectedFeatureIndex === index
                            ? "primary.main"
                            : "grey.300";
                        }
                        return selectedFeatureIndex === index
                          ? "primary.main"
                          : "grey.700";
                      },
                    }}
                    fontSize={"big"}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography color="text.primary" fontWeight="bold">
                      {title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ my: 0.5 }}>
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      fontWeight="bold"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        "& > svg": { transition: "0.2s" },
                        "&:hover > svg": { transform: "translateX(2px)" },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    ></Link>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? features[selectedFeatureIndex].imageLight
                    : features[selectedFeatureIndex].imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
