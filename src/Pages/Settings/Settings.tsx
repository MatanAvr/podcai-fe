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
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Switch,
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

  const accountDetailesContainer = (
    <>
      <Typography variant="h5" component="div">
        Account details
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Name
        </Typography>
        <Typography variant="body1" component="div">
          {loggedUser.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          Email address
        </Typography>
        <Typography variant="body1" component="div">
          {loggedUser.email}
        </Typography>
      </Card>
    </>
  );
  const membershipContainer = (
    <>
      <Typography variant="h5" component="div">
        Membership
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Plan
        </Typography>
        <Typography variant="body1" component="div">
          Podcai Basic Plan
        </Typography>
      </Card>
    </>
  );
  const podcastsSettingsContainer = (
    <>
      <Typography variant="h5" component="div">
        Podcasts settings
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 1 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Topics (up to {MAX_NUM_OF_TOPICS})
        </Typography>
        <MultiSelect
          options={topicsList}
          values={chosenTopics}
          changeValuesHandler={changeTopicsHandler}
        />
        <FormControl
          sx={{
            display: "flex",
            alignContent: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary" component="div">
            Podcaster voice
          </Typography>
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
      </Card>
    </>
  );
  const accountSettingsContainer = (
    <>
      <Typography variant="h5" component="div">
        Account details
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Box
          display={"flex"}
          alignItems="center"
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" component="div">
            Send me emails when my podcai are ready
          </Typography>
          <Switch
            checked={shouldSendEpisodeEmail}
            onClick={() => setShouldSendEpisodeEmail((prev) => !prev)}
          />
        </Box>
        <Box
          display={"flex"}
          alignItems="center"
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
        >
          Delete account
          <DeleteUserModal />
        </Box>
      </Card>
    </>
  );

  const settingsContainer = (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      {accountDetailesContainer}
      {membershipContainer}
      {podcastsSettingsContainer}
      {accountSettingsContainer}
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pb: 1,
        maxWidth: "95%",
      }}
    >
      {settingsContainer}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
