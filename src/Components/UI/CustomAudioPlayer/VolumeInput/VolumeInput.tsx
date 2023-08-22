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
      sx={{ marginInline: 1 }}
      min={0}
      step={0.05}
      max={1}
      size="small"
      value={volume}
      defaultValue={70}
      aria-label="Small"
      valueLabelDisplay="auto"
      onChange={handleSliderChange}
    />
  );
};
