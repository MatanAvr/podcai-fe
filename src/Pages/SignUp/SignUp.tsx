import "./SignUp.scss";
import { useState, useEffect } from "react";
import {
  INewUser,
  Categories,
  VoiceSample,
  Voices,
} from "../../ConstAndTypes/consts";
import { SelectBox } from "../../Components/UI/SelectBox/SelectBox";
import { ApiClient } from "../../Services/axios";
import {
  addErrorToId,
  isValidEmail,
  removeErrorFromId,
} from "../../Utils/Utils";
import { useAppDispatch } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { DynamicLogo } from "../../Components/UI/DynamicLogo/DynamicLogo";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";

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
  should_send_episode_email: true,
};

const numOfCategoriesToChoose = 3;

const categories: Categories[] = [
  "general",
  "world",
  "nation",
  "business",
  "health",
  "technology",
  "sports",
  "science",
  "entertainment",
];

export const SignUp = () => {
  const [newUser, setNewUser] = useState<INewUser>(newUserDefault);
  const [chosenCategories, setChosenCategories] = useState<Categories[]>([]);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [voiceSamples, setVoiceSamples] = useState<VoiceSample[]>();
  const [chosenVoiceSample, setChosenVoiceSample] = useState<Voices | "">("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const validateEmail = () => {
    let error = "";
    const emailValid = isValidEmail(newUser.email);
    if (!emailValid) {
      error = "Invalid email";
      setErrorMsg(error);
    } else {
    }
    if (error !== "") {
      return false;
    }
    setErrorMsg(error);
    return true;
  };

  useEffect(() => {
    if (!voiceSamples) {
      getVoiceSamepls();
    }
  }, [voiceSamples]);

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

  const signupHandler = async () => {
    setErrorMsg("");
    setIsLoading(true);
    // validate fields
    try {
      const signUpRes = await apiClientInstance.signUp(newUser);
      if (signUpRes.access_token) {
        const token = signUpRes.access_token;
        const userToLogIn = signUpRes;
        dispatch(setLoggedUser({ newLoggeduser: userToLogIn }));
        dispatch(setAuth({ newMode: true, token }));
        dispatch(moveToPage("Home"));
      }
    } catch (err) {
      setErrorMsg("Sign up error, please try again!");
    }
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
    setNewUser({
      ...newUser,
      categories: tempCatArr,
    });
  };

  const changeIndexHandler = (action: "prev" | "next") => {
    setErrorMsg("");
    if (action === "next" && stageIndex + 1 < signUpStagesArr.length) {
      setStageIndex((prev) => prev + 1);
    } else if (action === "prev" && stageIndex - 1 >= 0) {
      setStageIndex((prev) => prev - 1);
    }
  };

  const userDataContainer = (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "auto" },
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="name"
        label="Name"
        variant="standard"
        onChange={onChange}
        value={newUser.name}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={onChange}
        value={newUser.email}
        onBlur={validateEmail}
        error={errorMsg.length > 0 ? true : false}
        helperText={errorMsg}
      />
      <TextField
        id="password"
        label="Password"
        variant="standard"
        onChange={onChange}
        value={newUser.password}
        type="password"
      />
    </Box>
  );

  const categoriesContainer = (
    <>
      <div className="categories-wrapper">
        <div>
          Choose your top {numOfCategoriesToChoose} favorite categories:
        </div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {categories.map((category, index) => {
            const active = chosenCategories.includes(category);
            const disabled =
              !active && chosenCategories.length === numOfCategoriesToChoose;
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={active}
                      onChange={() => onClickCategoryHandler(category)}
                      disabled={disabled}
                    />
                  }
                  label={_.capitalize(category)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );

  const voiceContainer = (
    <div className="voices-wrapper">
      Voice options:
      {voiceSamples &&
        voiceSamples.length > 0 &&
        voiceSamples.map((voiceSample, index) => {
          const active = chosenVoiceSample === voiceSample.name;
          return (
            <div
              key={"VS-" + index}
              className={`choose-voice-container ${active ? "active" : ""}`}
              onClick={() => {
                setChosenVoiceSample(voiceSample.name);
              }}
            >
              {voiceSample.name}
              <audio src={voiceSample.url} controls controlsList="nodownload" />
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

  const checkIfNextDisabled = () => {
    if (stageIndex === 0) {
      return !(
        newUser.name.length > 2 &&
        isValidEmail(newUser.email) &&
        newUser.password.length >= 4
      );
    } else if (stageIndex === 1) {
      return !(chosenCategories.length === 3);
    } else if (stageIndex === 2) {
      return !chosenVoiceSample;
    }
  };

  const stagesLen = signUpStagesArr.length;

  return (
    <div className="sign-up-wrapper">
      <Typography variant="h4" component="div">
        Sign-Up
      </Typography>
      {isLoading ? (
        <DynamicLogo />
      ) : (
        <div className="sign-up-container">
          <div className="sign-up-content">{signUpStagesArr[stageIndex]}</div>

          <div className="sign-up-buttons">
            <Button
              variant="outlined"
              onClick={() => changeIndexHandler("prev")}
              disabled={stageIndex === 0}
            >
              Prev
            </Button>
            {errorMsg && <div className="error">{errorMsg}</div>}
            {stageIndex !== stagesLen - 1 ? (
              <Button
                variant="outlined"
                onClick={() => changeIndexHandler("next")}
                disabled={checkIfNextDisabled()}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={signupHandler}
                disabled={checkIfNextDisabled()}
              >
                Sign-up
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
