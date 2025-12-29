import { useState } from "react";
import axios from "axios";

const useDeletePost = (refetchPosts, refetchMyPosts, refetchSaved) => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = async (id) => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/api/v1/post/delete/${id}`;

      const response = await axios.delete(apiEndpoint);

      if (!response.data.success) {
        alert("Error while deleting");
      } else {
        refetchPosts();
        refetchMyPosts();
        refetchSaved();
      }
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while deleting post.";

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

  return { isLoading, deletePost };
};

export default useDeletePost;
