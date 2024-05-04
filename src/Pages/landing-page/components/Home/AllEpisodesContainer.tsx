import {
  Box,
  Card,
  CardActions,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
import { useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Hooks/useStoreHooks";
import { setAllEpisodeOpenConfig } from "../../../../Features/Config";

type AllEpisodesContainerProps = {
  allEpisodes: TEpisode[];
  currentlyPlaying?: TEpisode;
  onClickEpisodeHandler: (newEpisode: TEpisode) => void;
};

export const AllEpisodesContainer = ({
  allEpisodes,
  currentlyPlaying,
  onClickEpisodeHandler,
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
