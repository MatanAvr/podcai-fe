import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../Api/axios";
import { SUPPORT_MESSAGES_QUERY_KEY } from "../Consts/consts";

const apiClientInstance = ApiClient.getInstance();

const useDeleteSupportMessage = () => {
  const queryClient = useQueryClient();

  const deleteSupportMessage = async (messageId: number) => {
    const res = await apiClientInstance.deleteSupportMessage({
      support_message_id: messageId,
    });
    queryClient.invalidateQueries({ queryKey: [SUPPORT_MESSAGES_QUERY_KEY] });
    return res.is_success;
  };
  return useMutation({
    mutationFn: deleteSupportMessage,
  });
};

export default useDeleteSupportMessage;
