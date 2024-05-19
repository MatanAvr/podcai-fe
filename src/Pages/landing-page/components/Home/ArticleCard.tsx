import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Skeleton,
} from "@mui/material";
import { openInNewTab } from "../../../../Utils/Utils";
import { ArticleData } from "../../../../Api/ApiTypesAndConsts";

type ArticleCardProps = {
  article: ArticleData | undefined;
};

const articleCardStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minWidth: 200,
  mx: { md: "auto" },
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  if (!article) {
    return <Skeleton sx={{ ...articleCardStyle, minHeight: 400 }} />;
  }
  return (
    <Card sx={articleCardStyle}>
      <CardMedia
        sx={{
          minHeight: 150,
          height: 200,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        image={article.image}
        title="article"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
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
        <Button size="small" onClick={() => openInNewTab(article.url)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
