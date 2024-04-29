import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Box, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  MIN_PASS_LENGTH,
  OTP_LENGTH,
  DELETE_ERROR_TIMEOUT,
} from "../ConstAndTypes/consts";
import { ApiClient } from "../Services/axios";
import { isValidEmail } from "../Utils/Utils";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { isAxiosError } from "axios";
import { useMyNavigation } from "../Hooks/useMyNavigation";
import { PasswordTextField } from "../Components/UI/PasswordTextField";
import {
  sendOtpRequest,
  verifyOtpRequest,
} from "../ConstAndTypes/ApiTypesAndConsts";

const apiClientInstance = ApiClient.getInstance();

const steps = ["Enter email", "Verify OTP", "Change password"];
const onlyNumbersRegex = /^[0-9]+$/;

export const ForgotPassword = () => {
  const nav = useMyNavigation();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = () => {
    let error = "";
    const emailValid = isValidEmail(email);
    if (!emailValid && email.length > 0) {
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

  const handleNext = () => {
    setErrorMsg("");
    if (activeStep === 0) {
      sendOtp();
      return;
    } else if (activeStep === 1) {
      verifyOtp();
      return;
    } else if (activeStep === 2) {
      changePasswordHandler();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const moveToLoginPage = () => {
    nav.push("Login");
  };

  const userDataWrapper = (
    <>
      <Typography>We'll email you a confirmation code</Typography>
      <TextField
        id="email"
        type="email"
        inputMode="email"
        variant="outlined"
        size="small"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        onBlur={validateEmail}
        error={emailErr.length > 0 ? true : false}
        helperText={emailErr}
        placeholder="example@domain.com"
        required
      />
    </>
  );

  const verifyOtpWrapper = (
    <>
      <Typography>Enter the confirmation code</Typography>
      <TextField
        id="otp"
        variant="outlined"
        size="small"
        onChange={(e) => changeOtpHandler(e)}
        value={otp}
        placeholder={`${OTP_LENGTH} digits`}
        required
      />
    </>
  );

  const changePasswordWrapper = (
    <>
      <Typography>Enter new password</Typography>
      <PasswordTextField
        id={"new password input"}
        label={""}
        placeholder="New password"
        helperText={`At least ${MIN_PASS_LENGTH} digits`}
        variant="outlined"
        size="small"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
        required
      />
    </>
  );

  const sendOtp = async () => {
    try {
      setLoading(true);
      const sendOtpReqObj: sendOtpRequest = {
        name: "",
        send_to: email,
        method: "EMAIL",
        otp_reason: "PASSWORD",
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
        send_to: email,
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

  const contentArr = [userDataWrapper, verifyOtpWrapper, changePasswordWrapper];

  const checkIfNextDisabled = () => {
    // return false;
    if (activeStep === 0) {
      return !isValidEmail(email);
    } else if (activeStep === 1) {
      return !(otp?.length === OTP_LENGTH);
    } else if (activeStep === 2) {
      return !(newPassword.length >= MIN_PASS_LENGTH);
    }
  };

  const changeOtpHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const valid =
      value === "" ||
      (onlyNumbersRegex.test(value) && value.length <= OTP_LENGTH);
    if (valid) {
      setOtp(value);
    }
  };

  const changePasswordHandler = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const updatePasswordRes = await apiClientInstance.updatePassword({
        email,
        new_password: newPassword,
      });
      if (updatePasswordRes.is_success) {
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

  return (
    <Box
      id="forgot-password-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        maxWidth: "80%",
        width: "auto",
        gap: 1,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4">Forgot password</Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%" }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label + index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Password updated successfully!
            </Alert>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" onClick={moveToLoginPage}>
              Login
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              flex: 1,
              width: "90%",
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {contentArr[activeStep]}
            </Box>
          </Box>

          <Box
            id="navigation-buttons"
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

            <LoadingButton
              onClick={handleNext}
              disabled={checkIfNextDisabled()}
              loading={loading}
              variant="contained"
            >
              {activeStep === steps.length - 1
                ? "Change password"
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
    </Box>
  );
};
