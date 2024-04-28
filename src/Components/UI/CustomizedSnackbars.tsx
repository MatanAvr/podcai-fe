import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DEFAULT_AUTO_HIDE_DURATION } from "../../ConstAndTypes/consts";

interface CustomizedSnackbarsProps {
  text: string;
  autoHideDuration?: number;
}

export default function CustomizedSnackbars({
  text,
  autoHideDuration = DEFAULT_AUTO_HIDE_DURATION,
}: CustomizedSnackbarsProps) {
  const [open, setOpen] = React.useState(true);

  const closeHandler = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={closeHandler}
      >
        <Alert onClose={closeHandler} severity="success" sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
