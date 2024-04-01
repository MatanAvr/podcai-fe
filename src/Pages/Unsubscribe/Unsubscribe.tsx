import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { isValidEmail } from "../../Utils/Utils";
import { ApiClient } from "../../Services/axios";
import { Alert, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { DELETE_ERROR_TIMEOUT } from "../../ConstAndTypes/consts";

const apiClientInstance = ApiClient.getInstance();

export const Unsubscribe = () => {
  const [emailToUnsubscribe, setEmailToUnsubscribe] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unsubscribedSuccessfully, setUnsubscribedSuccessfully] =
    useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailToUnsubscribe(e.target.value);
  };

  const onClickUnsubscribeHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    //validate fields
    const validEmail = validateEmail();
    if (!validEmail) return;
    setIsLoading(true);
    try {
      const unsubscribeRes = await apiClientInstance.unsubscribe({
        email: emailToUnsubscribe,
      });
      if (unsubscribeRes) {
        setUnsubscribedSuccessfully(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const validateEmail = (): boolean => {
    const emailIsValid = isValidEmail(emailToUnsubscribe);
    if (!emailIsValid) {
      setEmailErr("Invalid email");
      setTimeout(() => {
        setEmailErr("");
      }, DELETE_ERROR_TIMEOUT);
      return false;
    } else {
      setEmailErr("");
      return true;
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        width: "auto",
        maxWidth: "90%",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        variant="h4"
        component="div"
        textAlign={"center"}
        width={"max-content"}
      >
        Unsubscribe
      </Typography>
      <Typography
        variant="h5"
        component="div"
        textAlign={"center"}
        width={"max-content"}
      >
        You will be missed!
      </Typography>
      <TextField
        id="email"
        label="Email"
        inputMode="email"
        variant="outlined"
        size="small"
        onChange={onChange}
        onBlur={validateEmail}
        value={emailToUnsubscribe}
        error={emailErr.length > 0 ? true : false}
        helperText={emailErr}
        sx={{ my: 1, pb: 1 }}
      />
      <LoadingButton
        variant="contained"
        onClick={onClickUnsubscribeHandler}
        loading={isLoading}
      >
        Unsubscribe
      </LoadingButton>
      {unsubscribedSuccessfully && (
        <Alert
          icon={<SentimentVeryDissatisfiedIcon fontSize="inherit" />}
          severity="info"
        >
          You have successfully unsubscribe!
        </Alert>
      )}
    </Box>
  );
};
