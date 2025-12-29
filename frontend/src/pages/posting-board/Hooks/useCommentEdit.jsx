import { useState } from "react";

const useCommentEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState({});

  const updateComment = async (params, setComments) => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/api/v1/post/comment/update/${params?.id}`;

      const res = await fetch(apiEndpoint, {
        method: "PATCH",
        body: JSON.stringify({ body: params.body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!response.success) {
        alert("Error while posting the comment");
      } else {
        setComments((prev) => {
          if (params.parentId) {
            const existingParentIndex = prev.findIndex(
              (comment) => comment.id === params.parentId,
            );
            if (existingParentIndex !== -1) {
              const updatedChildren = prev[existingParentIndex].children.map(
                (child) => {
                  if (child.id === params.id) {
                    return {
                      ...child,
                      body: params.body,
                      updatedAt: child.updatedAt
                        ? new Date().toISOString()
                        : new Date().toISOString(),
                    };
                  }
                  return child;
                },
              );
              const updatedParent = {
                ...prev[existingParentIndex],
                children: updatedChildren,
              };
              const updatedComments = [...prev];
              updatedComments[existingParentIndex] = updatedParent;
              return updatedComments;
            }
          } else {
            const existingCommentIndex = prev.findIndex(
              (comment) => comment.id === params.id,
            );
            if (existingCommentIndex !== -1) {
              const updatedComments = [...prev];
              updatedComments[existingCommentIndex] = {
                ...updatedComments[existingCommentIndex],
                body: params.body,
                updatedAt: updatedComments[existingCommentIndex].updatedAt
                  ? new Date().toISOString()
                  : new Date().toISOString(),
              };
              return updatedComments;
            }
          }
          return prev;
        });
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

  return { isLoading, comment, updateComment };
};

export default useCommentEdit;
