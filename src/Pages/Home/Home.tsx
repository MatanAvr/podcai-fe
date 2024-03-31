import { useEffect, useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Episode } from "../../ConstAndTypes/consts";
import { isMobile } from "../../Utils/Utils";
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
  Typography,
} from "@mui/material";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { CustomAudioPlayer } from "../../Components/UI/CustomAudioPlayer/CustomAudioPlayer";
import { useQuery } from "@tanstack/react-query";

const mobile = isMobile();
const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Episode | undefined>(
    undefined
  );

  const getEpisodes = async () => {
    const res = await apiClientInstance.getEpisodes();
    const sortedEpisodes = [...res.episodes];
    if (currentlyPlaying === undefined) {
      setCurrentlyPlaying(sortedEpisodes[0]);
    }
    return sortedEpisodes;
  };

  const onClickEpisodeHandler = (newEpisode: Episode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      setCurrentlyPlaying(undefined);
    } else setCurrentlyPlaying(newEpisode);
  };

  useEffect(() => {
    if (allEpisodes) {
      setCurrentlyPlaying(() => allEpisodes[0]);
    }
  }, []);

  const { data: allEpisodes, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["allEpisodesData"],
    queryFn: getEpisodes,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <Box className={`home-wrapper ${mobile ? "mobile" : ""}`} gap={1}>
      {allEpisodes && allEpisodes.length === 0 && (
        <Typography variant="h5" component="div">
          Your first podcai wiil be ready in a few short minutes!
        </Typography>
      )}

      <Box className={`home-container ${mobile ? "mobile" : ""}`} gap={1}>
        {isLoadingEpisodes ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Currently playing card*/}
            <Box
              key={"start-card"}
              sx={{
                width: "100%",
                height: "min-content",
                maxHeight: "100%",
                justifyContent: "flex-start",
                p: 1,
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 1.5,
              }}
            >
              <Typography key={"start-title"} component="div">
                {currentlyPlaying ? "Currently playing" : "Choose an episode"}
              </Typography>

              <>
                {currentlyPlaying && (
                  <>
                    <CustomAudioPlayer key="AP" episode={currentlyPlaying} />
                    <Typography>Sources</Typography>
                    <Card
                      sx={{
                        overflow: "auto",
                        flex: 1,
                      }}
                    >
                      {currentlyPlaying.articles_data.map((article, index) => {
                        return (
                          <Accordion key={"Accordion" + index}>
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
                    </Card>
                  </>
                )}
              </>
            </Box>

            {/* All episodes card*/}
            <Box
              key={"middle-card"}
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                flex: 0.3,
                width: "100%",
                maxHeight: "100%",
                gap: 1,
              }}
            >
              <Typography key={"middle-title"}>All episodes</Typography>

              <Box sx={{ overflow: "auto" }}>
                {allEpisodes ? (
                  allEpisodes.length > 0 &&
                  allEpisodes.map((episode, index) => {
                    const active = currentlyPlaying?.name === episode.name;
                    const activeOutline = active
                      ? {
                          outline: 1,
                          outlineColor: "primary.main",
                        }
                      : {};
                    return (
                      <Card
                        key={"EC-" + index}
                        elevation={2}
                        sx={{
                          width: "90%",
                          my: 1,
                          mx: "auto",
                          p: 0,
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
                          <div>
                            <Checkbox
                              checked={active}
                              icon={<PlayArrowOutlinedIcon />}
                              checkedIcon={<PlayCircleFilledOutlinedIcon />}
                            />
                            {episode.name}
                          </div>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignContent: "center",
                              justifyContent: "center",
                            }}
                          ></Box>
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
