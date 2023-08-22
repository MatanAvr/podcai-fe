import { ArticleData } from "../../../ConstAndTypes/consts";
import { IconButton } from "../IconButton/IconButton";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import "./ArticleContainer.scss";
import { useState } from "react";
import { Card, Link } from "@mui/material";

interface articleProps {
  article: ArticleData;
}

export const ArticleContainer = ({ article }: articleProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Card sx={{ p: 1, m: 1 }}>
      <div>
        <Link href={article.url} target="_blank" rel="noreferrer">
          {article.title}
        </Link>
      </div>
      <div>{article.description}</div>
      <IconButton onClick={toggleShowMore}>
        {showMore ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
      </IconButton>
    </Card>
  );
};
