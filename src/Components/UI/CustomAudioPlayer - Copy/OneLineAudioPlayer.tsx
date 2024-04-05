import { Card, Box, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import { AudioProgressBar } from "./AudioProgressBar/AudioProgressBar";
import { formatDurationDisplay } from "../../../Utils/Utils";

interface audioPlayerProps {
  audioUrl: string;
}
type buttonsColorsOptions = "inherit" | "primary";

const buttonsColor: buttonsColorsOptions = "primary";
const timelineStyle = {
  width: "50px",
  display: "flex",
  justifyContent: "center",
};

export const OneLineAudioPlayer = ({ audioUrl }: audioPlayerProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1); // 0-1
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currrentProgress);

  useEnhancedEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
  }, [audioUrl]);

  useEnhancedEffect(() => {
    if (isReady) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isReady]);

  const bufferProgressHandler: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <Card
      id="one-line-audio-player"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 0.5,
      }}
    >
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        src={audioUrl}
        controls
        controlsList="nodownload"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onCanPlay={(e) => {
          e.currentTarget.volume = volume;
          setIsReady(true);
        }}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        onTimeUpdate={(e) => {
          setCurrrentProgress(e.currentTarget.currentTime);
          bufferProgressHandler(e);
        }}
        onProgress={bufferProgressHandler}
      />

      <Box
        sx={{
          p: 0,
          m: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", flex: 1, alignItems: "center", width: "100%" }}
        >
          <IconButton
            sx={{
              py: 0,
              px: 0.5,
            }}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseCircleFilledOutlinedIcon color={buttonsColor} />
            ) : (
              <PlayCircleFilledOutlinedIcon color={buttonsColor} />
            )}
          </IconButton>
          <Typography
            variant="caption"
            sx={timelineStyle}
          >{`${elapsedDisplay}`}</Typography>
          <AudioProgressBar
            duration={duration}
            currentProgress={currrentProgress}
            buffered={buffered}
            customOnChange={(newValue: number) => {
              if (!audioRef.current) return;
              audioRef.current.currentTime = newValue;
              setCurrrentProgress(newValue);
            }}
          />
          <Typography
            variant="caption"
            sx={timelineStyle}
          >{`${durationDisplay}`}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
