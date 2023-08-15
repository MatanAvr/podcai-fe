import { ArticleData } from "../../../ConstAndTypes/consts";
import { openInNewWindow } from "../../../Utils/Utils";
import { IconButton } from "../IconButton/IconButton";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import "./ArticleContainer.scss";
import { useState } from "react";

interface articleProps {
  article: ArticleData;
}

export const ArticleContainer = ({ article }: articleProps) => {
  const openArticleHandler = (articleLink: string) => {
    openInNewWindow(articleLink);
  };

  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className={`article-wrapper`}>
      <div className="article-container">
        <div
          className="article-title"
          onClick={() => openArticleHandler(article.url)}
        >
          <u>{article.title}</u>
        </div>
        <div className={`article-description ${showMore ? "show" : ""}`}>
          {article.description}
        </div>
        <IconButton onClick={toggleShowMore}>
          {showMore ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
        </IconButton>
      </div>
    </div>
  );
};
