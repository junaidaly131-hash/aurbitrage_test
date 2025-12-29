import { useState, useEffect } from "react";

const useFetchPostsMetaData = () => {
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/post/metadata";

  const fetchPostsMetaData = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching posts meta data: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setMetaData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsMetaData();
  }, [apiEndpoint]);

  return { metaData, loading, error, fetchPostsMetaData };
};

export default useFetchPostsMetaData;
