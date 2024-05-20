import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography } from "@mui/material";
import BasicModal from "./BasicModal";

const FILES_INPUT_ID = "files_input";
const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2 megabyte
export default function UploadProfilePicModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidSize, setIsValidSize] = useState<boolean>(false);
  const [isValidType, setIsValidType] = useState<boolean>(false);

  const uploadProfilePicHandler = async () => {
    setIsLoading(true);
    try {
      const filesInputEl = document.querySelector(
        `input[id="${FILES_INPUT_ID}"]`
      ) as HTMLInputElement;
      if (!filesInputEl) {
        console.error("The is no file input element");
        return;
      }
      console.log(filesInputEl);
      const files = filesInputEl.files;
      if (!files) {
        console.error("There is no files");
        return;
      }
      console.log(files);
      const file = files[0];
      if (!file) {
        console.error("There is no file");
        return;
      }
      assertFileValid(file);
    } catch (err) {
      console.error("uploadProfilePicHandler error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const assertFileValid = (file: File) => {
    const allowedTypes = ["image/webp", "image/jpeg", "image/png"];

    const { name: fileName, size: fileSize, type: fileType } = file;

    if (!allowedTypes.includes(fileType)) {
      console.error(
        `❌ File "${fileName}" could not be uploaded. Only images with the following types are allowed: WEBP, JPEG, PNG.`
      );
      setIsValidType(false);
    } else {
      setIsValidType(true);
    }

    if (fileSize > FILE_SIZE_LIMIT) {
      console.error(
        `❌ File "${fileName}" could not be uploaded. Only images up to ${FILE_SIZE_LIMIT} MB are allowed.`
      );
      setIsValidSize(false);
    } else {
      setIsValidSize(true);
    }
  };

  return (
    <BasicModal
      openModalButtonText="Change"
      openModalButtonVariant="outlined"
      openModalButtonColor="primary"
      modalTitle="Upload profile picture"
      modalDescription="images type, up tp 2MB"
    >
      <>
        <input
          id={FILES_INPUT_ID}
          name="file"
          type="file"
          multiple={false}
          accept="image/jpeg, image/png"
          onChange={(e) => {
            e.preventDefault();
            console.log(e.target.files);
            uploadProfilePicHandler();
          }}
        />

        <Box display={"flex"} alignItems={"center"} gap={1}>
          <CheckCircleRoundedIcon
            color={isValidSize ? "primary" : "disabled"}
            fontSize="small"
          />
          <Typography>Valid size: less than 2mb</Typography>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={1}>
          <CheckCircleRoundedIcon
            color={isValidType ? "primary" : "disabled"}
            fontSize="small"
          />
          <Typography>Image type</Typography>
        </Box>

        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={uploadProfilePicHandler}
            fullWidth
          >
            Upload
          </LoadingButton>
        </Box>
      </>
    </BasicModal>
  );
}
