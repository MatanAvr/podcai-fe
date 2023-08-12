import { useState, useEffect } from "react";
import { Button } from "../../Components/UI/Button/Button";
import { Input } from "../../Components/UI/Input/Input";
import { INewUser, Categories, VoiceSample } from "../../ConstAndTypes/consts";
import "./SignUp.scss";
import { SelectBox } from "../../Components/UI/SelectBox/SelectBox";
import { ApiClient } from "../../Services/axios";
const apiClientInstance = ApiClient.getInstance();

const newUserDefault: INewUser = {
  name: "",
  email: "",
  password: "",
  voice: "Guy",
  num_of_articles: 2,
  categories: [],
  country: "us",
  language: "en",
};

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

export const SignUp = () => {
  const [newUser, setNewUser] = useState<INewUser>(newUserDefault);
  const [chosenCategories, setChosenCategories] = useState<Categories[]>([]);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [voiceSamples, setVoiceSamples] = useState<VoiceSample[]>();
  const [chosenVoiceSample, setChosenVoiceSample] = useState<string>();

  useEffect(() => {
    if (!voiceSamples) {
      getVoiceSamepls();
    }
  }, []);

  const getVoiceSamepls = async () => {
    const res = await apiClientInstance.getVoiceSamples();
    if (res) {
      setVoiceSamples(res.voice_samples);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setNewUser({
      ...newUser,
      [key]: value,
    });
  };

  // const submitHandler = async (e: React.FormEvent) => {
  const submitHandler = async () => {
    // e.preventDefault();
    // validate field
    console.log(newUser);
    // const signUpRes = await apiClientInstance.signUp(newUser);
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
    setNewUser({
      ...newUser,
      categories: tempCatArr,
    });
  };

  const changeIndexHandler = (action: "prev" | "next") => {
    if (action === "next" && stageIndex + 1 < signUpStagesArr.length) {
      setStageIndex((prev) => prev + 1);
    } else if (action === "prev" && stageIndex - 1 >= 0) {
      setStageIndex((prev) => prev - 1);
    }
  };

  const userDataContainer = (
    // <form className="form-wrapper" onSubmit={submitHandler}>
    <div className="form-wrapper">
      <Input
        id="name"
        value={newUser.name}
        placeholder="First name"
        style="underline"
        onChange={onChange}
      />
      <Input
        id="email"
        value={newUser.email}
        placeholder="Email"
        style="underline"
        onChange={onChange}
      />
      <Input
        id="password"
        value={newUser.password}
        placeholder="Password"
        style="underline"
        onChange={onChange}
        type="password"
      />
    </div>
  );

  const categoriesContainer = (
    <>
      <div className="categories-wrapper">
        <div>
          Choose your top {numOfCategoriesToChoose} favorite categories:
        </div>
        {categories.map((category, index) => {
          const active = chosenCategories.includes(category);
          const disabled =
            !active && chosenCategories.length === numOfCategoriesToChoose;
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
    </>
  );

  const voiceContainer = (
    <div className="voices-wrapper">
      Voice options:
      {voiceSamples &&
        voiceSamples.length > 0 &&
        voiceSamples.map((voiceSample, index) => {
          return (
            <div key={"VS-" + index} className="choose-voice-container">
              {voiceSample.name}
              <audio src={voiceSample.url} controls />
            </div>
          );
        })}
    </div>
  );

  const signUpStagesArr = [
    userDataContainer,
    categoriesContainer,
    voiceContainer,
  ];

  const stagesLen = signUpStagesArr.length;

  return (
    <div className="sign-up-wrapper">
      <h1>Sign-Up</h1>
      <div className="sign-up-container">
        <div className="sign-up-pagination">{stageIndex}</div>
        <div className="sign-up-content">{signUpStagesArr[stageIndex]}</div>

        <div className="sign-up-buttons">
          <Button
            text={"Prev"}
            onClick={() => changeIndexHandler("prev")}
            disabled={stageIndex === 0}
          />
          {stageIndex !== stagesLen - 1 ? (
            <Button
              text={"Next"}
              onClick={() => changeIndexHandler("next")}
              disabled={stageIndex === stagesLen - 1}
            />
          ) : (
            <Button text="Sign-up" type="outline" onClick={submitHandler} />
          )}
        </div>
      </div>
      {/* <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          id="name"
          value={newUser.name}
          placeholder="First name"
          type="underline"
          onChange={onChange}
        />
        <Input
          id="email"
          value={newUser.email}
          placeholder="Email"
          type="underline"
          onChange={onChange}
        />
        <Input
          id="password"
          value={newUser.password}
          placeholder="Password"
          type="underline"
          onChange={onChange}
        />
        Choose your top {numOfCategoriesToChoose} favorite categories:
        <div className="categories-wrapper">
          {categories.map((category, index) => {
            const active = chosenCategories.includes(category);
            const disabled =
              !active && chosenCategories.length === numOfCategoriesToChoose;
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
        <Button text="Sign-up" type="outline" />
      </form> */}
    </div>
  );
};
