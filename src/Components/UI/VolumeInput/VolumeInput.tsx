import { Slider } from "@mui/material";

interface VolumeInputProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeInput = (props: VolumeInputProps) => {
  const { volume, onVolumeChange } = props;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onVolumeChange(newValue as number);
  };

  return (
    <Slider
      sx={{ marginInline: 2, display: "flex", flex: 1, minWidth: 100 }}
      min={0}
      step={0.05}
      max={1}
      size="small"
      value={volume}
      aria-label="Small"
      valueLabelDisplay="auto"
      onChange={handleSliderChange}
      valueLabelFormat={Math.round(volume * 100).toString()}
    />
  );
};
