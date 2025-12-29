import { useState } from "react";

const useDeleteComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const deleteComment = async (commentId) => {
    setIsLoading(true);
    setSuccess(false);

    try {
      const apiEndpoint = `/api/v1/post/comment/delete/${commentId}`;

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const res = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const response = await res.json();

      if (!response.success) {
        const errorMessage =
          response.message || response.data || "Failed to delete comment";
        throw new Error(errorMessage);
      }

      setSuccess(true);
      return response;
    } catch (error) {
      console.error("ERROR deleting comment: ", error);

      let errorMessage = "An error occurred while deleting the comment.";

      // Handle different types of errors
      if (error.name === "AbortError") {
        errorMessage = "Delete operation timed out. Please try again.";
      } else if (
        error.name === "TypeError" &&
        error.message.includes("fetch")
      ) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          errorMessage = "Please log in and try again.";
        } else if (statusCode === 403) {
          errorMessage = "You are not authorized to delete this comment.";
        } else if (statusCode === 404) {
          errorMessage = "Comment not found.";
        } else if (statusCode === 500) {
          errorMessage = "Internal Server Error. Please try again later.";
        } else {
          const data = error.response.data?.data;
          if (data) {
            const errorDetails = Object.values(data).find(
              (detail) => detail !== undefined,
            );
            errorMessage = errorDetails ? String(errorDetails) : errorMessage;
          }
        }
      } else {
        errorMessage = `Error in request: ${error.message}`;
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deleteComment, success };
};

export default useDeleteComment;
