import { useState, useEffect } from "react";

const useGetReferenceResponse = () => {
  const [referenceResponses, setReferenceResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getReferenceResponse = async (userId) => {
    const apiEndpoint = `/api/v1/refResponse/getResponses/${userId}`;

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching reference responses: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setReferenceResponses(res.data);
    } catch (error) {
      console.error("Error: ", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const setReferenceNull = () => {
    setReferenceResponses([]);
  };

  return {
    referenceResponses,
    loading,
    error,
    setReferenceNull,
    getReferenceResponse,
  };
};

export default useGetReferenceResponse;
