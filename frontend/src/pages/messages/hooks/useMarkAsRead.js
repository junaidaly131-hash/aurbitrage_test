import { useState, useCallback } from "react";

const useMarkAsRead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiEndpoint = `/api/v1/message/mark-read`;

  const markAsRead = useCallback(
    async (conversationId, chatType, messageIds = null) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId,
            chatType,
            messageIds,
          }),
          credentials: "include",
        });

        const result = await response.json();

        if (!result.success) {
          setError(result.message || "Failed to mark messages as read");
          return false;
        }

        setLoading(false);
        return true;
      } catch (error) {
        console.error("Error marking messages as read:", error);
        setError("Error marking messages as read");
        setLoading(false);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint],
  );

  return { markAsRead, loading, error };
};

export default useMarkAsRead;
