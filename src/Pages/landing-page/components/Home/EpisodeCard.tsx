import { Card, CardActions, Skeleton, Stack, Typography } from "@mui/material";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type EpisodeCardProps = {
  active: boolean;
  onClickEpisodeHandler: (newEpisode: TEpisode) => void;
  episode: TEpisode | undefined;
};

const episodeCardStyle = {
  width: "95%",
  my: 1,
  mx: "auto",
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
};

const EpisodeCard = ({
  active,
  episode,
  onClickEpisodeHandler,
}: EpisodeCardProps) => {
  const activeOutline = active
    ? {
        outline: 1,
        outlineColor: "primary.main",
      }
    : "";
  if (!episode) {
    return (
      <Skeleton
        sx={{
          ...episodeCardStyle,
          height: 50,
        }}
      />
    );
  }
  return (
    <Card
      elevation={2}
      sx={{
        ...episodeCardStyle,
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
            <CheckCircleRoundedIcon color="primary" fontSize="small" />
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};

export default EpisodeCard;
