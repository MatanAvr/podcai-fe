import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import { ALL_USERS_QUERY_KEY } from "../Consts/consts";

const apiClientInstance = ApiClient.getInstance();

const useArchiveUser = () => {
  const queryClient = useQueryClient();

  const archiveUser = async (userId: number) => {
    console.log("archived user", userId);
    return;
    const res = await apiClientInstance.deleteSupportMessage({
      support_message_id: userId,
    });
    queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
    return res.is_success;
  };
  return useMutation({
    mutationFn: archiveUser,
  });
};

export default useArchiveUser;
