import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { TEpisode } from "../../../../Api/ApiTypesAndConsts";

import { openInNewTab } from "../../../../Utils/Utils";

type SourcesContainerProps = {
  currentlyPlaying: TEpisode;
};

export const SourcesContainer = ({
  currentlyPlaying,
}: SourcesContainerProps) => {
  return (
    <Box display={"flex"} flex={7} flexDirection={"column"} overflow={"auto"}>
      <Container
        sx={{
          py: 1,
        }}
      >
        <Grid spacing={1} container direction={{ xs: "column", md: "row" }}>
          {currentlyPlaying.articles_data.map((article, index) => {
            return (
              <Grid item xs={4} key={`article-${index}`}>
                <Card
                  sx={{
                    height: "100%",
                    maxWidth: 345,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    sx={{ height: 150, backgroundSize: "coantain" }}
                    image={article.image}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
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
      </Container>
    </Box>
  );
};
