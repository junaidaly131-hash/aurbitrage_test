import { useState, useEffect } from "react";

const useGetUserDirectory = () => {
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/user/directory";

  const getDirectory = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching directory: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setDirectory(res.data);
    } catch (error) {
      console.error("ERROR: ", error.response);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDirectory();
  }, [apiEndpoint]);

  return { directory, loading, error, getDirectory };
};

export default useGetUserDirectory;
