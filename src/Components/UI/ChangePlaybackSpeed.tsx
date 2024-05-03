import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedIcon from "@mui/icons-material/Speed";
import { Typography } from "@mui/material";
import { playSpeedOptions } from "./BottomAudioPlayer/BottomAudioPlayer";

const speedArr: playSpeedOptions[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

type ChangePlaybackSpeedProps = {
  direction?: "right" | "left" | "up" | "down" | undefined;
  playbackSpeedHandler: (speed: playSpeedOptions) => void;
};

const ChangePlaybackSpeed = ({
  direction,
  playbackSpeedHandler,
}: ChangePlaybackSpeedProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (speed?: playSpeedOptions) => {
    if (speed) {
      playbackSpeedHandler(speed);
    }
    setOpen(false);
  };

  return (
    <Box position={"relative"} height={"40px"} width={"40px"}>
      <SpeedDial
        direction={direction}
        ariaLabel="playback speed"
        sx={{
          position: "absolute",
          bottom: "0%",
          right: "-20%",
          backgroundColor: "transparent",
          boxShadow: "unset",
        }}
        FabProps={{
          size: "small",
          disableRipple: true,
          variant: "circular",
          sx: {
            backgroundColor: "transparent",
            boxShadow: "unset",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        }}
        icon={
          <SpeedDialIcon
            icon={<SpeedIcon fontSize="small" color="primary" />}
            openIcon={<SpeedIcon fontSize="small" color="primary" />}
          />
        }
        onClose={() => handleClose()}
        onOpen={handleOpen}
        open={open}
      >
        {speedArr.map((speed, index) => (
          <SpeedDialAction
            key={`action-${index}`}
            icon={<Typography color={"primary"}>{speed.toString()}</Typography>}
            tooltipTitle={speed.toString()}
            onClick={() => handleClose(speed)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ChangePlaybackSpeed;
