import { useEffect, useState } from "react";
import {
  Topics,
  topicsArray,
  Voices,
  MAX_NUM_OF_TOPICS,
  VOICE_SAMPLE_SKELETON_WIDTH,
  VOICE_SAMPLE_SKELETON_HEIGHT,
  voicesArray,
  DEFAULT_AUTO_HIDE_DURATION,
  VOICES_SAMPLES_QUERY_KEY,
  DEFAULT_STALE_TIME_MINUTES,
} from "../../ConstAndTypes/consts";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { cloneDeep } from "lodash";
import { ApiClient } from "../../Services/axios";
import {
  Avatar,
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteUserModal from "../../Components/UI/DeleteUserModal/DeleteUserModal";
import MultiSelect from "../../Components/UI/MultiSelect/MultiSelect";
import { useMyNavigation } from "../../Hooks/useMyNavigation";
import { updateLoggedUser } from "../../Features/User/User";
import CustomizedSnackbars from "../../Components/UI/CustomizedSnackbars/CustomizedSnackbars";
import { useQuery } from "@tanstack/react-query";
import { minutesInMilliseconds } from "../../Utils/Utils";
import { OneLineAudioPlayer } from "../../Components/UI/OneLineAudioPlayer/OneLineAudioPlayer";

const apiClientInstance = ApiClient.getInstance();

export const Settings = () => {
  const dispatch = useAppDispatch();
  const [userUpdatedSuccessfully, setUserUpdatedSuccessfully] = useState(false);
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [isUpdading, setIsUpdading] = useState<boolean>(false);
  const [chosenVoice, setChosenVoice] = useState<Voices>(loggedUser.voice);
  const [shouldSendEpisodeEmail, setShouldSendEpisodeEmail] = useState<boolean>(
    loggedUser.should_send_episode_email
  );
  const [chosenTopics, setChosenTopics] = useState<Topics[]>(
    loggedUser.categories
  );
  const nav = useMyNavigation();

  const getVoiceSamepls = async () => {
    const res = await apiClientInstance.getVoiceSamples();
    if (res) {
      return res.voice_samples;
    } else return [];
  };

  const { data: voiceSamples } = useQuery({
    queryKey: [VOICES_SAMPLES_QUERY_KEY],
    queryFn: getVoiceSamepls,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_STALE_TIME_MINUTES),
  });

  useEffect(() => {
    setChosenTopics(loggedUser.categories);
    setShouldSendEpisodeEmail(loggedUser.should_send_episode_email);
    setChosenVoice(loggedUser.voice);
  }, [
    loggedUser.categories,
    loggedUser.should_send_episode_email,
    loggedUser.voice,
  ]);

  const changeTopicsHandler = (newTopics: Topics[]) => {
    setChosenTopics(() => newTopics);
  };

  const onClickSaveHandler = async () => {
    setIsUpdading(true);
    const userToUpdate = cloneDeep(loggedUser);
    userToUpdate.categories = chosenTopics;
    userToUpdate.should_send_episode_email = shouldSendEpisodeEmail;
    userToUpdate.voice = chosenVoice;
    const updateRes = await apiClientInstance.userUpdate({
      ...userToUpdate,
      num_of_articles: 2,
    });
    if (updateRes.is_success) {
      dispatch(updateLoggedUser({ updatedUser: userToUpdate }));
      setUserUpdatedSuccessfully(true);
      setTimeout(() => {
        setUserUpdatedSuccessfully(false);
      }, DEFAULT_AUTO_HIDE_DURATION);
    }
    setIsUpdading(false);
  };

  const onClickBackHandler = async () => {
    nav.push("Home");
  };

  const voiceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVoice = event.target.value;
    setChosenVoice(newVoice as Voices);
  };

  const accountDetailesContainer = (
    <>
      <Typography variant="h5" component="div">
        Account details
      </Typography>
      <Card
        sx={{
          display: "flex",
          p: 2,
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 0.5,
          }}
        >
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 100, height: 100 }} />
        </Box>
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
          options={topicsArray}
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
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={chosenVoice}
            name="radio-buttons-group"
            value={chosenVoice}
            onChange={voiceChangeHandler}
            sx={{ gap: 0.1 }}
          >
            {voiceSamples ? (
              voiceSamples.length > 0 &&
              voiceSamples.map((voiceSample, index) => {
                return (
                  <Box
                    key={"voice-sample-" + index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxWidth: "100%",
                    }}
                  >
                    <FormControlLabel
                      value={voiceSample.name}
                      control={<Radio />}
                      label={voiceSample.name}
                    />
                    <OneLineAudioPlayer audioUrl={voiceSample.url} />
                  </Box>
                );
              })
            ) : (
              <Box display={"flex"} flexDirection={"column"} gap={0.1}>
                {voicesArray.map((voice, index) => {
                  return (
                    <Skeleton
                      key={`voice-skeleton-${index}`}
                      variant="rounded"
                      width={VOICE_SAMPLE_SKELETON_WIDTH}
                      height={VOICE_SAMPLE_SKELETON_HEIGHT}
                    />
                  );
                })}
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
      id="settings-page-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: "95%",
      }}
    >
      {settingsContainer}

      <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <LoadingButton
          variant="contained"
          size="small"
          loading={isUpdading}
          disabled={
            !(chosenTopics.length && chosenTopics.length <= MAX_NUM_OF_TOPICS)
          }
          onClick={onClickSaveHandler}
        >
          Save
        </LoadingButton>

        <LoadingButton
          size="small"
          sx={{ mx: 1 }}
          variant="contained"
          onClick={onClickBackHandler}
        >
          Back
        </LoadingButton>
      </Box>
      {userUpdatedSuccessfully && (
        <CustomizedSnackbars text={"Account updated successfully"} />
      )}
    </Box>
  );
};
