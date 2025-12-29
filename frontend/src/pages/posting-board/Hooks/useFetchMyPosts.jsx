import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const useFetchMyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiEndpoint = `/api/v1/post/my-posts`;

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${apiEndpoint}`);
      if (!response.ok) {
        throw new Error(
          `Error fetching posts: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setPosts(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [apiEndpoint]);

  return { posts, loading, error, refetch: fetchPosts };
};

export default useFetchMyPosts;
