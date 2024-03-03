import { useEffect, useRef, useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Episode } from "../../ConstAndTypes/consts";
import { useAppSelector } from "../../Hooks/Hooks";
import { isMobile } from "../../Utils/Utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  Checkbox,
  Link,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { CustomAudioPlayer } from "../../Components/UI/CustomAudioPlayer/CustomAudioPlayer";

const mobile = isMobile();
const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Episode>();
  const [previousEpisodes, setPreviousEpisodes] = useState<Episode[]>();
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState<boolean>(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    getEpisodes();
    hasMounted.current = true;
  }, []);

  const getEpisodes = async () => {
    setIsLoadingEpisodes(true);
    const res = await apiClientInstance.getEpisodes();
    const sortedEpisodes = [...res.episodes];
    setAllEpisodes(sortedEpisodes);
    setCurrentlyPlaying(sortedEpisodes[0]);
    setPreviousEpisodes(sortedEpisodes.slice(1));
    setIsLoadingEpisodes(false);
  };

  const onClickEpisodeHandler = (newEpisode: Episode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      setCurrentlyPlaying(undefined);
    } else setCurrentlyPlaying(newEpisode);
  };

  return (
    <div className={`home-wrapper ${mobile ? "mobile" : ""}`}>
      <Typography
        variant="h5"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Hello {loggedUser.name}!</div>
        <LoadingButton
          sx={{
            borderRadius: "500px",
          }}
          key={"get-episodes"}
          variant="contained"
          onClick={getEpisodes}
          loading={isLoadingEpisodes}
          size="small"
        >
          <RefreshIcon />
        </LoadingButton>
      </Typography>

      {allEpisodes && allEpisodes.length === 0 && (
        <Typography variant="h5" component="div">
          Your first podcai wiil be ready in a few short minutes!
        </Typography>
      )}

      <div className={`home-container ${mobile ? "mobile" : ""}`}>
        <Card
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
            gap: 1.2,
          }}
        >
          <Typography key={"start-title"} component="div">
            Currently playing
          </Typography>

          <>
            {isLoadingEpisodes ? (
              <LoadingSpinner />
            ) : (
              <>
                {currentlyPlaying ? (
                  <>
                    <CustomAudioPlayer key="AP" episode={currentlyPlaying} />
                    <Typography>Sources</Typography>
                    <Card sx={{ overflow: "auto", flex: 1, maxHeight: "40%" }}>
                      {currentlyPlaying.articles_data.map((article, index) => {
                        return (
                          <Accordion key={"Accordion" + index}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="summery-content"
                            >
                              <Typography>{article.source_name}</Typography>
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
                ) : (
                  <div>Choose an episode</div>
                )}
              </>
            )}
          </>
        </Card>

        {/* all episodes card*/}

        <Card
          key={"middle-card"}
          variant="elevation"
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            flex: 0.5,
            width: "100%",
            maxHeight: "100%",
            gap: 1,
          }}
        >
          <Typography key={"middle-title"}>
            All episodes
            {allEpisodes?.length ? ` [${allEpisodes?.length}]` : ""}
          </Typography>
          {isLoadingEpisodes ? (
            <LoadingSpinner />
          ) : (
            <Card sx={{ overflow: "auto" }}>
              {allEpisodes ? (
                allEpisodes.length > 0 &&
                allEpisodes.map((episode, index) => {
                  const active = currentlyPlaying?.name === episode.name;
                  return (
                    <Card
                      key={"EC-" + index}
                      elevation={2}
                      sx={{
                        my: 0.5,
                        p: 0,
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <CardActions
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                          },
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
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
};
