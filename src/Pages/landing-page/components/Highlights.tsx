import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { FONT_SIZE } from "../../../ConstAndTypes/consts";

const highlights = [
  {
    icon: <FeedRoundedIcon fontSize="large" />,
    title: `Stay Ahead of the Curve`,
    description: `Keep informed about real-time news. Get concise updates on the day’s 
    headlines, narrated with the help of advanced AI.`,
  },
  {
    icon: <RecordVoiceOverRoundedIcon fontSize="large" />,
    title: `Realistic Voices, Real Impact`,
    description: `Dive into the news with lifelike narration. 
    Our AI ensures each story is delivered with human-like intonation, keeping you engaged and informed like never before.`,
  },
  {
    icon: <ThumbUpAltRoundedIcon fontSize="large" />,
    title: `Great user experience`,
    description: `Integrate our product into your daily routine with an intuitive and easy-to-use interface.`,
  },
];

export default function Highlights() {
  return (
    <Box
      id="Highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
        width: "100vw",
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} sm={6} md={4} key={`highlight-${index}`}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                  transition: "0.2s",
                  "&:hover ": {
                    transform: "translateY(-5px)",
                    borderColor: "white",
                  },
                }}
              >
                <Box>{highlight.icon}</Box>
                <div>
                  <Typography fontWeight="bold" gutterBottom>
                    {highlight.title}
                  </Typography>
                  <Typography variant={FONT_SIZE} sx={{ color: "grey.400" }}>
                    {highlight.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
