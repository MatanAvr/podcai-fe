import { Fab, Skeleton, Toolbar } from "@mui/material";
import { Box, IconButton, Typography } from "@mui/material";
import {
  ALL_EPISODES_QUERY_KEY,
  BOTTOM_PLAYER_HEIGHT_DESKTOP,
  BOTTOM_PLAYER_HEIGHT_MOBILE,
  PRIMARY_COLOR_RGBA_BORDER,
} from "../../../Consts/consts";
import { useRef, useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUp";
import { formatDurationDisplay, isMobile } from "../../../Utils/Utils";
import { useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../../../Api/axios";
import { TEpisode } from "../../../Api/ApiTypesAndConsts";
import { VolumeInput } from "../VolumeInput/VolumeInput";
import { AudioProgressBar } from "../OneLineAudioPlayer/AudioProgressBar/AudioProgressBar";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ChangePlaybackSpeed from "../ChangePlaybackSpeed";
import { TPlaySpeedOptions } from "../../../Types/Types";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useStoreHooks";
import { setPlaySpeedConfig } from "../../../Features/Config";

const mobile = isMobile();

type BottomAudioPlayerProps = {
  episode: TEpisode | undefined;
  isLoadingEpisodes: boolean;
};
type buttonsColorsOptions = "inherit" | "primary";

const apiClientInstance = ApiClient.getInstance();
const buttonsColor: buttonsColorsOptions = "primary";
const timelineStyle = {
  width: "50px",
  display: "flex",
  justifyContent: "center",
  color: "text.primary",
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

const BottomAudioPlayer = ({
  episode,
  isLoadingEpisodes,
}: BottomAudioPlayerProps) => {
  const playbackSpeed = useAppSelector((state) => state.config.playbackSpeed);
  const dispatch = useAppDispatch();
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
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

  const keyDownHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        if (!audioRef.current) return;
        changeVolumeHandler(audioRef.current.volume - 0.05);
        break;
      case "ArrowUp":
        if (!audioRef.current) return;
        changeVolumeHandler(audioRef.current.volume + 0.05);
        break;
      case "ArrowLeft":
        changeProgressHandler("back");
        break;
      case "ArrowRight":
        changeProgressHandler("forward");
        break;
      case " ":
        togglePlayPause();
        break;
      case "m":
      case "M":
        toggleMuteUnmute();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        jumpToHandler(Number(e.key));
        break;
      default:
        return;
    }
  };

  useEnhancedEffect(() => {
    if (mobile) return;
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [isPlaying, volume, volumeBeforeUnmute]);

  useEnhancedEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
    setSentIsCompleted(false);
  }, [episode]);

  useEnhancedEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEnhancedEffect(() => {
    if (isReady) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isReady]);

  useEnhancedEffect(() => {
    if (!episode) return;
    const currentDurationInPercentage = Math.ceil(
      (currrentProgress / duration) * 100
    );
    setProgress(currentDurationInPercentage);
  }, [elapsedTime]);

  useEnhancedEffect(() => {
    if (!episode) return;
    if (!episode.is_completed && !sentIsCompleted && progress === 100) {
      checkIfEpisodeCompleted();
    }
    if (!episode.is_completed && progress > 0 && progress % 10 === 0) {
      trackEpisodeProgress();
    }
  }, [progress]);

  const checkIfEpisodeCompleted = async () => {
    if (!episode) return;
    setSentIsCompleted(() => true);
    const markEpisodeAsCompleted = await apiClientInstance.episodeCompleted({
      episode_name: episode.name,
    });
    if (markEpisodeAsCompleted) {
      queryClient.invalidateQueries({ queryKey: [ALL_EPISODES_QUERY_KEY] });
    }
  };

  const trackEpisodeProgress = () => {
    if (!episode) return;
    apiClientInstance.updateEpisodeProgress({
      progress: progress,
      episode_name: episode.name,
    });
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

  const changeVolumeHandler = (newVolume: number) => {
    if (!audioRef.current) return;
    if (newVolume < 0) newVolume = 0;
    else if (newVolume > 1) newVolume = 1;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setVolumeBeforeUnmute(newVolume);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(() => false);
    } else {
      audioRef.current.play();
      setIsPlaying(() => true);
    }
  };

  const toggleMuteUnmute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      changeVolumeHandler(volumeBeforeUnmute);
    }
  };

  const changeProgressHandler = (progressChange: "back" | "forward") => {
    if (!audioRef.current) return;
    const change = progressChange === "back" ? -10 : 10;
    let newProgress = audioRef.current.currentTime + change;
    if (newProgress < 0) newProgress = 0;
    else if (newProgress > duration) newProgress = duration;
    audioRef.current.currentTime = newProgress;
    setCurrrentProgress(newProgress);
  };

  const playbackSpeedHandler = (speed: TPlaySpeedOptions) => {
    dispatch(setPlaySpeedConfig(speed));
  };

  const jumpToHandler = (jumpTo: number) => {
    if (!audioRef.current) return;
    if (jumpTo < 0 || jumpTo > 9) return;
    const newProgress = duration * (jumpTo / 10);
    audioRef.current.currentTime = newProgress;
    setCurrrentProgress(newProgress);
  };

  if (isLoadingEpisodes) {
    return (
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={BOTTOM_PLAYER_HEIGHT_DESKTOP}
      />
    );
  }

  return (
    <Box
      id="buttom-audio-player-wrapper"
      height={{
        xs: BOTTOM_PLAYER_HEIGHT_MOBILE,
        md: BOTTOM_PLAYER_HEIGHT_DESKTOP,
      }}
      maxHeight={{
        xs: BOTTOM_PLAYER_HEIGHT_MOBILE,
        md: BOTTOM_PLAYER_HEIGHT_DESKTOP,
      }}
      sx={{
        width: "100%",
        outline: `1px solid ${PRIMARY_COLOR_RGBA_BORDER}`,
      }}
      py={1}
    >
      <Toolbar>
        {episode && (
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
        )}

        <Box
          id="custom-bottom-audio-player"
          display="flex"
          flex={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          pb={{ xs: 2, md: 0 }}
        >
          <Box display={{ xs: "none", md: "flex" }}>
            <Typography color={"text.primary"}>
              {episode?.name || ""}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column-reverse", md: "column" }}
            alignItems="center"
            flex={1}
          >
            <Box
              id="custom-audio-player-buttons-container"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <Typography variant="body2" color={"primary"}>
                x{playbackSpeed}
              </Typography>

              <ChangePlaybackSpeed
                playbackSpeedHandler={playbackSpeedHandler}
              />

              <IconButton onClick={() => changeProgressHandler("back")}>
                <Replay10RoundedIcon fontSize="large" color={buttonsColor} />
              </IconButton>

              <Fab
                color="primary"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <PauseRoundedIcon fontSize="large" />
                ) : (
                  <PlayArrowRoundedIcon fontSize="large" />
                )}
              </Fab>

              <IconButton onClick={() => changeProgressHandler("forward")}>
                <Forward10RoundedIcon fontSize="large" color={buttonsColor} />
              </IconButton>

              {dynamicVolumeIconButton(volume, toggleMuteUnmute, "small")}
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              width={"100%"}
              maxWidth={600}
              flex={1}
            >
              <Typography
                variant="body2"
                sx={timelineStyle}
              >{`${elapsedTime}`}</Typography>

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
                variant="body2"
                sx={timelineStyle}
              >{`${episodeDuration}`}</Typography>
            </Box>
          </Box>

          <Box
            id="custom-audio-player-buttons-wrapper"
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            justifyContent="center"
            maxWidth={500}
          >
            <Box id="volume-slider-wrapper" flex={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <VolumeInput
                  volume={volume}
                  onVolumeChange={changeVolumeHandler}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default BottomAudioPlayer;
