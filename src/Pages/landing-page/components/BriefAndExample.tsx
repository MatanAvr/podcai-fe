import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { OneLineAudioPlayer } from "../../../Components/UI/OneLineAudioPlayer/OneLineAudioPlayer";
import useGetEpisodeExample from "../../../Hooks/useGetEpisodeExample";

export default function BriefAndExample() {
  const { data: episodeExampleUrl } = useGetEpisodeExample();

  return (
    <Box id="bried-and-example" sx={{ py: { xs: 2, sm: 4 } }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <br />
          {episodeExampleUrl && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "300px",
                width: "60%",
                gap: 1,
              }}
            >
              <Typography variant="h5">
                Check out this sample episode
              </Typography>
              <OneLineAudioPlayer audioUrl={episodeExampleUrl} />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
