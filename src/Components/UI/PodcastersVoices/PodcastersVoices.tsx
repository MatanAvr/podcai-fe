import {
  FormControl,
  RadioGroup,
  Box,
  FormControlLabel,
  Radio,
  Skeleton,
} from "@mui/material";
import {
  voicesArray,
  VOICE_SAMPLE_SKELETON_WIDTH,
  VOICE_SAMPLE_SKELETON_HEIGHT,
  Voices,
  VoiceSample,
} from "../../../ConstAndTypes/consts";
import { OneLineAudioPlayer } from "../OneLineAudioPlayer/OneLineAudioPlayer";

interface PodcastersVoicesProps {
  chosenVoice: Voices | undefined;
  changeVoiceHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  voiceSamples: VoiceSample[] | undefined;
}

export const PodcastersVoices = ({
  chosenVoice,
  changeVoiceHandler,
  voiceSamples,
}: PodcastersVoicesProps) => {
  return (
    <FormControl
      sx={{
        display: "flex",
        alignContent: "center",
      }}
    >
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={chosenVoice}
        name="radio-buttons-group"
        value={chosenVoice}
        onChange={changeVoiceHandler}
        sx={{ gap: 0.1 }}
      >
        {voiceSamples ? (
          voiceSamples.length > 0 &&
          voiceSamples.map((voiceSample, index) => {
            return (
              <Box
                key={"voice-sample-" + index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  maxWidth: "100%",
                }}
              >
                <FormControlLabel
                  value={voiceSample.name}
                  control={<Radio size="small" />}
                  label={voiceSample.name}
                />
                <OneLineAudioPlayer audioUrl={voiceSample.url} />
              </Box>
            );
          })
        ) : (
          <Box display={"flex"} flexDirection={"column"} gap={0.1}>
            {voicesArray.map((voice, index) => {
              return (
                <Skeleton
                  key={`voice-skeleton-${index}`}
                  variant="rounded"
                  width={VOICE_SAMPLE_SKELETON_WIDTH}
                  height={VOICE_SAMPLE_SKELETON_HEIGHT}
                />
              );
            })}
          </Box>
        )}
      </RadioGroup>
    </FormControl>
  );
};
