import { useState } from "react";
import axios from "axios";

const useAddPost = (refetchPosts, fetchMyPosts, handleClose) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async (params) => {
    const {
      postType,
      postContent,
      postHeader,
      postImages,
      enableDeal,
      spotType,
      selectedMetals,
      priceOption,
      priceData,
      priceType,
      contactBefore,
      startDate,
      endDate,
      startTime,
      endTime,
      allowMessages,
      allowComments,
      hideUsername,
      showEmail,
      clearAddPost,
      duplicate,
      assetURLs,
      order,
      textBackground,
    } = params;

    setIsLoading(true);

    try {
      const currentTime = new Date();
      const formData = new FormData();
      formData.append("postTime", currentTime.toISOString());
      formData.append("postType", postType);
      formData.append("postContent", postContent);
      formData.append("allowMessages", allowMessages);
      formData.append("allowComments", allowComments);
      formData.append("hideUsername", hideUsername);
      formData.append("showEmail", showEmail);
      formData.append("order", order);
      formData.append("textBackground", textBackground);
      if (postImages && postImages.length > 0) {
        postImages.forEach((image, index) => {
          formData.append("postImages", image);
        });
      }
      if (!textBackground) {
        formData.append("postHeader", postHeader);
      }
      formData.append("enableDeal", enableDeal);
      if (enableDeal) {
        formData.append("spotType", spotType);
        formData.append("selectedMetals", JSON.stringify(selectedMetals));
        formData.append("priceOption", priceOption);
        formData.append("priceData", priceData);

        formData.append("priceType", priceType);
        formData.append("contactBefore", contactBefore);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
      } else {
        formData.append("contactBefore", contactBefore);
      }
      const apiEndpoint = "/api/v1/post/create";

      const response = await axios.post(apiEndpoint, formData);

      if (!response.data.success) {
        alert("Error while posting");
      } else {
        refetchPosts();
        fetchMyPosts();
      }
      clearAddPost();
      handleClose();
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

  return { isLoading, handlePost };
};

export default useAddPost;
