import { getAuthorizations } from "@/apis/dealer";
import { useState, useCallback, useEffect } from "react";

const useGetAuthorizations = (dealerId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const fetchAuthorizations = useCallback(async (dealerId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await getAuthorizations(dealerId);
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

  useEffect(() => {
    fetchAuthorizations(dealerId);
  }, [dealerId, fetchAuthorizations]);

  return { fetchAuthorizations, loading, error, success, data };
};

export default useGetAuthorizations;
