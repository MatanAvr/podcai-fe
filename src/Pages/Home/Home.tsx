import { useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Button } from "../../Components/UI/Button/Button";
import { Episode } from "../../ConstAndTypes/consts";
import { EpisodeContainer } from "../../Components/UI/EpisodeContainer/EpisodeContainer";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEpisodes = async () => {
    setIsLoading(true);
    const res = await apiClientInstance.getEpisodes();
    console.log(res);
    setEpisodes([...res.episodes]);
    setIsLoading(false);
  };

  return (
    <div className="home-wrapper">
      <h1>Home</h1>

      <Button
        key={"get-episodes"}
        text="Get episodes"
        type="outline"
        onClick={getEpisodes}
      />

      <div className="episodes-wrapper">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          episodes &&
          episodes.length > 0 &&
          episodes.map((episode, index) => {
            return <EpisodeContainer key={"EP-" + index} episode={episode} />;
          })
        )}
      </div>
    </div>
  );
};
