import { useState } from "react";
import axios from "axios";

const useUpdateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateComment = async (id, body, updateComments) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("body", body);
      const apiEndpoint = `/api/v1/post/comment/update/${id}`;

      const response = await axios.patch(apiEndpoint, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header
        },
      });

      if (!response.data.success) {
        alert("Error while updating comment");
      } else {
        updateComments(); // Refetch posts upon success
      }
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while updating comment.";

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 500) {
          errorMessage = "Internal Server Error (500). Please try again later.";
        } else {
          const data = error.response.data.data;
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

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, updateComment, error };
};

export default useUpdateComment;
