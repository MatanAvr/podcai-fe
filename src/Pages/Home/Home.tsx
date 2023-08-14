import { useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Button } from "../../Components/UI/Button/Button";
import { Episode } from "../../ConstAndTypes/consts";
import { EpisodeContainer } from "../../Components/UI/EpisodeContainer/EpisodeContainer";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { useAppSelector } from "../../Hooks/Hooks";

const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEpisodes = async () => {
    setIsLoading(true);
    const res = await apiClientInstance.getEpisodes();
    setEpisodes([...res.episodes]);
    setIsLoading(false);
  };

  return (
    <div className="home-wrapper">
      <h1>Home</h1>
      <h2>Hello {loggedUser.name}!</h2>
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
