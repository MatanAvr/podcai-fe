import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppSelector } from "../../Hooks/useStoreHooks";
import { Card, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);
  const themeColor = useAppSelector((state) => state.theme.themeColor);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    maxWidth: "85%",
    bgcolor: "background.paper",
    color: themeColor === "light" ? "black" : "white",
    boxShadow: 24,
    gap: 1,
    p: 2,
  };

  return (
    <>
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
          <IconButton
            onClick={closeHandler}
            size="small"
            sx={{ alignSelf: "start", p: 0 }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
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
    </>
  );
}
