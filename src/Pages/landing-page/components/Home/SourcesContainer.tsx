import { Box, Grid } from "@mui/material";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";
import { useEffect } from "react";
import ArticleCard from "./ArticleCard";

type SourcesContainerProps = {
  currentlyPlaying: TEpisode | undefined;
  isLoadingEpisodes: boolean;
};

export const SourcesContainer = ({
  currentlyPlaying,
  isLoadingEpisodes,
}: SourcesContainerProps) => {
  useEffect(() => {
    scrollToTop();
  }, [currentlyPlaying?.name]);

  const scrollToTop = () => {
    const el = document.getElementById("sources-grid");
    if (!el) return;
    el.scrollTop = 0;
  };

  return (
    <Box
      id="sources-container-wrapper"
      display={"flex"}
      alignItems={"flex-end"}
      justifyContent={"center"}
      flex={5}
      overflow={"auto"}
      minHeight={"50%"}
    >
      <Grid
        id="sources-grid"
        px={1}
        pb={1}
        flexGrow={1}
        spacing={2}
        container
        justifyContent="space-evenly"
        overflow={"auto"}
        height={"100%"}
        maxHeight={"100%"}
      >
        {isLoadingEpisodes &&
          Array(3)
            .fill(undefined)
            .map((_, index) => {
              return (
                <Grid
                  key={`article-skeleton-grid-${index}`}
                  item
                  xs={12}
                  md={4}
                  justifyContent={"center"}
                  flexWrap={{ xs: "unset" }}
                  width={{ xs: "min-content" }}
                >
                  <ArticleCard article={undefined} />
                </Grid>
              );
            })}
        {currentlyPlaying &&
          currentlyPlaying.articles_data.map((article, index) => {
            return (
              <Grid
                key={`article-grid-${index}`}
                item
                xs={12}
                md={4}
                justifyContent={"center"}
                flexWrap={{ xs: "unset" }}
                width={{ xs: "min-content" }}
              >
                <ArticleCard article={article} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
