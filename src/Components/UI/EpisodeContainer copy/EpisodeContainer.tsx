import { Episode } from "../../../ConstAndTypes/consts";
import { Chip } from "../Chip/Chip";
import "./EpisodeContainer.scss";

interface episodeProps {
  episode: Episode;
}

export const EpisodeContainer = ({ episode }: episodeProps) => {
  return (
    <div className={`episode-wrapper`}>
      <div className="episode-container">
        <div className="episode-name"> {episode.name}</div>

        <audio src={episode.link} controls />
        <div className="episode-categories">
          {episode.categories.map((category, index) => {
            return <Chip key={"CatChip" + index} text={category} />;
          })}
        </div>
      </div>
    </div>
  );
};
