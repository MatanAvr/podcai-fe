import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
  EPISODE_EXAMPLE_QUERY_KEY,
  SECTION_PY,
} from "../../../Consts/consts";
import { ApiClient } from "../../../Api/axios";
import { useQuery } from "@tanstack/react-query";
import { minutesInMilliseconds } from "../../../Utils/Utils";
import { OneLineAudioPlayer } from "../../../Components/UI/OneLineAudioPlayer/OneLineAudioPlayer";

const apiClientInstance = ApiClient.getInstance();

export default function BriefAndExample() {
  const getEpisodeExample = async () => {
    const res = await apiClientInstance.getEpisodeExample();
    if (res) {
      return res.url;
    } else return "";
  };

  const { data: episodeExampleUrl } = useQuery({
    queryKey: [EPISODE_EXAMPLE_QUERY_KEY],
    queryFn: getEpisodeExample,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });

  return (
    <Box id="bried-and-example" sx={{ py: SECTION_PY }}>
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
              <Typography variant="h6">
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
