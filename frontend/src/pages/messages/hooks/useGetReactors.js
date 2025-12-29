import { useState, useCallback } from "react";

const useGetReactors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [reactors, setReactors] = useState([]);

  const getReactors = useCallback(async (messageId) => {
    const apiEndpoint = `/api/v1/message/reaction/get/${messageId}`;

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.message || "Failed to get reactors");
        return null;
      }

      const result = await response.json();

      if (result.success) {
        setReactors(result.data);
        setSuccess(true);
        return result.data;
      } else {
        setError(result.message || "Failed to get reactors");
        return null;
      }
    } catch (error) {
      console.error("Error getting reactors:", error);
      setError("Error getting reactors");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getReactors, loading, error, success, reactors };
};

export default useGetReactors;
