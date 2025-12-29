import { getDealer } from "@/apis/dealer";
import { useState, useCallback } from "react";

const useGetDealer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const getUser = useCallback(async (dealerId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await getDealer(dealerId);
      handleResponse(response);
    } catch (error) {
      setError(error.message || "Error fetching details");
      setLoading(false);
    }
  }, []);

  const handleResponse = (response) => {
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch details");
    }
    setSuccess(true);
    setData(response.data);
    setLoading(false);
  };

  return { getUser, loading, error, success, data };
};

export default useGetDealer;
