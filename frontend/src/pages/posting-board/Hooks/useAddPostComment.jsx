import { useState } from "react";

const useAddPostComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState({});
  const [success, setSuccess] = useState(false);

  const addPostComment = async (params, setComments) => {
    setIsLoading(true);
    setSuccess(false);
    try {
      const apiEndpoint = "/api/v1/post/comment/create";

      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!response.success) {
        alert("Error while posting the comment");
      } else {
        if (response.data.parentId) {
          //if the added comment is a reply
          setComments(response.data);
        } else {
          setComments((p) => [response.data, ...p]);
        }
        setComment(response.data);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("ERROR: ", error);

      let errorMessage = "An error occurred while posting the comment.";

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

  return { isLoading, comment, addPostComment, success };
};

export default useAddPostComment;
