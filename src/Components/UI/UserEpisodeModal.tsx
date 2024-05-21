import { Box, Dialog } from "@mui/material";
import EpisodesTable from "../../Pages/AdminDashboard/EpisodesTable";
import useGetAllUsersEpisodes from "../../Hooks/useGetAllUsersEpisodes";
import LoadingSpinner from "./LoadingSpinner";

type UserEpisodeModalProps = {
  userId: string;
  username: string;
  onClose: () => void;
};

export default function UserEpisodeModal({
  userId,
  username,
  onClose,
}: UserEpisodeModalProps) {
  const { data: episodes, isLoading: isLoadingEpisodes } =
    useGetAllUsersEpisodes(userId);

  return (
    <Dialog id="user-episodes-modal" onClose={onClose} open={true}>
      <Box p={2}>
        {isLoadingEpisodes && <LoadingSpinner />}
        {episodes && <EpisodesTable username={username} episodes={episodes} />}
      </Box>
    </Dialog>
  );
}
