import { Slider } from "@mui/material";
import * as React from "react";

interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
  "--buffered-width": number;
}

interface AudioProgressBarProps {
  duration: number;
  currentProgress: number;
  buffered: number;
  customOnChange: (a: number) => void;
}

export const AudioProgressBar = (props: AudioProgressBarProps) => {
  const { duration, currentProgress, buffered, customOnChange } = props;

  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    customOnChange(newValue as number);
  };

  return (
    <>
      <Slider
        sx={{ marginInline: 1 }}
        min={0}
        step={0.05}
        max={duration}
        size="small"
        value={currentProgress}
        aria-label="Small"
        onChange={handleSliderChange}
        style={progressStyles}
      />
    </>
  );
};
