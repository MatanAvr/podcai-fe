import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Alert,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import {
  Topics,
  INewUser,
  topicsArray,
  MAX_NUM_OF_TOPICS,
  MIN_NAME_LENGTH,
  MIN_NUM_OF_TOPICS,
  MIN_PASS_LENGTH,
  OTP_LENGTH,
  Voices,
  DELETE_ERROR_TIMEOUT,
  sendOtpRequest,
  verifyOtpRequest,
  VOICE_SAMPLE_SKELETON_WIDTH,
  VOICE_SAMPLE_SKELETON_HEIGHT,
  voicesArray,
  VOICES_SAMPLES_QUERY_KEY,
} from "../../ConstAndTypes/consts";
import { ApiClient } from "../../Services/axios";
import { isValidEmail, minutesInMilliseconds } from "../../Utils/Utils";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../Hooks/Hooks";
import { setLoggedUser, setAuth } from "../../Features/User/User";
import { isAxiosError } from "axios";
import PasswordTextField from "../../Components/UI/PasswordTextField/PasswordTextField";
import MultiSelect from "../../Components/UI/MultiSelect/MultiSelect";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useMyNavigation } from "../../Hooks/useMyNavigation";
import { useQuery } from "@tanstack/react-query";

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

const steps = ["Details", "Verify", "Settings"];
const onlyNumbersRegex = /^[0-9]+$/;

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();
  const [newUser, setNewUser] = useState<INewUser>(newUserDefault);
  const [otp, setOtp] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [chosenVoiceSample, setChosenVoiceSample] = useState<Voices | "">("");
  const [chosenTopics, setChosenTopics] = useState<Topics[]>([]);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

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
    staleTime: minutesInMilliseconds(10),
  });

  const validateEmail = () => {
    let error = "";
    const emailValid = isValidEmail(newUser.email);
    if (!emailValid && newUser.email.length > 0) {
      error = "Invalid email";
      setEmailErr(error);
      setTimeout(() => {
        setEmailErr("");
      }, DELETE_ERROR_TIMEOUT);
    } else {
    }
    if (error !== "") {
      return false;
    }
    setEmailErr(error);
    return true;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setNewUser({
      ...newUser,
      [key]: value,
    });
  };

  const changeTopicsHandler = (newTopics: Topics[]) => {
    setChosenTopics(() => newTopics);
  };

  const isStepOptional = (step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setErrorMsg("");
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      sendOtp();
      return;
    } else if (activeStep === 1) {
      verifyOtp();
      return;
    } else if (activeStep === 2) {
      signupHandler();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const userDataWrapper = (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0.5, width: "auto" },
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <TextField
        id="name"
        label="First name"
        variant="outlined"
        size="small"
        onChange={onChange}
        value={newUser.name}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        inputMode="email"
        variant="outlined"
        size="small"
        onChange={onChange}
        value={newUser.email}
        onBlur={validateEmail}
        error={emailErr.length > 0 ? true : false}
        helperText={emailErr}
        required
      />
      <PasswordTextField
        id="password"
        label="Password"
        variant="outlined"
        size="small"
        onChange={onChange}
        value={newUser.password}
        helperText={`At least ${MIN_PASS_LENGTH} digits`}
        required
      />
    </Box>
  );

  const verifyOtpWrapper = (
    <Box sx={{ gap: 2 }}>
      <Typography>{`Verificaion code was send to ${newUser.email}`}</Typography>
      <Typography>Enter the code</Typography>
      <TextField
        id="otp"
        variant="outlined"
        size="small"
        onChange={(e) => changeOtpHandler(e)}
        value={otp}
        placeholder={`${OTP_LENGTH} digits`}
        required
      />
    </Box>
  );

  const sendOtp = async () => {
    try {
      setLoading(true);
      const sendOtpReqObj: sendOtpRequest = {
        name: newUser.name,
        send_to: newUser.email,
        method: "EMAIL",
        otp_reason: "SIGN_UP",
      };
      const sendOtpRes = await apiClientInstance.sendOtp(sendOtpReqObj);
      if (sendOtpRes.is_success) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (typeof error.response?.data.detail === "string") {
          setErrorMsg(error.response?.data.detail);
        } else {
          setErrorMsg("General error");
        }
      } else {
        setErrorMsg("General error");
      }
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const verifyOtpReqObj: verifyOtpRequest = {
        send_to: newUser.email,
        otp: otp,
      };
      const verifyOtpRes = await apiClientInstance.verifyOtp(verifyOtpReqObj);
      if (verifyOtpRes.is_success) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (typeof error.response?.data.detail === "string") {
          setErrorMsg(error.response?.data.detail);
        } else {
          setErrorMsg("General error");
        }
      } else {
        setErrorMsg("General error");
      }
    }
    setLoading(false);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVoice = event.target.value;
    setChosenVoiceSample(newVoice as Voices);
  };

  useEffect(() => {
    if (chosenVoiceSample === "") return;
    setNewUser({
      ...newUser,
      voice: chosenVoiceSample,
    });
  }, [chosenVoiceSample]);

  useEffect(() => {
    setNewUser({
      ...newUser,
      should_send_episode_email: emailNotification,
    });
  }, [emailNotification]);

  const settingsWrapper = (
    <Box
      id="settings-wrapper"
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      maxWidth={"90%"}
    >
      <div>
        <u>Choose up to {MAX_NUM_OF_TOPICS} topics</u>
      </div>

      <MultiSelect
        options={topicsArray}
        values={chosenTopics}
        changeValuesHandler={changeTopicsHandler}
      />

      <FormControl
        sx={{
          display: "flex",
          alignContent: "center",
          maxWidth: "100%",
        }}
      >
        <u>Choose your podcaster</u>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={chosenVoiceSample}
          name="radio-buttons-group"
          value={chosenVoiceSample}
          onChange={handleVoiceChange}
          sx={{ gap: 0.1 }}
        >
          {voiceSamples
            ? voiceSamples.length > 0 &&
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
                    <audio
                      style={{ maxWidth: "60%" }}
                      src={voiceSample.url}
                      controls
                      controlsList="nodownload"
                    />
                  </Box>
                );
              })
            : voicesArray.map((voice, index) => {
                return (
                  <Skeleton
                    key={`voice-skeleton-${index}`}
                    variant="rounded"
                    width={VOICE_SAMPLE_SKELETON_WIDTH}
                    height={VOICE_SAMPLE_SKELETON_HEIGHT}
                  />
                );
              })}
        </RadioGroup>
      </FormControl>

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
          checked={emailNotification}
          onClick={() => setEmailNotification((prev) => !prev)}
        />
      </Box>
    </Box>
  );

  const contentArr = [userDataWrapper, verifyOtpWrapper, settingsWrapper];

  const checkIfNextDisabled = () => {
    if (activeStep === 0) {
      return !(
        newUser.name.length > MIN_NAME_LENGTH &&
        isValidEmail(newUser.email) &&
        newUser.password.length >= MIN_PASS_LENGTH
      );
    } else if (activeStep === 1) {
      return !(otp?.length === OTP_LENGTH);
    } else if (activeStep === 2) {
      return !(
        chosenTopics.length >= MIN_NUM_OF_TOPICS &&
        chosenTopics.length <= MAX_NUM_OF_TOPICS &&
        chosenVoiceSample !== ""
      );
    }
  };

  const changeOtpHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const valid =
      value === "" ||
      (onlyNumbersRegex.test(value) && value.length <= OTP_LENGTH);
    if (valid) setOtp(value);
  };

  const signupHandler = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const signUpRes = await apiClientInstance.signUp(newUser);
      if (signUpRes.access_token) {
        const token = signUpRes.access_token;
        const userToLogIn = signUpRes;
        dispatch(setLoggedUser({ newLoggeduser: userToLogIn }));
        dispatch(setAuth({ newMode: true, token }));
        nav.push("Home");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (typeof error.response?.data.detail === "string") {
          setErrorMsg(error.response?.data.detail);
        } else {
          setErrorMsg("General error");
        }
      } else {
        setErrorMsg("General error");
      }
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "95%",
        gap: 2,
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <LockRoundedIcon color="primary" fontSize="large" />
        <Typography variant="h4">Sign up</Typography>
      </Stack>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%" }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {contentArr[activeStep]}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
            >
              Back
            </Button>

            {isStepOptional(activeStep) && (
              <Button onClick={handleSkip} sx={{ mr: 1 }} variant="contained">
                Skip
              </Button>
            )}

            <LoadingButton
              onClick={handleNext}
              disabled={checkIfNextDisabled()}
              loading={loading}
              variant="contained"
            >
              {activeStep === steps.length - 1
                ? "Activate my account"
                : activeStep === 0
                ? "Verify Email"
                : "Next"}
            </LoadingButton>
          </Box>
          {activeStep === 0 && (
            <Box mt={1}>
              Already have an account?&nbsp;
              <Link
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  nav.push("Login");
                }}
              >
                Log in
              </Link>
            </Box>
          )}
          {errorMsg && (
            <Alert sx={{ my: 1 }} severity="error">
              {errorMsg}
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};
