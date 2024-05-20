import { Button, Dialog, Stack, Typography } from "@mui/material";

type ArchiveUserModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const ArchiveUserModal = ({
  title,
  message,
  onConfirm,
  onClose,
}: ArchiveUserModalProps) => {
  const confirmHandler = async () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog id="archive-user-dialog" onClose={onClose} open={true}>
      <Stack p={2} gap={2} textAlign={"center"} maxWidth={350}>
        <Typography variant="h6">{title}</Typography>
        <Typography>{message}</Typography>
        <Stack gap={1}>
          <Button variant="contained" color="error" onClick={confirmHandler}>
            Archive
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
