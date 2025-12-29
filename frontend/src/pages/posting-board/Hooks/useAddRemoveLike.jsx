import { useState } from "react";

const useAddRemoveLike = (isComment) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);

  const togglePostLike = async (id) => {
    setIsLoading(true);
    try {
      const apiEndpoint = isComment
        ? `/api/v1/post/comment/like/${id}`
        : `/api/v1/post/like/`;

      const params = {};
      if (isComment) {
        params["commentId"] = id;
      } else {
        params["postId"] = id;
      }

      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!response.success) {
        alert("Error while toggling the like");
      } else {
        setLikeStatus(!likeStatus);
      }
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while toggling the like.";

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

  return { isLoading, likeStatus, togglePostLike };
};

export default useAddRemoveLike;
