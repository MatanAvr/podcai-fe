import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import {
  VOICES_SAMPLES_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../Consts/consts";
import { minutesInMilliseconds } from "../Utils/Utils";

const apiClientInstance = ApiClient.getInstance();

const useGetVoiceSamples = () => {
  const getVoiceSamepls = async () => {
    const res = await apiClientInstance.getVoiceSamples();
    if (res) {
      return res.voice_samples;
    } else return [];
  };
  return useQuery({
    queryKey: [VOICES_SAMPLES_QUERY_KEY],
    queryFn: getVoiceSamepls,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });
};
export default useGetVoiceSamples;
