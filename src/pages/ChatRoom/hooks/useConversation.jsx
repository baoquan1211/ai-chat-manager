import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../../services/Chat/ConversationService";

const useConversation = (conversationID) => {
  const useConversationQuery = useQuery({
    queryKey: ["get-conversation", conversationID],
    queryFn: () => getConversation(conversationID),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  return useConversationQuery;
};

export default useConversation;
