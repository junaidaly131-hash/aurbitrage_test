import { useState, useCallback } from "react";
import { postNewAffiliation } from "@/apis/dealer";

const usePostNewAffiliation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const submitAffiliation = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await postNewAffiliation(payload);
      handleResponse(response);
    } catch (error) {
      setError(error.message || "Error submitting affiliation");
      setLoading(false);
    }
  }, []);

  const handleResponse = (response) => {
    if (!response.success) {
      throw new Error(response.message || "Failed to submit affiliation");
    }
    setSuccess(true);
    setData(response.data);
    setLoading(false);
  };

  return { submitAffiliation, loading, error, success, data };
};

export default usePostNewAffiliation;
