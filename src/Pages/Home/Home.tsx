import { useEffect, useRef, useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Categories, Episode } from "../../ConstAndTypes/consts";
import { useAppSelector } from "../../Hooks/Hooks";
import { isMobile } from "../../Utils/Utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { cloneDeep } from "lodash";
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
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import _ from "lodash";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { CustomAudioPlayer } from "../../Components/UI/CustomAudioPlayer/CustomAudioPlayer";

const mobile = isMobile();
const apiClientInstance = ApiClient.getInstance();

const numOfCategoriesToChoose = 3;

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Episode>();
  const [previousEpisodes, setPreviousEpisodes] = useState<Episode[]>([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState<boolean>(false);
  const [showAllArticles, showArticles] = useState<boolean>(false);
  const [chosenCategories, setChosenCategories] = useState<Categories[]>(
    [...loggedUser.categories] || []
  );
  const [isUpdading, setIsUpdading] = useState<boolean>(false);
  // const [oneTimeFlag, setOneTimeFlag] = useState<boolean>(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    getEpisodes();
    hasMounted.current = true;
  }, []);

  const toggleShowArticles = () => {
    showArticles((prev) => !prev);
  };

  const getEpisodes = async () => {
    setIsLoadingEpisodes(true);
    const res = await apiClientInstance.getEpisodes();
    const sortedEpisodes = [...res.episodes].reverse();
    setAllEpisodes(sortedEpisodes);
    setCurrentlyPlaying(sortedEpisodes[0]);
    setPreviousEpisodes(sortedEpisodes.slice(1));
    setIsLoadingEpisodes(false);
  };

  const onClickCategoryHandler = (category: Categories) => {
    const tempCatArr = [...chosenCategories];
    const index = tempCatArr.indexOf(category);
    if (index > -1) {
      // only splice array when item is found
      tempCatArr.splice(index, 1); // 2nd parameter means remove one item only
    } else if (tempCatArr.length < numOfCategoriesToChoose) {
      tempCatArr.push(category);
    }
    setChosenCategories(() => tempCatArr);
  };

  const onClickSaveHandler = async () => {
    setIsUpdading(true);
    const userToUpdate = cloneDeep(loggedUser);
    userToUpdate.categories = chosenCategories;
    const updateRes = await apiClientInstance.userUpdate({
      ...userToUpdate,
      num_of_articles: 2,
    });
    if (updateRes.is_success) console.log("user updated");
    setIsUpdading(false);
  };

  const onClickEpisodeHandler = (newEpisode: Episode) => {
    if (newEpisode.name === currentlyPlaying?.name) {
      setCurrentlyPlaying(undefined);
    } else setCurrentlyPlaying(newEpisode);
  };

  return (
    <div className={`home-wrapper ${mobile ? "mobile" : ""}`}>
      <Typography variant="h4" component="div">
        Hello {loggedUser.name}!
        <LoadingButton
          sx={{ marginInlineStart: "10px" }}
          key={"get-episodes"}
          variant="contained"
          onClick={getEpisodes}
          loading={isLoadingEpisodes}
        >
          <RefreshIcon />
        </LoadingButton>
      </Typography>

      <div className={`home-container ${mobile ? "mobile" : ""}`}>
        <Card
          key={"start-card"}
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            height: "min-content",
            background: "rgba(255,255,255,0.2)",
          }}
        >
          <Typography key={"start-title"} variant="h5" component="div">
            Currently playing
          </Typography>

          <div className="episodes-wrapper">
            {isLoadingEpisodes ? (
              <LoadingSpinner />
            ) : (
              <>
                {currentlyPlaying ? (
                  <>
                    <CustomAudioPlayer key="AP" episode={currentlyPlaying} />
                    {!isMobile() && (
                      <>
                        <Box className="source-articles-wrapper" sx={{ my: 1 }}>
                          <u>Source articles</u>
                        </Box>

                        <div
                          className={`articles-wrapper 
                      ${showAllArticles ? "show" : ""}`}
                        >
                          {currentlyPlaying.articles_data.map(
                            (article, index) => {
                              return (
                                <Accordion
                                  key={"AR" + index}
                                  sx={{
                                    p: 0,
                                    textOverflow: "ellipsis",
                                    background: "rgba(255,255,255,0.2)",
                                  }}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography>{article.title}</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Typography>
                                      {article.description}
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              );
                            }
                          )}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>Choose an episode</div>
                )}
              </>
            )}
          </div>
        </Card>
        {/* all episodes */}
        <Card
          key={"middle-card"}
          variant="elevation"
          elevation={0}
          sx={{
            p: 1,
            // Width: "32%",
            // maxWidth: "32%",
            display: "flex",
            flexDirection: "column",
            flex: isMobile() ? 3 : 0.5,
            overflow: "auto",
            width: "100%",
            maxHeight: "100%",
            background: "rgba(255,255,255,0.2)",
          }}
        >
          <Typography key={"middle-title"} variant="h5" component="div">
            All episodes
          </Typography>
          <div className="episodes-wrapper">
            {isLoadingEpisodes ? (
              <LoadingSpinner />
            ) : allEpisodes ? (
              allEpisodes.length > 0 &&
              allEpisodes.map((episode, index) => {
                const active = currentlyPlaying?.name === episode.name;
                return (
                  <Card
                    key={"EC-" + index}
                    sx={{
                      m: 1,
                      p: 1,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                      background: "rgba(255,255,255,0.2)",
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
          </div>
        </Card>
      </div>
    </div>
  );
};
