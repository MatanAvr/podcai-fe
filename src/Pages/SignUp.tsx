import { ChangeEvent, ReactNode } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Divider,
  Icon,
  Link,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import {
  topicsArray,
  MAX_NUM_OF_TOPICS,
  MIN_NAME_LENGTH,
  MIN_NUM_OF_TOPICS,
  MIN_PASS_LENGTH,
  OTP_LENGTH,
  DELETE_ERROR_TIMEOUT,
} from "../Consts/consts";
import { ApiClient } from "../Api/axios";
import { isOnlyPositiveNumbers, isValidEmail } from "../Utils/Utils";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../Hooks/useStoreHooks";
import { setLoggedUser, setAuth } from "../Features/User";
import { isAxiosError } from "axios";
import MultiSelect from "../Components/UI/MultiSelect";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useMyNavigation } from "../Hooks/useMyNavigation";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import googleIconSvg from "../Assets/Svg/google-icon.svg";
import { cloneDeep } from "lodash";
import { PasswordTextField } from "../Components/UI/PasswordTextField";
import { PodcastersVoices } from "../Components/UI/PodcastersVoices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { sendOtpRequest, verifyOtpRequest } from "../Api/ApiTypesAndConsts";
import { INewUser, TVoices, TTopics } from "../Types/Types";
import { SuscirptionEnum, RoleEnum } from "../Enums/Enums";
import useGetVoiceSamples from "../Hooks/useGetVoiceSamples";

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
  subscription: SuscirptionEnum.Basic,
  profile_pic: "",
  role: RoleEnum.User,
};

const steps = ["Details", "Verify", "Settings"];
const lastStep = steps.length - 1;

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();
  const googleSignUpEnabled = useAppSelector(
    (state) => state.featuresToggle.googleSignUpEnabled
  );
  const [newUser, setNewUser] = useState<INewUser>(newUserDefault);
  const [otp, setOtp] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [chosenVoice, setChosenVoice] = useState<TVoices>();
  const [chosenTopics, setChosenTopics] = useState<TTopics[]>([]);
  const [shouldSendEpisodeEmail, setShouldSendEpisodeEmail] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGoogleSignUp, setLoadingGoogleSignUp] =
    useState<boolean>(false);
  const [userGoogleToken, setUserGoogleToken] = useState<TokenResponse>();

  const { data: voiceSamples } = useGetVoiceSamples();

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setNewUser({
      ...newUser,
      [key]: value,
    });
  };

  const changeTopicsHandler = (newTopics: TTopics[]) => {
    console.log(newTopics);
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
    } else if (activeStep === lastStep) {
      signUpHandler();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{ gap: 1 }}
      alignItems={"center"}
    >
      <Typography textAlign={"center"}>
        {`Verificaion code was send to:`}
        <br />
        {`${newUser.email}`}
      </Typography>
      <TextField
        id="otp"
        variant="outlined"
        label={`Enter the ${OTP_LENGTH} digits code`}
        size="small"
        onChange={(e) => changeOtpHandler(e)}
        value={otp}
        placeholder={`Enter the ${OTP_LENGTH} digits code`}
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

  const changeVoiceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newVoice = event.target.value;
    setChosenVoice(newVoice as TVoices);
  };

  useEffect(() => {
    if (!chosenVoice) return;
    setNewUser({
      ...newUser,
      voice: chosenVoice,
    });
  }, [chosenVoice]);

  useEffect(() => {
    setNewUser({
      ...newUser,
      should_send_episode_email: shouldSendEpisodeEmail,
    });
  }, [shouldSendEpisodeEmail]);

  const settingsWrapper = (
    <Box
      id="settings-wrapper"
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      maxWidth={"90%"}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Typography>Choose up to {MAX_NUM_OF_TOPICS} topics</Typography>
        {chosenTopics.length > 0 ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <CheckCircleIcon color="disabled" fontSize="small" />
        )}
      </Box>

      <MultiSelect
        options={topicsArray}
        values={chosenTopics}
        changeValuesHandler={changeTopicsHandler}
      />

      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Typography>Choose your podcaster</Typography>
        {chosenVoice ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <CheckCircleIcon color="disabled" fontSize="small" />
        )}
      </Box>
      <PodcastersVoices
        chosenVoice={chosenVoice}
        changeVoiceHandler={changeVoiceHandler}
        voiceSamples={voiceSamples}
      />

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
          checked={shouldSendEpisodeEmail}
          onClick={() => setShouldSendEpisodeEmail((prev) => !prev)}
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
    } else if (activeStep === lastStep) {
      return !(
        chosenTopics.length >= MIN_NUM_OF_TOPICS &&
        chosenTopics.length <= MAX_NUM_OF_TOPICS &&
        chosenVoice
      );
    }
  };

  const changeOtpHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const valid =
      value === "" ||
      (isOnlyPositiveNumbers(value) && value.length <= OTP_LENGTH);
    if (valid) setOtp(value);
  };

  const signUpHandler = async () => {
    setErrorMsg("");
    setLoading(true);
    // validate fields
    const userToSignUp = cloneDeep(newUser);
    userToSignUp.categories = chosenTopics;
    userToSignUp.voice = chosenVoice || "Aria";
    try {
      const signUpRes = await apiClientInstance.signUp(userToSignUp);
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

  const googleSignUpHandler = useGoogleLogin({
    onNonOAuthError: (nonAuthErr) => {
      console.error(nonAuthErr.type);
    },
    onSuccess: (tokenResponse) => {
      setUserGoogleToken(tokenResponse);
    },
    onError: (errorRespondse) =>
      console.error("googleSignUpHandler error:", errorRespondse),
  });

  useEffect(() => {
    if (userGoogleToken) {
      updateNewUser(userGoogleToken);
    }
  }, [userGoogleToken]);

  const updateNewUser = async (userToken: TokenResponse) => {
    setLoadingGoogleSignUp(true);
    try {
      const googleUser = await apiClientInstance.getGoogleUser(
        userToken.access_token
      );
      const newUserClone = cloneDeep(newUser);
      newUserClone.email = googleUser.email;
      newUserClone.name = googleUser.given_name;
      setNewUser(() => newUserClone);
      setActiveStep(lastStep);
    } catch (err) {
      console.error("updateNewUser error:", err);
    } finally {
      setLoadingGoogleSignUp(false);
    }
  };

  return (
    <Box
      id="sign-up-page-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "95%",
        gap: 2,
        minWidth: 270,
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
            optional?: ReactNode;
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
        <></>
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

            <LoadingButton
              onClick={handleNext}
              disabled={checkIfNextDisabled()}
              loading={loading}
              variant="contained"
              color={activeStep === lastStep ? "success" : "primary"}
            >
              {activeStep === lastStep
                ? "Activate my account"
                : activeStep === 0
                ? "Verify Email"
                : "Next"}
            </LoadingButton>
          </Box>
          {activeStep === 0 && (
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              {googleSignUpEnabled && (
                <>
                  <Divider>
                    <Typography variant="caption" textAlign={"center"}>
                      Or sign up with
                    </Typography>
                  </Divider>

                  <LoadingButton
                    loading={loadingGoogleSignUp}
                    onClick={() => googleSignUpHandler()}
                    variant="outlined"
                    startIcon={
                      <Icon
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          height: 25,
                          width: 25,
                        }}
                      >
                        <img
                          style={{ height: "100%", width: "100%" }}
                          src={googleIconSvg}
                          draggable={false}
                          alt="google logo"
                        />
                      </Icon>
                    }
                  >
                    Google
                  </LoadingButton>
                </>
              )}

              <Box>
                <Typography>
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
                </Typography>
              </Box>
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
