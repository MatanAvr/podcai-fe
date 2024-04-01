import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppSelector } from "../../../Hooks/Hooks";
import { Box, Card } from "@mui/material";

interface BasicModalProps {
  openModalButtonText: string;
  openModalButtonVariant: "text" | "outlined" | "contained" | undefined;
  openModalButtonColor:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | undefined;
  modalTitle: string;
  modalDescription: string;
  children?: React.ReactElement;
}

export default function BasicModal({
  openModalButtonText,
  openModalButtonVariant,
  openModalButtonColor,
  modalTitle,
  modalDescription,
  children,
}: BasicModalProps) {
  const [open, setOpen] = React.useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: themeMode === "light" ? "black" : "white",
    boxShadow: 24,
    gap: 1,
    p: 2,
  };

  return (
    <div>
      <Button
        variant={openModalButtonVariant}
        color={openModalButtonColor}
        onClick={openHandler}
        size="small"
      >
        {openModalButtonText}
      </Button>
      <Modal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            ...modalStyle,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Button
              onClick={closeHandler}
              size="small"
              sx={{ minWidth: "20px", m: 0, p: 0 }}
            >
              X
            </Button>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description">
            {modalDescription}
          </Typography>
          {children && <>{children}</>}
        </Card>
      </Modal>
    </div>
  );
}
