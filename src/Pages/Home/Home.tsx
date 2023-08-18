import { useState } from "react";
import { ApiClient } from "../../Services/axios";
import "./Home.scss";
import { Button } from "../../Components/UI/Button/Button";
import { Categories, Episode } from "../../ConstAndTypes/consts";
import { EpisodeContainer } from "../../Components/UI/EpisodeContainer/EpisodeContainer";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { useAppSelector } from "../../Hooks/Hooks";
import { ArticleContainer } from "../../Components/UI/ArticleContainer/ArticleContainer";
import { isMobile } from "../../Utils/Utils";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { IconButton } from "../../Components/UI/IconButton/IconButton";
import { SelectBox } from "../../Components/UI/SelectBox/SelectBox";
import { cloneDeep } from "lodash";

const mobile = isMobile();
const apiClientInstance = ApiClient.getInstance();

const numOfCategoriesToChoose = 3;
const categories: Categories[] = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

export const Home = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [todayEpisode, setTodayEpisode] = useState<Episode>();
  const [previousEpisodes, setPreviousEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAllArticles, showArticles] = useState<boolean>(false);
  const [chosenCategories, setChosenCategories] = useState<Categories[]>(
    [...loggedUser.categories] || []
  );
  const [isUpdading, setIsUpdading] = useState<boolean>(false);
  // console.log(loggedUser);

  const toggleShowArticles = () => {
    showArticles((prev) => !prev);
  };

  const getEpisodes = async () => {
    setIsLoading(true);
    const res = await apiClientInstance.getEpisodes();
    const sortedEpisodes = [...res.episodes].reverse();
    setAllEpisodes(sortedEpisodes);
    setTodayEpisode(sortedEpisodes[0]);
    setPreviousEpisodes(sortedEpisodes.slice(1));
    setIsLoading(false);
  };

  const onClickCategoryHandler = (category: Categories) => {
    const tempCatArr = [...chosenCategories];
    const index = tempCatArr.indexOf(category);
    if (index > -1) {
      // only splice array when item is found
      tempCatArr.splice(index, 1); // 2nd parameter means remove one item only
    } else if (tempCatArr.length < numOfCategoriesToChoose) {
      tempCatArr.push(category);
    }
    setChosenCategories(() => tempCatArr);
  };

  const onClickSaveHandler = async () => {
    setIsUpdading(true);
    const userToUpdate = cloneDeep(loggedUser);
    userToUpdate.categories = chosenCategories;
    const updateRes = await apiClientInstance.userUpdate({
      ...userToUpdate,
      num_of_articles: 2,
    });
    if (updateRes.is_success) console.log("user updated");
    setIsUpdading(false);
  };

  return (
    <div className={`home-wrapper ${mobile ? "mobile" : ""}`}>
      <h1>Hello {loggedUser.name}!</h1>
      <Button
        key={"get-episodes"}
        text="Get episodes"
        type="outline"
        onClick={getEpisodes}
      />
      <div className={`home-container ${mobile ? "mobile" : ""}`}>
        <div className="home-col">
          <div className="col-title">
            <b>Today's podcast:</b>
          </div>

          <div className="episodes-wrapper">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {todayEpisode ? (
                  <>
                    <EpisodeContainer key={"TP"} episode={todayEpisode} />
                    <div className="source-articles-wrapper">
                      <u>Source articles</u>
                      <IconButton onClick={toggleShowArticles}>
                        {showAllArticles ? (
                          <MdExpandLess size={25} />
                        ) : (
                          <MdExpandMore size={25} />
                        )}
                      </IconButton>
                    </div>

                    <div
                      className={`articles-wrapper ${
                        showAllArticles ? "show" : ""
                      }`}
                    >
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
          <div className="col-title">
            <b>Previous podcasts:</b>
          </div>
          <div className="episodes-wrapper">
            {isLoading ? (
              <LoadingSpinner />
            ) : previousEpisodes ? (
              previousEpisodes.length > 0 &&
              previousEpisodes.map((episode, index) => {
                return (
                  <EpisodeContainer key={"EC-" + index} episode={episode} />
                );
              })
            ) : (
              <>No data</>
            )}
          </div>
        </div>

        <div className="home-col">
          <div className="col-title">
            <b>Change categories:</b>
            <div className="categories-wrapper">
              {categories.map((category, index) => {
                const active = chosenCategories.includes(category);
                const disabled =
                  !active &&
                  chosenCategories.length === numOfCategoriesToChoose;
                return (
                  <SelectBox
                    key={`CAT-${index}`}
                    text={category}
                    active={active}
                    disabled={disabled}
                    onClick={() => {
                      onClickCategoryHandler(category);
                    }}
                  />
                );
              })}
            </div>
            {isUpdading ? (
              <LoadingSpinner />
            ) : (
              <Button type="outline" text="Save" onClick={onClickSaveHandler} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
