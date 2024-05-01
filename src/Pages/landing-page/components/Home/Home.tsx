import { useEffect, useState } from "react";
import { ApiClient } from "../../../../Api/axios";
import {
  ALL_EPISODES_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../../../../Consts/consts";
import { minutesInMilliseconds } from "../../../../Utils/Utils";
import { Box, Card, Typography } from "@mui/material";
import LoadingSpinner from "../../../../Components/UI/LoadingSpinner";
import { CustomAudioPlayer } from "../../../../Components/UI/CustomAudioPlayer/CustomAudioPlayer";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector } from "../../../../Hooks/useStoreHooks";
import Counter from "../../../../Components/UI/Counter";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
import { SourcesContainer } from "./SourcesContainer";
import { AllEpisodesContainer } from "./AllEpisodesContainer";
import BottomAudioPlayer from "../../../../Components/UI/BottomAudioPlayer/BottomAudioPlayer";

const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<
    TEpisode | undefined
  >(undefined);

  const getEpisodes = async () => {
    const res = await apiClientInstance.getEpisodes();
    const sortedEpisodes = [...res.episodes];
    if (currentlyPlaying === undefined && sortedEpisodes.length > 0) {
      setCurrentlyPlaying(sortedEpisodes[0]);
    }
    return sortedEpisodes;
  };

  const { data: allEpisodes, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: [ALL_EPISODES_QUERY_KEY],
    queryFn: getEpisodes,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });

  const onClickEpisodeHandler = (newEpisode: TEpisode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      return;
    } else {
      setCurrentlyPlaying(newEpisode);
    }
  };

  useEffect(() => {
    if (allEpisodes && !currentlyPlaying) {
      setCurrentlyPlaying(() => allEpisodes[0]);
    }
  }, [allEpisodes, currentlyPlaying]);

  return (
    <>
      <Box
        id="home-page-wrapper"
        display="flex"
        maxHeight={"86.5%"}
        width={"100%"}
      >
        {isLoadingEpisodes && <LoadingSpinner />}

        {allEpisodes && allEpisodes.length === 0 && (
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                maxWidth: 400,
                textAlign: "center",
                gap: 1,
              }}
            >
              <Typography variant="h4" component="div">
                {`Hi ${loggedUser.name}`}
              </Typography>
              <Typography variant="h5" component="div">
                {`Welcome to Podcai!`}
              </Typography>
              <Typography component="div">
                Right now, we’re generating your first Podcai episode.
                <br /> It’ll take just a few short minutes.
                <br />
                <Typography variant="h2" component="div">
                  &#128515;
                </Typography>
              </Typography>
              <Typography variant="caption" component="div">
                The page will refresh in <Counter seconds={60} /> seconds
              </Typography>
            </Card>
          </Box>
        )}

        {allEpisodes && allEpisodes.length > 0 && (
          <Box
            id="home-container"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              maxHeight: "100%",
              flex: 1,
              overflow: "hidden",
            }}
            gap={0.5}
          >
            <>
              <Box
                id="currently-playing-wrapper"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  flex: 6,
                  gap: 1,
                  maxHeight: "100%",
                  height: { xs: "75%", md: "100%" },
                }}
              >
                <>
                  {currentlyPlaying ? (
                    <>
                      {/* <CustomAudioPlayer episode={currentlyPlaying} /> */}
                      <SourcesContainer currentlyPlaying={currentlyPlaying} />
                    </>
                  ) : (
                    <Typography>Choose an episode to play</Typography>
                  )}
                </>
              </Box>

              {currentlyPlaying && (
                <AllEpisodesContainer
                  allEpisodes={allEpisodes}
                  currentlyPlaying={currentlyPlaying}
                  onClickEpisodeHandler={onClickEpisodeHandler}
                />
              )}
            </>
          </Box>
        )}
        {currentlyPlaying && <BottomAudioPlayer episode={currentlyPlaying} />}
      </Box>
    </>
  );
};
