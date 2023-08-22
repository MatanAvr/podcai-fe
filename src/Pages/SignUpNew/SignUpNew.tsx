import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Categories,
  INewUser,
  MIN_NAME_LENGTH,
  MIN_PASS_LENGTH,
  OTP_LENGTH,
  VoiceSample,
  Voices,
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

const apiClientInstance = ApiClient.getInstance();
const numOfCategoriesToChoose = 3;

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

const steps = ["Details", "Verify email", "Sign-up!"];
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
export const SignUpNew = () => {
  const [newUser, setNewUser] = useState<INewUser>(newUserDefault);
  const [otp, setOtp] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [voiceSamples, setVoiceSamples] = useState<VoiceSample[]>();
  const [chosenVoiceSample, setChosenVoiceSample] = useState<Voices | "">("");
  const [chosenCategories, setChosenCategories] = useState<Categories[]>([]);
  const [dailyNotification, setDailyNotification] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
        "& .MuiTextField-root": { mb: 2, width: "auto" },
        display: "flex",
        flexDirection: "column",
      }}
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
        helperText={`At least ${MIN_PASS_LENGTH} digits`}
      />
    </Box>
  );

  const verifyOtpWrapper = (
    <Box>
      <div>Enter the one time password</div>
      <TextField
        id="otp"
        label="Otp"
        variant="standard"
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
        console.log("send succses");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err as string);
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
        console.log("verified");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (err) {
      console.log(err);
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
      should_send_episode_email: dailyNotification,
    });
  }, [dailyNotification]);

  const categoriesContainer = (
    <>
      <div className="categories-wrapper">
        <div>
          <u>Choose your top {numOfCategoriesToChoose} favorite categories:</u>
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
              <Grid key={"grid" + index} item xs={2} sm={4} md={4}>
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

        <div>
          <FormControl>
            <u>Voice options:</u>
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
                      key={"div" + index}
                      style={{ display: "flex", alignContent: "center" }}
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
                      />
                    </div>
                  );
                })}
            </RadioGroup>
          </FormControl>
        </div>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                id="should_send_episode_email"
                checked={dailyNotification}
                onClick={() => setDailyNotification((prev) => !prev)}
              />
            }
            label="Send me an email when my podcai us ready!"
          />
        </Box>
      </div>
    </>
  );

  const onClickCategoryHandler = (category: Categories) => {
    const tempCatArr = [...chosenCategories];
    const index = tempCatArr.indexOf(category);
    if (index > -1) {
      tempCatArr.splice(index, 1);
    } else if (tempCatArr.length < numOfCategoriesToChoose) {
      tempCatArr.push(category);
    }
    setChosenCategories(() => tempCatArr);
    setNewUser({
      ...newUser,
      categories: tempCatArr,
    });
  };

  const DoneWrapper = <Box>Done</Box>;

  const contentArr = [userDataWrapper, verifyOtpWrapper, categoriesContainer];

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
      return !(chosenCategories.length === 3);
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
    } catch (err) {
      setErrorMsg("Sign up error, please try again!");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "60%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
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
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* //--------------------------------- */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mb: 1,
              width: "80%",
              height: "80%",
            }}
          >
            {contentArr[activeStep]}
          </Box>
          {/* //--------------------------------- */}
          <div
            className="error"
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            {errorMsg}
          </div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <LoadingButton
              onClick={handleNext}
              disabled={checkIfNextDisabled()}
              loading={loading}
            >
              {activeStep === steps.length - 1
                ? "Sign up!"
                : activeStep === 0
                ? "Verify Email"
                : "Next"}
            </LoadingButton>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
