import { useEffect, useState } from "react";
import { ApiClient } from "../../Services/axios";
import { ALL_EPISODES_QUERY_KEY, Episode } from "../../ConstAndTypes/consts";
import { isMobile, minutesInMilliseconds } from "../../Utils/Utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardActions,
  Checkbox,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { CustomAudioPlayer } from "../../Components/UI/CustomAudioPlayer/CustomAudioPlayer";
import { useQuery } from "@tanstack/react-query";
import { DoneRounded } from "@mui/icons-material";

const mobile = isMobile();
const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const [expendedArr, setExpendedArr] = useState<string[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Episode | undefined>(
    undefined
  );

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
    staleTime: minutesInMilliseconds(10),
  });

  const onClickEpisodeHandler = (newEpisode: Episode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      return;
    } else {
      setCurrentlyPlaying(newEpisode);
      setExpendedArr(() => []);
    }
  };

  useEffect(() => {
    if (allEpisodes) {
      setCurrentlyPlaying(() => allEpisodes[0]);
    }
  }, []);

  const expendHandler = (panelId: string) => {
    if (expendedArr.includes(panelId)) {
      const index = expendedArr.findIndex((el) => el === panelId);
      if (index !== -1) {
        const newExpendedArr = [...expendedArr];
        newExpendedArr.splice(index, 1);
        setExpendedArr(() => newExpendedArr);
      }
    } else {
      setExpendedArr((prev) => [...prev, panelId]);
    }
  };

  return (
    <Box
      id="home-wrapper"
      sx={{
        display: "flex",
        width: mobile ? "95%" : "75%",
        maxHeight: "98%",
      }}
    >
      {allEpisodes && allEpisodes.length === 0 && (
        <Typography variant="h5" component="div">
          Your first podcai wiil be ready in a few short minutes!
        </Typography>
      )}

      <Box
        id="home-container"
        sx={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: "flex-start",
          maxHeight: "100%",
          flex: 1,
          overflow: "hidden",
        }}
        gap={1}
      >
        {isLoadingEpisodes ? (
          <LoadingSpinner />
        ) : (
          <>
            <Box
              id="currently-playing-wrapper"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flex: 6,
                gap: 1,
                maxHeight: "95%",
                height: mobile ? "75%" : "95%",
              }}
            >
              <>
                {currentlyPlaying && (
                  <>
                    <CustomAudioPlayer episode={currentlyPlaying} />
                    <Typography>Sources</Typography>
                    <Box
                      sx={{
                        overflow: "auto",
                      }}
                    >
                      {currentlyPlaying.articles_data.map((article, index) => {
                        const panelId = `panel-${index}`;
                        return (
                          <Accordion
                            key={"Accordion" + index}
                            expanded={expendedArr.includes(panelId)}
                            onChange={() => expendHandler(panelId)}
                          >
                            <AccordionSummary
                              id="accordion-summery"
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="summery-content"
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Avatar
                                  src={article.image}
                                  alt="Article image"
                                  variant="rounded"
                                >
                                  <ArticleRoundedIcon />
                                </Avatar>
                                <Typography>{article.source_name}</Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Link
                                href={article.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {article.title}
                              </Link>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                    </Box>
                  </>
                )}
              </>
            </Box>

            <Box
              id="all-episodes-wrapper"
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 2,
                maxHeight: "95%",
                gap: 1,
                width: mobile ? "100%" : "auto",
              }}
            >
              <Typography>All episodes</Typography>

              <Box
                id="all-episoeds-container"
                sx={{
                  overflow: "auto",
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
                            width={"90%"}
                          >
                            <Checkbox
                              checked={active}
                              icon={<PlayArrowOutlinedIcon fontSize="small" />}
                              checkedIcon={<PlayCircleFilledOutlinedIcon />}
                            />
                            <Typography
                              sx={{
                                display: "flex",
                                flex: 1,
                                textAlign: "center",
                              }}
                            >
                              {episode.name}
                            </Typography>
                            {episode.is_completed && (
                              <DoneRounded color="success" fontSize="small" />
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
        )}
      </Box>
    </Box>
  );
};
