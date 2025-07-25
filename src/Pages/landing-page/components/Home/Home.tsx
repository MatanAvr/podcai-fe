import { useEffect, useState } from "react";
import {
  BOTTOM_PLAYER_HEIGHT_DESKTOP,
  HEADER_HEIGHT,
} from "../../../../Consts/consts";
import { Box, Card, Typography } from "@mui/material";
import { useAppSelector } from "../../../../Hooks/useStoreHooks";
import Counter from "../../../../Components/UI/Counter";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
import { SourcesContainer } from "./SourcesContainer";
import { AllEpisodesContainer } from "./AllEpisodesContainer";
import BottomAudioPlayer from "../../../../Components/UI/BottomAudioPlayer/BottomAudioPlayer";
import useGetEpisodes from "../../../../Hooks/useGetEpisodes";
// import BottomNav from "../../../../Components/UI/BottomNav";

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<
    TEpisode | undefined
  >(undefined);

  const { data: allEpisodes, isLoading: isLoadingEpisodes } = useGetEpisodes();

  const onClickEpisodeHandler = (newEpisode: TEpisode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      return;
    } else {
      setCurrentlyPlaying(newEpisode);
    }
  };

  useEffect(() => {
    if (allEpisodes && allEpisodes.length > 0 && !currentlyPlaying) {
      setCurrentlyPlaying(() => allEpisodes[0]);
    }
  }, [allEpisodes, currentlyPlaying]);

  const calcHeight = `calc(100vh - ${HEADER_HEIGHT}px)`;
  const calcMaxHeight = `calc(100vh - ${HEADER_HEIGHT}px)`;

  return (
    <>
      <Box
        id="home-page-wrapper"
        display="flex"
        width={"100%"}
        height={calcHeight}
        maxHeight={calcMaxHeight}
        overflow={"hidden"}
      >
        {/* // New user */}
        {allEpisodes && allEpisodes.length === 0 && (
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                width: { xs: 300, md: 400 },
                textAlign: "center",
                gap: 1,
                mt: 6,
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

        {/* //Main */}
        <Box
          id="home-container"
          display="flex"
          flex={1}
          flexDirection={"column"}
          height={"100%"}
          overflow={"hidden"}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            flex={1}
            width={"100%"}
            maxHeight={`calc(100% - ${BOTTOM_PLAYER_HEIGHT_DESKTOP}px)`}
            maxWidth={"100%"}
            overflow={"hidden"}
          >
            <SourcesContainer
              currentlyPlaying={currentlyPlaying}
              isLoadingEpisodes={isLoadingEpisodes}
            />
            <AllEpisodesContainer
              allEpisodes={allEpisodes}
              currentlyPlaying={currentlyPlaying}
              onClickEpisodeHandler={onClickEpisodeHandler}
              isLoadingEpisodes={isLoadingEpisodes}
            />
          </Box>
          <BottomAudioPlayer
            episode={currentlyPlaying}
            isLoadingEpisodes={isLoadingEpisodes}
          />
        </Box>
      </Box>
      {/* <BottomNav /> */}
    </>
  );
};
