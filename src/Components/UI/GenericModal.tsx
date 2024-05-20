import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useState } from "react";

type ConfirmDeleteModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const GenericModal = ({
  title,
  message,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const confirmHandler = async () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog id="confirm-delete-dialog" onClose={onClose} open={true}>
      <Stack p={2} gap={2} textAlign={"center"} maxWidth={350}>
        <Typography variant="h6">{title}</Typography>
        <Typography>{message}</Typography>
        <Stack gap={1}>
          <LoadingButton
            variant="contained"
            color="warning"
            onClick={confirmHandler}
            loading={isLoading}
          >
            Delete
          </LoadingButton>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
