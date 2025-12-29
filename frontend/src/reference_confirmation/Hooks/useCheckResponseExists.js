import { useState } from "react";

const useCheckResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckResponse = async (referenceId) => {
    setLoading(true);
    setError(null);
    const apiEndpoint = `/api/v1/refResponse/checkResponseExists/${referenceId}`; // Updated endpoint
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET", // Changed method to GET
        headers: {
          "Content-Type": "application/json", // Corrected header key
        },
      });

      const responseData = await response.json();
      if (response.status === 500) {
        return responseData;
      }
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (error) {
      console.error("Error while checking response:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleCheckResponse, loading, error };
};

export default useCheckResponse;
