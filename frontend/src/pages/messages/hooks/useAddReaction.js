import { useState, useCallback } from "react";

const useAddReaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const apiEndpoint = `/api/v1/message/reaction/add`;

  const addReaction = useCallback(
    async (messageId, reaction, chatType) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageId, reaction, chatType }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorResult = await response.json();
          setError(errorResult.message || "Failed to send reaction");
          return;
        }

        const result = await response.json();

        if (result.success) {
          setSuccess(true);
        } else {
          setError(result.message || "Failed to send reaction");
        }
      } catch (error) {
        console.error("Error sending reaction:", error);
        setError("Error sending reaction");
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint],
  );

  return { addReaction, loading, error, success };
};

export default useAddReaction;
