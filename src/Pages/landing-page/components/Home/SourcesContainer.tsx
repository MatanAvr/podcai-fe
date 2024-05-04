import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";

import { openInNewTab } from "../../../../Utils/Utils";
import { useEffect } from "react";

type SourcesContainerProps = {
  currentlyPlaying: TEpisode | undefined;
};

export const SourcesContainer = ({
  currentlyPlaying,
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
        px={2}
        pb={1}
        flexGrow={1}
        spacing={2}
        container
        justifyContent="space- 
       evenly"
        overflow={"auto"}
        height={"100%"}
        maxHeight={"100%"}
      >
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
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minWidth: 200,
                    mx: { md: "auto" },
                  }}
                >
                  <CardMedia
                    sx={{
                      minHeight: 150,
                      height: 200,
                      backgroundSize: "cover",
                    }}
                    image={article.image}
                    title="article"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {article.source_name}
                    </Typography>
                    <Typography gutterBottom component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{
                      marginTop: "auto",
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => openInNewTab(article.url)}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
