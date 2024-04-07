import Typography from "@mui/material/Typography";
import { Alert, Box, TextField } from "@mui/material";
import Footer from "../landing-page/components/Footer";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { isValidEmail } from "../../Utils/Utils";
import { ApiClient } from "../../Services/axios";
import { isAxiosError } from "axios";
import CheckIcon from "@mui/icons-material/Check";

const apiClientInstance = ApiClient.getInstance();

const MAX_MESSSAGE_LENGTH = 400;
const MAX_SUBJECT_LENGTH = 50;
type errorsObject = {
  email: boolean;
  subject: boolean;
  message: boolean;
};
const defaultErrorsObj = { email: false, subject: false, message: false };

export const ContactUs = () => {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sentMessageSuccessfully, setSentMessageSuccessfully] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<errorsObject>(defaultErrorsObj);

  const sendMessageHanlder = async () => {
    setIsLoading(true);
    setErrors(defaultErrorsObj);
    const isEmailValid = isValidEmail(email);
    const isSubjectValid =
      subject.length > 0 && subject.length < MAX_SUBJECT_LENGTH;
    const isMessageValid =
      message.length > 0 && message.length < MAX_MESSSAGE_LENGTH;
    if (!isEmailValid) {
      setErrors((prev) => {
        return { ...prev, email: true };
      });
    }
    if (!isSubjectValid) {
      setErrors((prev) => {
        return { ...prev, subject: true };
      });
    }
    if (!isMessageValid) {
      setErrors((prev) => {
        return { ...prev, message: true };
      });
    }
    if (!isEmailValid || !isMessageValid || !isMessageValid) {
      setIsLoading(false);
      return;
    }

    try {
      const sendMessageSupportRes = await apiClientInstance.sendSupportMessage({
        email,
        subject,
        message,
      });
      if (sendMessageSupportRes.is_success) {
        setSentMessageSuccessfully(true);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (typeof error.response?.data.detail === "string") {
          console.error(error.response?.data.detail);
        } else {
          console.error("General error");
        }
      } else {
        console.error("General error");
      }
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1.5,
      }}
    >
      <Typography variant="h4" component="div" textAlign={"center"} autoFocus>
        Contact Us
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          maxWidth: "90%",
          gap: 1,
        }}
      >
        <Typography variant="h6" component="div" textAlign={"center"} autoFocus>
          What subject can we help you with?
        </Typography>
        <TextField
          type="email"
          label="Email"
          inputMode="email"
          size="small"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <TextField
          type="text"
          label="Subject"
          size="small"
          value={subject}
          onChange={(e) => {
            if (e.target.value.length > MAX_SUBJECT_LENGTH) return;
            setSubject(e.target.value);
          }}
          error={errors.subject}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          size="small"
          value={message}
          onChange={(e) => {
            if (e.target.value.length > MAX_MESSSAGE_LENGTH) return;
            setMessage(e.target.value);
          }}
          helperText={`${message.length}/${MAX_MESSSAGE_LENGTH}`}
          error={errors.message}
        />
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={sendMessageHanlder}
        >
          Send
        </LoadingButton>
        {sentMessageSuccessfully && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Message sent successfully!
          </Alert>
        )}
      </Box>

      <Footer />
    </Box>
  );
};
