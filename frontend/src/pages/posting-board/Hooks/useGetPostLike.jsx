import { useState } from "react";

const useGetPostLikes = (isComment) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [error, setError] = useState(null);

  const getPostLikes = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiEndpoint = isComment
        ? `/api/v1/post/comment/like/users/${id}`
        : `/api/v1/post/like/users/${id}`;
      const res = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!response.success) {
        throw new Error("Error while fetching liked users.");
      }

      setLikedUsers(response.data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, likedUsers, error, getPostLikes };
};

export default useGetPostLikes;
