import {
  Box,
  Card,
  CardActions,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { isMobile } from "../../../../Utils/Utils";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
type AllEpisodesContainerProps = {
  allEpisodes: TEpisode[];
  currentlyPlaying: TEpisode;
  onClickEpisodeHandler: (newEpisode: TEpisode) => void;
};
const mobile = isMobile();

export const AllEpisodesContainer = ({
  allEpisodes,
  currentlyPlaying,
  onClickEpisodeHandler,
}: AllEpisodesContainerProps) => {
  return (
    <>
      <Divider flexItem />
      <Box
        id="all-episodes-wrapper"
        display="flex"
        flexDirection="column"
        flex={1}
        gap={1}
        width={{ xs: "100%", md: "auto" }}
        alignItems="center"
        maxHeight={"100%"}
      >
        <Box
          id="all-episoeds-container"
          sx={{
            overflow: "auto",
            width: "90%",
            flexGrow: 1,
            px: 1,
          }}
        >
          {allEpisodes ? (
            allEpisodes.length > 0 &&
            allEpisodes.map((episode, index) => {
              const active = currentlyPlaying?.name === episode.name;
              const activeOutline = active
                ? {
                    outline: 1,
                    outlineColor: "primary.main",
                  }
                : "";
              return (
                <Card
                  key={"EC-" + index}
                  elevation={2}
                  sx={{
                    width: "95%",
                    my: 1,
                    mx: "auto",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                    ...activeOutline,
                  }}
                >
                  <CardActions
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                      p: 0,
                      flex: 1,
                    }}
                    onClick={() => onClickEpisodeHandler(episode)}
                  >
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      width={"95%"}
                      sx={{ py: 0.2 }}
                    >
                      <PlayArrowRoundedIcon
                        color={active ? "primary" : "disabled"}
                        fontSize="small"
                        sx={{ p: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        color={active ? "primary" : ""}
                        sx={{
                          display: "flex",
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        {episode.name}
                      </Typography>
                      {episode.is_completed && (
                        <CheckCircleRoundedIcon
                          color="primary"
                          fontSize="small"
                        />
                      )}
                    </Stack>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <>No data</>
          )}
        </Box>
      </Box>
    </>
  );
};
