import { useEffect, useRef, useState } from "react";
import {
  Categories,
  NUM_OF_CATEGORIES,
  VoiceSample,
  Voices,
} from "../../ConstAndTypes/consts";
import "./Settings.scss";
import { useAppSelector } from "../../Hooks/Hooks";
import { cloneDeep } from "lodash";
import { ApiClient } from "../../Services/axios";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
const apiClientInstance = ApiClient.getInstance();

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

export const Settings = () => {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [isUpdading, setIsUpdading] = useState<boolean>(false);
  const [voiceSamples, setVoiceSamples] = useState<VoiceSample[]>();
  const [chosenVoiceSample, setChosenVoiceSample] = useState<Voices>(
    loggedUser.voice
  );
  const [shouldSendEpisodeEmail, setShouldSendEpisodeEmail] = useState<boolean>(
    loggedUser.should_send_episode_email
  );
  const [chosenCategories, setChosenCategories] = useState<Categories[]>(
    [...loggedUser.categories] || []
  );
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    getVoiceSamepls();
    hasMounted.current = true;
  }, [voiceSamples]);

  const getVoiceSamepls = async () => {
    const res = await apiClientInstance.getVoiceSamples();
    if (res) {
      setVoiceSamples(res.voice_samples);
    }
  };

  const onClickCategoryHandler = (category: Categories) => {
    const tempCatArr = [...chosenCategories];
    const index = tempCatArr.indexOf(category);
    if (index > -1) {
      // only splice array when item is found
      tempCatArr.splice(index, 1); // 2nd parameter means remove one item only
    } else if (tempCatArr.length < NUM_OF_CATEGORIES) {
      tempCatArr.push(category);
    }
    setChosenCategories(() => tempCatArr);
  };

  const onClickSaveHandler = async () => {
    setIsUpdading(true);
    const userToUpdate = cloneDeep(loggedUser);
    userToUpdate.categories = chosenCategories;
    userToUpdate.should_send_episode_email = shouldSendEpisodeEmail;
    userToUpdate.voice = chosenVoiceSample;
    const updateRes = await apiClientInstance.userUpdate({
      ...userToUpdate,
      num_of_articles: 2,
    });
    if (updateRes.is_success) console.log("user updated");
    setIsUpdading(false);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVoice = event.target.value;
    setChosenVoiceSample(newVoice as Voices);
  };

  useEffect(() => {}, []);

  const settingsContainer = (
    <>
      <div className="categories-wrapper">
        <div>
          <u>Choose your {NUM_OF_CATEGORIES} categories</u>
        </div>

        <Grid
          container
          spacing={{ xs: 1, md: 0 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {categories.map((category, index) => {
            const active = chosenCategories.includes(category);
            const disabled =
              !active && chosenCategories.length === NUM_OF_CATEGORIES;
            return (
              <Grid key={"grid" + index} item xs={1} sm={1} md={4}>
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

        <FormControl
          sx={{
            display: "flex",
            alignContent: "center",
            my: 1,
            maxWidth: "100%",
          }}
        >
          <u>Choose your podcaster</u>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={chosenVoiceSample}
            name="radio-buttons-group"
            value={chosenVoiceSample}
            onChange={handleVoiceChange}
          >
            {voiceSamples &&
              voiceSamples.length > 0 &&
              voiceSamples.map((voiceSample, index) => {
                return (
                  <div
                    key={"voice-sample-" + index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "100%",
                    }}
                  >
                    <FormControlLabel
                      value={voiceSample.name}
                      control={<Radio />}
                      label={voiceSample.name}
                      sx={{ my: 1 }}
                    />
                    <audio
                      style={{ maxWidth: "80%" }}
                      src={voiceSample.url}
                      controls
                      controlsList="nodownload"
                    />
                  </div>
                );
              })}
          </RadioGroup>
        </FormControl>

        <Box sx={{ my: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="should_send_episode_email"
                checked={shouldSendEpisodeEmail}
                onClick={() => setShouldSendEpisodeEmail((prev) => !prev)}
              />
            }
            label="Send me emails when my podcai are ready!"
          />
        </Box>
      </div>
    </>
  );

  const fileSelect = document.getElementById("fileSelect");
  const fileElem = document.getElementById("fileElem");

  if (fileSelect) {
    fileSelect.addEventListener(
      "click",
      (e) => {
        if (fileElem) {
          fileElem.click();
        }
      },
      false
    );
  }

  return (
    <div className="settings-wrapper">
      <Typography variant="h4" component="div">
        Settings
      </Typography>

      {/* <Box sx={{ my: 1 }}>
        upload a profile picture
        <input
          id="fileElem"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <button id="fileSelect" type="button">
          Select some files
        </button>
      </Box> */}

      {settingsContainer}

      <LoadingButton
        variant="contained"
        loading={isUpdading}
        disabled={!(chosenCategories.length === 3)}
        onClick={onClickSaveHandler}
      >
        Save
      </LoadingButton>
    </div>
  );
};
