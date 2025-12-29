import { useState, useCallback } from "react";

const useRemoveReaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const removeReaction = useCallback(async (reactionId) => {
    try {
      const apiEndpoint = `/api/v1/message/reaction/remove/${reactionId}`;
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.message || "Failed to remove reaction");
        return;
      }

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || "Failed to remove reaction");
      }
    } catch (error) {
      console.error("Error removing reaction:", error);
      setError("Error removing reaction");
    } finally {
      setLoading(false);
    }
  }, []);

  return { removeReaction, loading, error, success };
};

export default useRemoveReaction;
