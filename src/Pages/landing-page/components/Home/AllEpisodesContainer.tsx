import { Box, Divider, IconButton, Typography } from "@mui/material";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Hooks/useStoreHooks";
import { setAllEpisodeOpenConfig } from "../../../../Features/Config";
import EpisodeCard from "./EpisodeCard";

type AllEpisodesContainerProps = {
  allEpisodes: TEpisode[] | undefined;
  currentlyPlaying?: TEpisode;
  onClickEpisodeHandler: (newEpisode: TEpisode) => void;
  isLoadingEpisodes: boolean;
};

export const AllEpisodesContainer = ({
  allEpisodes,
  currentlyPlaying,
  onClickEpisodeHandler,
  isLoadingEpisodes,
}: AllEpisodesContainerProps) => {
  const allEpisodesOpen = useAppSelector(
    (state) => state.config.allEpisodesOpen
  );
  const dispatch = useAppDispatch();
  const mobileHeight = allEpisodesOpen ? "350px" : "0px";
  const changeAllEpisodesOpen = () => {
    dispatch(setAllEpisodeOpenConfig(!allEpisodesOpen));
  };
  return (
    <>
      <Divider flexItem />
      <Box
        id="all-episodes-wrapper"
        display="flex"
        flexDirection="column"
        overflow={"auto"}
        alignItems="center"
        minWidth={200}
      >
        {/* Collapse able in mobile */}
        <Box
          display={{ xs: "flex", md: "none" }}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            onClick={() => changeAllEpisodesOpen()}
          >
            <Typography variant="body2">All episodes</Typography>
            <IconButton>
              <ExpandCircleDownIcon
                fontSize="small"
                color="primary"
                sx={{
                  transition: "500ms ease-in-out",
                  transform: `rotate(${allEpisodesOpen ? "deg" : "-180deg"})`,
                }}
              />
            </IconButton>
          </Box>
        </Box>
        {/* All episodes container */}
        <Box
          id="all-episoeds-container"
          overflow={"auto"}
          width={"90%"}
          px={1}
          height={{ xs: mobileHeight, md: "auto" }}
          sx={{
            transition: "500ms ease-in-out",
          }}
        >
          {allEpisodes ? (
            allEpisodes.length > 0 &&
            allEpisodes.map((episode, index) => {
              const active = currentlyPlaying?.name === episode.name;
              return (
                <EpisodeCard
                  key={"episode-card-" + index}
                  active={active}
                  episode={episode}
                  onClickEpisodeHandler={onClickEpisodeHandler}
                />
              );
            })
          ) : isLoadingEpisodes ? (
            <>
              {Array(8)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <EpisodeCard
                      key={"episode-skeleton-card-" + index}
                      active={false}
                      episode={undefined}
                      onClickEpisodeHandler={onClickEpisodeHandler}
                    />
                  );
                })}
            </>
          ) : (
            <>No data</>
          )}
        </Box>
      </Box>
    </>
  );
};
