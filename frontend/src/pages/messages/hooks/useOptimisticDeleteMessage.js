import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { api } from "@/apis/api";

const useOptimisticDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingMessageId, setDeletingMessageId] = useState(null);
  const dispatch = useDispatch();

  const deleteMessage = useCallback(
    async (id) => {
      const apiEndpoint = `/api/v1/message/delete/${id}`;
      try {
        setLoading(true);
        setDeletingMessageId(id);
        setError(null);

        // Optimistically update the UI immediately
        dispatch({
          type: "MESSAGE_DELETE_OPTIMISTIC",
          payload: { messageId: id },
        });

        const response = await api.del(apiEndpoint);

        if (!response.success) {
          // Revert optimistic update on failure
          dispatch({
            type: "MESSAGE_DELETE_REVERT",
            payload: { messageId: id },
          });
          throw new Error(response.message || "Failed to delete message");
        }

        // Confirm the deletion
        dispatch({
          type: "MESSAGE_DELETE_CONFIRMED",
          payload: { messageId: id },
        });

        return true; // Return success
      } catch (error) {
        console.error("Error deleting message:", error);
        setError(error.message);
        return false; // Return failure
      } finally {
        setLoading(false);
        setDeletingMessageId(null);
      }
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    deletingMessageId,
    deleteMessage,
    clearError,
  };
};

export default useOptimisticDeleteMessage;
