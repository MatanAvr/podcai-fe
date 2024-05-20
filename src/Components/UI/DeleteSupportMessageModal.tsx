import { Button, Dialog, Stack, Typography } from "@mui/material";

type ConfirmDeleteModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteSupportMessageModal = ({
  title,
  message,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) => {
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
          <Button variant="contained" color="error" onClick={confirmHandler}>
            Delete
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
