import { Box, Card, Chip } from "@mui/material";
import { Episode } from "../../../ConstAndTypes/consts";
import "./EpisodeContainer.scss";
import _ from "lodash";

interface episodeProps {
  episode: Episode;
}

export const EpisodeContainer = ({ episode }: episodeProps) => {
  return (
    <Card sx={{ p: 1, m: 1 }}>
      <div>{episode.name}</div>

      <audio
        className="audio-track"
        src={episode.link}
        controls
        controlsList="nodownload"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {episode.categories.map((category, index) => (
          <Chip
            key={"CatChip" + index}
            label={_.capitalize(category)}
            size="small"
            sx={{ mx: 0.5 }}
            variant="outlined"
          />
        ))}
      </Box>
    </Card>
  );
};
