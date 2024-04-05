import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { LANDING_PAGE_PY } from "../../../ConstAndTypes/consts";
import { ApiClient } from "../../../Services/axios";
import { useQuery } from "@tanstack/react-query";
import { minutesInMilliseconds } from "../../../Utils/Utils";
import { OneLineAudioPlayer } from "../../../Components/UI/CustomAudioPlayer - Copy/OneLineAudioPlayer";

const apiClientInstance = ApiClient.getInstance();

export default function BriefAndExample() {
  const getEpisodeExample = async () => {
    const res = await apiClientInstance.getEpisodeExample();
    if (res) {
      return res.url;
    } else return "";
  };

  const { data: episodeExampleUrl, isLoading } = useQuery({
    queryKey: ["episode-example-url"],
    queryFn: getEpisodeExample,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(10),
  });

  return (
    <Box id="bried-and-example" sx={{ py: LANDING_PAGE_PY }}>
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
          <Typography variant="h4">
            A convenient and enjoyable way <br />
            to stay informed about the topics that interest you.
          </Typography>
          <br />
          {episodeExampleUrl && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "300px",
                width: "60%",
                textAlign: "start",
                gap: 1,
              }}
            >
              <Typography justifySelf={"start"}>
                Check out this sample episode:
              </Typography>
              <OneLineAudioPlayer audioUrl={episodeExampleUrl} />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
