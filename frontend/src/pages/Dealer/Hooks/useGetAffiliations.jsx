import { useState, useCallback, useEffect } from "react";
import { getAffiliations } from "@/apis/dealer";

const useGetAffiliations = (dealerId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const fetchAffiliations = useCallback(async (dealerId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await getAffiliations(dealerId);
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
    fetchAffiliations(dealerId);
  }, [dealerId, fetchAffiliations]);

  return { fetchAffiliations, loading, error, success, data };
};

export default useGetAffiliations;
