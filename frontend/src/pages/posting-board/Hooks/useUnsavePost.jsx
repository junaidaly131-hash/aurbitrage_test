import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useUnSavePost = (refetchPosts, refetchMyPosts, triggerPostFetch) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const unSavePost = async (postId) => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/api/v1/post/unsave/${postId}`;

      const response = await axios.delete(apiEndpoint);

      if (!response.data.success) {
        alert("Error while unsaving");
      } else {
        refetchMyPosts?.();
        refetchPosts?.();
        triggerPostFetch?.();
      }
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while unsaving post.";

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

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, unSavePost };
};

export default useUnSavePost;
