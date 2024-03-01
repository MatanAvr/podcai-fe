import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Alert,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Categories,
  INewUser,
  MIN_NAME_LENGTH,
  MIN_PASS_LENGTH,
  NUM_OF_CATEGORIES,
  OTP_LENGTH,
  VoiceSample,
  Voices,
  deleteErrorTimeout,
  sendOtpRequest,
  verifyOtpRequest,
} from "../../ConstAndTypes/consts";
import { ApiClient } from "../../Services/axios";
import { isValidEmail } from "../../Utils/Utils";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import { useAppDispatch } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { setLoggedUser, setAuth } from "../../Features/User/User";
import { isAxiosError } from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

const steps = ["Details", "Verify email", "Personalization"];
const onlyNumbersRegex = /^[0-9]+$/;
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
  const dispatch = useAppDispatch();
  const [newUser, setNewUser] = useState<INewUser>(newUserDefault);
  const [otp, setOtp] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [voiceSamples, setVoiceSamples] = useState<VoiceSample[]>();
  const [chosenVoiceSample, setChosenVoiceSample] = useState<Voices | "">("");
  const [chosenCategories, setChosenCategories] = useState<Categories[]>([]);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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

  const validateEmail = () => {
    let error = "";
    const emailValid = isValidEmail(newUser.email);
    if (!emailValid && newUser.email.length > 0) {
      error = "Invalid email";
      setEmailErr(error);
      setTimeout(() => {
        setEmailErr("");
      }, deleteErrorTimeout);
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
      }}
    >
      <TextField
        id="name"
        label="First name"
        variant="standard"
        onChange={onChange}
        value={newUser.name}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="standard"
        onChange={onChange}
        value={newUser.email}
        onBlur={validateEmail}
        error={emailErr.length > 0 ? true : false}
        helperText={emailErr}
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        onChange={onChange}
        value={newUser.password}
        helperText={`At least ${MIN_PASS_LENGTH} digits`}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );

  const verifyOtpWrapper = (
    <Box sx={{ gap: 2 }}>
      <div>Enter the confirmation code</div>
      <TextField
        id="otp"
        variant="standard"
        label="Enter code"
        onChange={(e) => changeOtpHandler(e)}
        value={otp}
        helperText={`${OTP_LENGTH} digits`}
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

  const settingsContainer = (
    <div>
      <div>
        <u>Choose your {NUM_OF_CATEGORIES} categories</u>
      </div>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {categories.map((category, index) => {
          const active = chosenCategories.includes(category);
          const disabled =
            !active && chosenCategories.length === NUM_OF_CATEGORIES;
          return (
            <Grid key={"category-grid-" + index} xs={2} sm={4} md={4}>
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
                  />
                  <audio
                    src={voiceSample.url}
                    controls
                    controlsList="nodownload"
                    style={{ maxWidth: "80%" }}
                  />
                </div>
              );
            })}
        </RadioGroup>
      </FormControl>

      <Box>
        <FormControlLabel
          control={
            <Checkbox
              id="should_send_episode_email"
              checked={emailNotification}
              onClick={() => setEmailNotification((prev) => !prev)}
            />
          }
          label="Send me emails when my podcai are ready!"
        />
      </Box>
    </div>
  );

  const onClickCategoryHandler = (category: Categories) => {
    const tempCatArr = [...chosenCategories];
    const index = tempCatArr.indexOf(category);
    if (index > -1) {
      tempCatArr.splice(index, 1);
    } else if (tempCatArr.length < NUM_OF_CATEGORIES) {
      tempCatArr.push(category);
    }
    setChosenCategories(() => tempCatArr);
    setNewUser({
      ...newUser,
      categories: tempCatArr,
    });
  };

  const DoneWrapper = <Box>Done</Box>;

  const contentArr = [userDataWrapper, verifyOtpWrapper, settingsContainer];

  const checkIfNextDisabled = () => {
    if (activeStep === 0) {
      // return false;
      return !(
        newUser.name.length > MIN_NAME_LENGTH &&
        isValidEmail(newUser.email) &&
        newUser.password.length >= MIN_PASS_LENGTH
      );
    } else if (activeStep === 1) {
      return !(otp?.length === OTP_LENGTH);
    } else if (activeStep === 2) {
      return !(chosenCategories.length === 3 && chosenVoiceSample !== "");
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
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "80%",
        p: 3,
        gap: 1,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4">Sign up to podcai</Typography>

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
              mt: 1,
              mb: 1,
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

            <Box />
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
          {errorMsg && (
            <Alert sx={{ my: 1 }} severity="error">
              {errorMsg}
            </Alert>
          )}
        </>
      )}
    </Card>
  );
};
