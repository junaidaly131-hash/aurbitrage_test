import { useState, useEffect, useCallback } from "react";

const useFetchComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/post/comment/get";

  const fetchComments = useCallback(async (postId) => {
    try {
      if (!(typeof postId === "number")) {
        throw new Error(`Error fetching comments: Invalid post Id`);
      }
      setLoading(true);
      const response = await fetch(`${apiEndpoint}/${postId}`);
      if (!response.ok) {
        throw new Error(
          `Error fetching comments: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setComments(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { comments, loading, error, fetchComments };
};

export default useFetchComments;
