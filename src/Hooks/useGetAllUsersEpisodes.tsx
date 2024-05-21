import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import { DEFAULT_QUERY_DATA_STALE_TIME_MINUTES } from "../Consts/consts";
import { minutesInMilliseconds } from "../Utils/Utils";

const apiClientInstance = ApiClient.getInstance();

const useGetAllUsersEpisodes = (userId: string) => {
  const getAllUsersEpisodes = async () => {
    const res = await apiClientInstance.getAllUserEpisodes(userId);
    return res.episodes_data.reverse();
  };

  return useQuery({
    queryKey: [userId],
    queryFn: getAllUsersEpisodes,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });
};
export default useGetAllUsersEpisodes;
