import { useState, useCallback } from "react";

const useGetConversation = () => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversation = useCallback(async (chatId, chatType) => {
    const apiEndpoint = `/api/v1/message/conversation/${chatId}?chatType=${chatType}`;
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setConversation(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  return { conversation, loading, fetchConversation };
};

export default useGetConversation;
