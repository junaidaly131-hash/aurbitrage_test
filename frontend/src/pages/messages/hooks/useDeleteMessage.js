import { useState, useCallback } from "react";
import { api } from "@/apis/api";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingMessageId, setDeletingMessageId] = useState(null);

  const deleteMessage = useCallback(async (id) => {
    const apiEndpoint = `/api/v1/message/delete/${id}`;
    try {
      setLoading(true);
      setDeletingMessageId(id);
      setError(null);

      const response = await api.del(apiEndpoint);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete message");
      }

      return true; // Return success
    } catch (error) {
      console.error("Error deleting message:", error);
      setError(error.message);
      return false; // Return failure
    } finally {
      setLoading(false);
      setDeletingMessageId(null);
    }
  }, []);

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

export default useDeleteMessage;
