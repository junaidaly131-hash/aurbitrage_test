import { useState } from "react";
import axios from "axios";

const useUpdatePost = (
  refetchPosts,
  fetchMyPosts,
  fetchSavedPosts,
  handleClose,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const updatePost = async (id, params, postImages, priceType, clearPost) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
      if (postImages && postImages.length > 0) {
        postImages.forEach((image, index) => {
          formData.append("postImages", image);
        });
      }
      formData.append("priceType", priceType);

      const apiEndpoint = `/api/v1/post/update/${id}`;

      const response = await axios.patch(apiEndpoint, formData);

      if (!response.data.success) {
        alert("Error while updating post");
      } else {
        refetchPosts(); // Refetch posts upon success
        fetchMyPosts();
        fetchSavedPosts();
      }

      // Reset form data
      clearPost();

      handleClose(); // Close the modal/dialog
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while posting.";

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

  return { isLoading, updatePost };
};

export default useUpdatePost;
