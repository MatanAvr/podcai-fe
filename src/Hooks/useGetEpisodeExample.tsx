import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import {
  EPISODE_EXAMPLE_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../Consts/consts";
import { minutesInMilliseconds } from "../Utils/Utils";

const apiClientInstance = ApiClient.getInstance();

const useGetEpisodeExample = () => {
  const getEpisodeExample = async () => {
    const res = await apiClientInstance.getEpisodeExample();
    if (res) {
      return res.url;
    } else return "";
  };

  return useQuery({
    queryKey: [EPISODE_EXAMPLE_QUERY_KEY],
    queryFn: getEpisodeExample,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });
};
export default useGetEpisodeExample;
