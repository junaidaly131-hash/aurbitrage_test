import { useState } from "react";
import axios from "axios";

const useConfirmDeal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const confirmDeal = async (id, refetchPosts, creditInfo) => {
    setIsLoading(true);

    try {
      const apiEndpoint = `/api/v1/post/confirmDeal/${id}`;
      const response = await axios.patch(apiEndpoint, { creditInfo });

      if (!response.data.success) {
        throw new Error("Error while updating comment");
      } else {
        refetchPosts();
      }

      return { success: true };
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while updating comment.";

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 500) {
          errorMessage = "Internal Server Error (500). Please try again later.";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else {
        errorMessage = `Error in request: ${error.message}`;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, confirmDeal };
};

export default useConfirmDeal;
