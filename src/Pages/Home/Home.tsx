import { useEffect, useState } from "react";
import { ApiClient } from "../../Services/axios";
import {
  ALL_EPISODES_QUERY_KEY,
  DEFAULT_STALE_TIME_MINUTES,
  Episode,
} from "../../ConstAndTypes/consts";
import { isMobile, minutesInMilliseconds } from "../../Utils/Utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
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
  const [expandedArr, setExpandedArr] = useState<string[]>([]);
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
    staleTime: minutesInMilliseconds(DEFAULT_STALE_TIME_MINUTES),
  });

  const onClickEpisodeHandler = (newEpisode: Episode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      return;
    } else {
      setCurrentlyPlaying(newEpisode);
      collapseAllHandler();
    }
  };

  useEffect(() => {
    if (allEpisodes) {
      setCurrentlyPlaying(() => allEpisodes[0]);
    }
  }, []);

  const expendHandler = (panelId: string) => {
    if (expandedArr.includes(panelId)) {
      const index = expandedArr.findIndex((el) => el === panelId);
      if (index !== -1) {
        const newExpendedArr = [...expandedArr];
        newExpendedArr.splice(index, 1);
        setExpandedArr(() => newExpendedArr);
      }
    } else {
      setExpandedArr((prev) => [...prev, panelId]);
    }
  };

  const collapseAllHandler = () => {
    setExpandedArr(() => []);
  };

  const expandAllHandler = () => {
    if (!currentlyPlaying) return;
    const tempArr = [];
    for (let i = 0; i <= currentlyPlaying.articles_data.length; i++) {
      tempArr.push(generatePanelId(i));
    }
    setExpandedArr(tempArr);
  };

  const generatePanelId = (index: number): string => `panel-${index}`;

  return (
    <Box
      id="home-wrapper"
      sx={{
        display: "flex",
        width: mobile ? "95%" : "80%",
        maxHeight: "96%",
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
          // border: "1px solid red",
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
                maxHeight: "100%",
                height: mobile ? "75%" : "100%",
                // border: "1px solid blue",
              }}
            >
              <>
                {currentlyPlaying && (
                  <>
                    <CustomAudioPlayer episode={currentlyPlaying} />
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography>Sources</Typography>
                      <Box display={"flex"} gap={1}>
                        <Button
                          size="small"
                          onClick={expandAllHandler}
                          variant="outlined"
                        >
                          Expand-all
                        </Button>
                        <Button
                          size="small"
                          onClick={collapseAllHandler}
                          variant="outlined"
                        >
                          Collapse-all
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        overflow: "auto",
                      }}
                    >
                      {currentlyPlaying.articles_data.map((article, index) => {
                        const panelId = generatePanelId(index);
                        return (
                          <Accordion
                            key={"Accordion" + index}
                            expanded={expandedArr.includes(panelId)}
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
                                  gap: 1,
                                }}
                              >
                                <Avatar
                                  src={article.image}
                                  alt="Article image"
                                  variant="rounded"
                                  sx={{ width: 30, height: 30 }}
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
                                rel="noopener"
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
                maxHeight: "100%",
                gap: 1,
                width: mobile ? "100%" : "auto",
                // border: "1px solid green",
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
                              icon={<PlayArrowRoundedIcon fontSize="small" />}
                              checkedIcon={
                                <PlayArrowRoundedIcon
                                  color="primary"
                                  fontSize="small"
                                />
                              }
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
