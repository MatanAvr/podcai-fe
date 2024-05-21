import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import { ALL_USERS_QUERY_KEY } from "../Consts/consts";

const apiClientInstance = ApiClient.getInstance();

const useDeleteUserById = () => {
  const queryClient = useQueryClient();

  const deleteUserById = async (userId: string) => {
    const res = await apiClientInstance.deleteUserById(userId);
    queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
    return res.is_success;
  };
  return useMutation({
    mutationFn: deleteUserById,
  });
};

export default useDeleteUserById;
