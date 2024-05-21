import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import {
  EPISODES_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../Consts/consts";
import { minutesInMilliseconds } from "../Utils/Utils";

const apiClientInstance = ApiClient.getInstance();

const useGetEpisodes = () => {
  const getEpisodes = async () => {
    const res = await apiClientInstance.getEpisodes();
    return res.episodes;
  };

  return useQuery({
    queryKey: [EPISODES_QUERY_KEY],
    queryFn: getEpisodes,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });
};
export default useGetEpisodes;
