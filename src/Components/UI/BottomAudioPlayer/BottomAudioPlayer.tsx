import { AppBar, Toolbar } from "@mui/material";
import { Box, IconButton, Typography } from "@mui/material";
import { ALL_EPISODES_QUERY_KEY } from "../../../Consts/consts";
import { useRef, useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUp";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { formatDurationDisplay } from "../../../Utils/Utils";
import { useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../../../Api/axios";
import { TEpisode } from "../../../Api/ApiTypesAndConsts";
import { VolumeInput } from "../CustomAudioPlayer/VolumeInput/VolumeInput";
import { AudioProgressBar } from "../OneLineAudioPlayer/AudioProgressBar/AudioProgressBar";

const apiClientInstance = ApiClient.getInstance();

type buttonsColorsOptions = "inherit" | "primary";
type playSpeedOptions = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

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
type BottomAudioPlayerProps = { episode: TEpisode };

const BottomAudioPlayer = ({ episode }: BottomAudioPlayerProps) => {
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
    const change = progressChange === "back" ? -10 : 10;
    if (!audioRef.current) return;
    let newProgress = audioRef.current.currentTime + change;
    if (newProgress < 0) newProgress = 0;
    else if (newProgress > duration) newProgress = duration;
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
    <AppBar
      sx={(theme) => ({
        top: "auto",
        bottom: 0,
        py: 0.5,
        backgroundColor: "transparent",

        outline:
          theme.palette.mode === "light"
            ? "1px solid rgba(0,119,237,1)"
            : "1px solid rgba(255,255,255,0.5)",
      })}
    >
      <Toolbar>
        <>
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
        </>
        <Box
          id="custom-bottom-audio-player"
          display="flex"
          flex={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={{ xs: "none", md: "flex" }}>
            <Typography color={"text.primary"}>{episode.name}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
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
                {playSpeed}
              </Typography>
              <IconButton
                onClick={playbackSpeedHandler}
                color={buttonsColor}
                size="small"
              >
                <ClearRoundedIcon fontSize="small" />
              </IconButton>

              <IconButton onClick={() => changeProgressHandler("back")}>
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
    </AppBar>
  );
};

export default BottomAudioPlayer;
