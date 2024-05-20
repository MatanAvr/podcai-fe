import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import {
  ALL_USERS_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../Consts/consts";
import { minutesInMilliseconds } from "../Utils/Utils";

const apiClientInstance = ApiClient.getInstance();

const useGetAllUsers = () => {
  const getAllUsers = async () => {
    const res = await apiClientInstance.getAllUsers();
    return res.users;
  };

  return useQuery({
    queryKey: [ALL_USERS_QUERY_KEY],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });
};
export default useGetAllUsers;
