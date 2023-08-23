import { Card, Box, Chip, Rating, IconButton } from "@mui/material";
import _ from "lodash";
import "./CustomAudioPlayer.scss";
import { Episode } from "../../../ConstAndTypes/consts";
import { useRef, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
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

export const CustomAudioPlayer = ({ episode }: audioPlayerProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1); // 0-1
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currrentProgress);

  useEnhancedEffect(() => {
    if (!firstTime) {
      setIsReady(false);
    }
    setFirstTime(false);
  }, [episode]);

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

  return (
    <Card sx={{ p: 1, m: 1, background: "rgba(255,255,255,0.2)" }}>
      <div>{episode.name}</div>
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
      {/* <Box sx={{ display: "flex", alignItems: "center" }}>
        <LoadingButton
          disabled={!isReady}
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          loading={!isReady}
        >
          {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
        </LoadingButton>

        <Box sx={{ display: "flex", flex: 1, height: "20px" }}></Box>
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div className="timeline">{`${elapsedDisplay}/${durationDisplay}`}</div>
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
      <Box
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
    </Card>
  );
};
