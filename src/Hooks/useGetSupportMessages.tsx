import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import {
  SUPPORT_MESSAGES_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../Consts/consts";
import { minutesInMilliseconds } from "../Utils/Utils";

const apiClientInstance = ApiClient.getInstance();

const useGetSupportMessages = () => {
  const getSupportMessages = async () => {
    const res = await apiClientInstance.getAllSupportMessages();
    return res.support_messages;
  };

  return useQuery({
    queryKey: [SUPPORT_MESSAGES_QUERY_KEY],
    queryFn: getSupportMessages,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });
};
export default useGetSupportMessages;
