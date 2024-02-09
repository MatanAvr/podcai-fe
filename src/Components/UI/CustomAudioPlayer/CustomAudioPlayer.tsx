import { Card, Box, Chip, Rating, IconButton, Typography } from "@mui/material";
import _ from "lodash";
import "./CustomAudioPlayer.scss";
import { Episode } from "../../../ConstAndTypes/consts";
import { useRef, useState } from "react";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";
import { LoadingButton } from "@mui/lab";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { VolumeInput } from "./VolumeInput/VolumeInput";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import { AudioProgressBar } from "./ProgressBar/ProgressBar";
import { formatDurationDisplay, isMobile } from "../../../Utils/Utils";

interface audioPlayerProps {
  episode: Episode;
}

type playSpeedOptions = 1 | 1.25 | 1.5 | 1.75 | 2;

export const CustomAudioPlayer = ({ episode }: audioPlayerProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [playSpeed, setPlaySpeed] = useState<playSpeedOptions>(1);
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
  }, [episode]);

  useEnhancedEffect(() => {
    if (isReady) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isReady]);

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
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

  const handleVolumeChange = (volumeValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
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

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  };

  const handleDurationChange = (durationChange: -30 | -10 | 10 | 30) => {
    if (!audioRef.current) return;
    const newProgress = audioRef.current.currentTime + durationChange;
    audioRef.current.currentTime = newProgress;
    setCurrrentProgress(newProgress);
  };

  const handlePlaybackSpeed = () => {
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
      sx={{
        p: 1,
        m: 1,
        background: "rgba(255,255,255,0.2)",
      }}
    >
      <Box sx={{ my: 1 }}>{episode.name}</Box>
      <audio
        ref={audioRef}
        className="audio-track"
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
          handleBufferProgress(e);
        }}
        onProgress={handleBufferProgress}
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
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
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
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="timeline">{`${elapsedDisplay}`}</div>
          {!isMobile() && (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                maxWidth: "60%",
              }}
            >
              <IconButton
                onClick={handleMuteUnmute}
                aria-label={volume === 0 ? "unmute" : "mute"}
              >
                {volume === 0 ? (
                  <VolumeOffRoundedIcon color="primary" />
                ) : (
                  <VolumeDownRoundedIcon color="primary" />
                )}
              </IconButton>
              <VolumeInput
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </Box>
          )}
          <div className="timeline">{`${durationDisplay}`}</div>
        </Box>
      </Box>

      <Box
        sx={{
          p: 0.5,
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={handlePlaybackSpeed} color="primary">
          <Typography>{playSpeed}x</Typography>
        </IconButton>

        <IconButton onClick={() => handleDurationChange(-10)}>
          <Replay10Icon fontSize="medium" color="primary" />
        </IconButton>
        <LoadingButton
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseCircleFilledOutlinedIcon fontSize="large" />
          ) : (
            <PlayCircleFilledOutlinedIcon fontSize="large" />
          )}
        </LoadingButton>
        <IconButton onClick={() => handleDurationChange(10)}>
          <Forward10Icon fontSize="medium" color="primary" />
        </IconButton>

        {isMobile() && (
          <IconButton
            onClick={handleMuteUnmute}
            aria-label={volume === 0 ? "unmute" : "mute"}
          >
            {volume === 0 ? (
              <VolumeOffRoundedIcon color="primary" />
            ) : (
              <VolumeDownRoundedIcon color="primary" />
            )}
          </IconButton>
        )}
      </Box>
    </Card>
  );
};
