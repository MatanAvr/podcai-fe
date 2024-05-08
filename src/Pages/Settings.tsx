import { useEffect, useState } from "react";
import {
  topicsArray,
  MAX_NUM_OF_TOPICS,
  DEFAULT_AUTO_HIDE_DURATION,
  VOICES_SAMPLES_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../Consts/consts";
import { useAppSelector, useAppDispatch } from "../Hooks/useStoreHooks";
import { cloneDeep } from "lodash";
import { ApiClient } from "../Api/axios";
import { Avatar, Box, Card, Switch, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteUserModal from "../Components/UI/DeleteUserModal";
import MultiSelect from "../Components/UI/MultiSelect";
import { useMyNavigation } from "../Hooks/useMyNavigation";
import { updateLoggedUser } from "../Features/User";
import CustomizedSnackbars from "../Components/UI/CustomizedSnackbars";
import { useQuery } from "@tanstack/react-query";
import { minutesInMilliseconds } from "../Utils/Utils";
import { PodcastersVoices } from "../Components/UI/PodcastersVoices";
import UploadProfilePicModal from "../Components/UI/UploadProfilePicModal";
import { TVoices, TTopics } from "../Types/Types";

const apiClientInstance = ApiClient.getInstance();

export const Settings = () => {
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();
  const uploadProfilePicEnabled = useAppSelector(
    (state) => state.featuresToggle.uploadProfilePicEnabled
  );
  const [userUpdatedSuccessfully, setUserUpdatedSuccessfully] = useState(false);
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const [isUpdading, setIsUpdading] = useState<boolean>(false);
  const [chosenVoice, setChosenVoice] = useState<TVoices>(loggedUser.voice);
  const [shouldSendEpisodeEmail, setShouldSendEpisodeEmail] = useState<boolean>(
    loggedUser.should_send_episode_email
  );
  const [chosenTopics, setChosenTopics] = useState<TTopics[]>(
    loggedUser.categories
  );

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
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
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

  const changeTopicsHandler = (newTopics: TTopics[]) => {
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

  const changeVoiceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVoice = event.target.value;
    setChosenVoice(newVoice as TVoices);
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
          justifyContent: "space-between",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          gap={2}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Name
            </Typography>
            <Typography component="div">{loggedUser.name}</Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Email address
            </Typography>
            <Typography component="div">{loggedUser.email}</Typography>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={loggedUser.profile_pic || ""}
          />
          {uploadProfilePicEnabled && <UploadProfilePicModal />}
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
        <Typography component="div">
          Podcai {loggedUser.subscription} Plan
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
        <Typography variant="caption" color="text.secondary" component="div">
          Podcaster voice
        </Typography>
        <PodcastersVoices
          chosenVoice={chosenVoice}
          changeVoiceHandler={changeVoiceHandler}
          voiceSamples={voiceSamples}
        />
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
          <Typography component="div">
            Send me emails when my podcai are ready
          </Typography>
          <Switch
            size="small"
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
        width: "100%",
        gap: 1,
        maxWidth: { xs: "95%", md: "60%" },
        pb: 4,
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
