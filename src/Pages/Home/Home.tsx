import { useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Button } from "../../Components/UI/Button/Button";
import { Episode } from "../../ConstAndTypes/consts";
import { EpisodeContainer } from "../../Components/UI/EpisodeContainer/EpisodeContainer";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { useAppSelector } from "../../Hooks/Hooks";
import { ArticleContainer } from "../../Components/UI/ArticleContainer/ArticleContainer";

const apiClientInstance = ApiClient.getInstance();

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [todayEpisode, setTodayEpisode] = useState<Episode>();
  const [previousEpisodes, setPreviousEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEpisodes = async () => {
    setIsLoading(true);
    const res = await apiClientInstance.getEpisodes();
    const sortedEpisodes = [...res.episodes].reverse();
    setAllEpisodes(sortedEpisodes);
    setTodayEpisode(sortedEpisodes[0]);
    setPreviousEpisodes(sortedEpisodes.slice(1));
    setIsLoading(false);
  };

  return (
    <div className="home-wrapper">
      <h1>Hello {loggedUser.name}!</h1>
      <Button
        key={"get-episodes"}
        text="Get episodes"
        type="outline"
        onClick={getEpisodes}
      />
      <div className="home-container">
        <div className="home-col">
          <div className="col-title">Today's podcast:</div>

          <div className="episodes-wrapper">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {todayEpisode ? (
                  <>
                    <EpisodeContainer key={"TP"} episode={todayEpisode} />
                    <u>Source articles</u>
                    <div className="articles-wrapper">
                      {todayEpisode.articles_data.map((article, index) => {
                        return (
                          <ArticleContainer
                            key={"AR" + index}
                            article={article}
                          />
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div>No data</div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="home-col">
          <div className="col-title">Previous podcasts:</div>
          <div className="episodes-wrapper">
            {isLoading ? (
              <LoadingSpinner />
            ) : previousEpisodes ? (
              previousEpisodes.length > 0 &&
              previousEpisodes.map((episode, index) => {
                return (
                  <EpisodeContainer key={"PP-" + index} episode={episode} />
                );
              })
            ) : (
              <>No data</>
            )}
          </div>
        </div>

        <div className="home-col"></div>
      </div>
    </div>
  );
};
