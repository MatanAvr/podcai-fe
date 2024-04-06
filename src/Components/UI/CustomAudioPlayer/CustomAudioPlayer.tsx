import { Card, Box, IconButton, Typography } from "@mui/material";
import { ALL_EPISODES_QUERY_KEY, Episode } from "../../../ConstAndTypes/consts";
import { useRef, useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { VolumeInput } from "./VolumeInput/VolumeInput";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUp";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { AudioProgressBar } from "./AudioProgressBar/AudioProgressBar";
import { formatDurationDisplay, isMobile } from "../../../Utils/Utils";
import { useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../../../Services/axios";

const apiClientInstance = ApiClient.getInstance();
const mobile = isMobile();

interface audioPlayerProps {
  episode: Episode;
}
type buttonsColorsOptions = "inherit" | "primary";
type playSpeedOptions = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

const buttonsColor: buttonsColorsOptions = "primary";
const timelineStyle = {
  width: "50px",
  display: "flex",
  justifyContent: "center",
};

const dynamicVolumeIconButton = (
  volume: number,
  muteUnmuteHandler: any,
  size: "small" | "medium" | "large"
) => {
  return (
    <IconButton
      onClick={muteUnmuteHandler}
      aria-label={volume === 0 ? "unmute" : "mute"}
      size={size}
    >
      {volume === 0 ? (
        <VolumeOffRoundedIcon color={buttonsColor} fontSize={size} />
      ) : volume < 0.5 ? (
        <VolumeDownRoundedIcon color={buttonsColor} fontSize={size} />
      ) : (
        <VolumeUpRoundedIcon color={buttonsColor} fontSize={size} />
      )}
    </IconButton>
  );
};

export const CustomAudioPlayer = ({ episode }: audioPlayerProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [playSpeed, setPlaySpeed] = useState<playSpeedOptions>(1);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [sentIsCompleted, setSentIsCompleted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1); // 0-1
  const [volumeBeforeUnmute, setVolumeBeforeUnmute] = useState(1); // 0-1
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const episodeDuration = formatDurationDisplay(duration);
  const elapsedTime = formatDurationDisplay(currrentProgress);
  const queryClient = useQueryClient();

  useEnhancedEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
    setSentIsCompleted(false);
  }, [episode]);

  useEnhancedEffect(() => {
    if (isReady) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isReady]);

  useEnhancedEffect(() => {
    if (!episode.is_completed && !sentIsCompleted) {
      checkIfEpisodeCompleted();
    }
  }, [elapsedTime]);

  const checkIfEpisodeCompleted = async () => {
    if (Math.ceil((currrentProgress / duration) * 100) > 90) {
      setSentIsCompleted(() => true);
      const markEpisodeAsCompleted = await apiClientInstance.episodeCompleted({
        episode_name: episode.name,
      });
      if (markEpisodeAsCompleted) {
        queryClient.invalidateQueries({ queryKey: [ALL_EPISODES_QUERY_KEY] });
      }
    }
  };

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

  const volumeChangeHandler = (volumeValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
    setVolumeBeforeUnmute(volumeValue);
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

  const muteUnmuteHandler = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      volumeChangeHandler(volumeBeforeUnmute);
    }
  };

  const durationChangeHandler = (durationChange: -10 | 10) => {
    if (!audioRef.current) return;
    const newProgress = audioRef.current.currentTime + durationChange;
    audioRef.current.currentTime = newProgress;
    setCurrrentProgress(newProgress);
  };

  const playbackSpeedHandler = () => {
    if (!audioRef.current) return;
    let localPlaySpeed: playSpeedOptions = 1;
    switch (playSpeed) {
      case 1:
        localPlaySpeed = 1.25;
        break;
      case 1.25:
        localPlaySpeed = 1.5;
        break;
      case 1.5:
        localPlaySpeed = 1.75;
        break;
      case 1.75:
        localPlaySpeed = 2;
        break;
      case 2:
        localPlaySpeed = 1;
        break;
    }
    setPlaySpeed(localPlaySpeed);
    audioRef.current.playbackRate = localPlaySpeed;
  };

  return (
    <Card
      id="Custom-Audio-Player"
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 1,
        px: 0.5,
        overflow: "visible",
        border: 1,
        borderColor: "primary.main",
      }}
    >
      <Typography variant="h6" sx={{ my: 0.5, marginInlineStart: 1 }}>
        {episode.name}
      </Typography>
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        src={episode.link}
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
          p: 0.1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", flex: 1, alignItems: "center", width: "100%" }}
        >
          <Typography sx={timelineStyle}>{`${elapsedTime}`}</Typography>

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
          <Typography sx={timelineStyle}>{`${episodeDuration}`}</Typography>
        </Box>
      </Box>

      <Box
        id="custom-audio-player-buttons-wrapper"
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* used to align to center */}
        {!mobile && <Box sx={{ display: "flex", flex: 1 }} />}
        <Box
          id="custom-audio-player-buttons-container"
          sx={{
            display: "flex",

            flex: 1,
            justifyContent: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={playbackSpeedHandler}
            color={buttonsColor}
            size="small"
          >
            <Typography variant="body2">{playSpeed}</Typography>
            <ClearRoundedIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={() => durationChangeHandler(-10)}>
            <Replay10RoundedIcon fontSize="large" color={buttonsColor} />
          </IconButton>

          <IconButton
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseCircleFilledOutlinedIcon
                fontSize="large"
                color={buttonsColor}
              />
            ) : (
              <PlayCircleFilledOutlinedIcon
                fontSize="large"
                color={buttonsColor}
              />
            )}
          </IconButton>

          <IconButton onClick={() => durationChangeHandler(10)}>
            <Forward10RoundedIcon fontSize="large" color={buttonsColor} />
          </IconButton>

          {dynamicVolumeIconButton(volume, muteUnmuteHandler, "medium")}
        </Box>
        {!mobile && (
          <>
            <Box
              id="volume-slider-wrapper"
              sx={{
                display: "flex",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <VolumeInput
                  volume={volume}
                  onVolumeChange={volumeChangeHandler}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};
