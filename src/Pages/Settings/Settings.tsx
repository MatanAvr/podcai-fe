import { useEffect, useRef, useState } from "react";
import {
  Topics,
  topicsList,
  VoiceSample,
  Voices,
  MAX_NUM_OF_TOPICS,
  VOICE_SAMPLE_SKELETON_WIDTH,
  VOICE_SAMPLE_SKELETON_HEIGHT,
} from "../../ConstAndTypes/consts";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { cloneDeep } from "lodash";
import { ApiClient } from "../../Services/axios";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import { moveToPage } from "../../Features/Navigation/Navigation";
import DeleteUserModal from "../../Components/UI/DeleteUserModal/DeleteUserModal";
import MultiSelect from "../../Components/UI/MultiSelect/MultiSelect";

const apiClientInstance = ApiClient.getInstance();

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
  const [chosenTopics, setChosenTopics] = useState<Topics[]>(
    [...loggedUser.categories] || []
  );
  const hasMounted = useRef(false);
  const dispatch = useAppDispatch();

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

  const changeTopicsHandler = (newTopics: Topics[]) => {
    setChosenTopics(() => newTopics);
  };

  const onClickSaveHandler = async () => {
    setIsUpdading(true);
    const userToUpdate = cloneDeep(loggedUser);
    userToUpdate.categories = chosenTopics;
    userToUpdate.should_send_episode_email = shouldSendEpisodeEmail;
    userToUpdate.voice = chosenVoiceSample;
    const updateRes = await apiClientInstance.userUpdate({
      ...userToUpdate,
      num_of_articles: 2,
    });
    if (updateRes.is_success) {
      console.log("User updated");
      // reload page or update loggedUser data
    }
    setIsUpdading(false);
  };

  const onClickBackHandler = async () => {
    dispatch(moveToPage("Home"));
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVoice = event.target.value;
    setChosenVoiceSample(newVoice as Voices);
  };

  const settingsContainer = (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <u>Choose up to {MAX_NUM_OF_TOPICS} topics</u>

      <MultiSelect
        options={topicsList}
        values={chosenTopics}
        changeValuesHandler={changeTopicsHandler}
      />
      <FormControl
        sx={{
          display: "flex",
          alignContent: "center",
          my: 0,
          maxWidth: "100%",
          gap: 0.5,
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
          {voiceSamples ? (
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
                    sx={{ my: 0.5 }}
                  />
                  <audio
                    style={{ maxWidth: "80%" }}
                    src={voiceSample.url}
                    controls
                    controlsList="nodownload"
                  />
                </div>
              );
            })
          ) : (
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Skeleton
                variant="rounded"
                width={VOICE_SAMPLE_SKELETON_WIDTH}
                height={VOICE_SAMPLE_SKELETON_HEIGHT}
              />
              <Skeleton
                variant="rounded"
                width={VOICE_SAMPLE_SKELETON_WIDTH}
                height={VOICE_SAMPLE_SKELETON_HEIGHT}
              />
            </Box>
          )}
        </RadioGroup>
      </FormControl>
      <Box>
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
      <Box></Box>
      <DeleteUserModal />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        maxWidth: "85%",
      }}
    >
      <Typography variant="h4" component="div">
        Settings
      </Typography>

      {settingsContainer}
      <Box>
        <LoadingButton
          variant="contained"
          loading={isUpdading}
          disabled={
            !(chosenTopics.length && chosenTopics.length <= MAX_NUM_OF_TOPICS)
          }
          onClick={onClickSaveHandler}
        >
          Save
        </LoadingButton>

        <LoadingButton
          sx={{ mx: 1 }}
          variant="contained"
          onClick={onClickBackHandler}
        >
          Back
        </LoadingButton>
      </Box>
    </Box>
  );
};
