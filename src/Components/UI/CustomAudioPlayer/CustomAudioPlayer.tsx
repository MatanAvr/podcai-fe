import { Card, Box, Chip, Rating, IconButton } from "@mui/material";
import _ from "lodash";
import "./CustomAudioPlayer.scss";
import { Episode } from "../../../ConstAndTypes/consts";
import { useEffect, useRef, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Forward10Icon from "@mui/icons-material/Forward10";
import Forward30Icon from "@mui/icons-material/Forward30";
import Replay10Icon from "@mui/icons-material/Replay10";
import Replay30Icon from "@mui/icons-material/Replay30";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { LoadingButton } from "@mui/lab";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { VolumeInput } from "./VolumeInput/VolumeInput";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import { AudioProgressBar } from "./ProgressBar/ProgressBar";
import { formatDurationDisplay } from "../../../Utils/Utils";

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

  useEffect(() => {});

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
          p: 0.5,
          display: "flex",
          alignItems: "center",
          // border: "1px solid white",
          // borderRadius: "10px",
        }}
      >
        <LoadingButton
          disabled={!isReady}
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          loading={!isReady}
        >
          {isPlaying ? (
            <PauseRoundedIcon fontSize="large" />
          ) : (
            <PlayArrowRoundedIcon fontSize="large" />
          )}
        </LoadingButton>

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
          <div className="timeline">{`${elapsedDisplay}/${durationDisplay}`}</div>
        </Box>

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
        <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
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
        <IconButton>
          <SkipPreviousIcon fontSize="large" color="primary" />
        </IconButton>

        <IconButton onClick={handlePlaybackSpeed} color="primary">
          {playSpeed}x
        </IconButton>
        <IconButton onClick={() => handleDurationChange(-30)}>
          <Replay30Icon fontSize="large" color="primary" />
        </IconButton>
        <IconButton onClick={() => handleDurationChange(-10)}>
          <Replay10Icon fontSize="large" color="primary" />
        </IconButton>
        <IconButton onClick={() => handleDurationChange(10)}>
          <Forward10Icon fontSize="large" color="primary" />
        </IconButton>
        <IconButton onClick={() => handleDurationChange(30)}>
          <Forward30Icon fontSize="large" color="primary" />
        </IconButton>
        <IconButton>
          <SkipNextIcon fontSize="large" color="primary" />
        </IconButton>
      </Box>
      {/* <Box sx={{ display: "flex", alignItems: "center" }}>
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
        <div className="timeline">{`${elapsedDisplay}/${durationDisplay}`}</div>
      </Box> */}

      {/* Rating */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          my: 0.5,
        }}
      >
        <Rating
          sx={
            {
              // border: "1px solid gold",
              // height: "min-content",
              // alignSelf: "center",
              // justifySelf: "center",
              // width: "100%",
            }
          }
          name="episode-rating"
          value={null}
        />
      </Box> */}

      {/* //episode categories */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {episode.categories.map((category, index) => (
          <Chip
            key={"CatChip" + index}
            label={_.capitalize(category)}
            size="small"
            sx={{ mx: 0.5 }}
            variant="outlined"
          />
        ))}
      </Box> */}
    </Card>
  );
};
