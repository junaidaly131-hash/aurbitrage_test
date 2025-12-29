// useConfirmDeal.js
import { useState } from "react";
import axios from "axios";

const useUpdateCreditStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateCreditStatus = async (id, creditInfo, refetchPosts) => {
    setIsLoading(true);

    try {
      const apiEndpoint = `/api/v1/post/updateDealCreditInfo/${id}`;
      const response = await axios.patch(apiEndpoint, { creditInfo });

      if (!response.data.success) {
        throw new Error("Error while updating comment");
      } else {
        refetchPosts();
      }
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
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateCreditStatus };
};

export default useUpdateCreditStatus;
