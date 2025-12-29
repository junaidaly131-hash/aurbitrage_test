import { useState, useCallback } from "react";
import { getPeople as getPeopleApi } from "@/apis/dealer";

const useGetPeople = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const getPeople = useCallback(async (dealerId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await getPeopleApi(dealerId);
      handleResponse(response);
    } catch (error) {
      setError(error.message || "Error fetching people");
      setLoading(false);
    }
  }, []);

  const handleResponse = (response) => {
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch people");
    }

    setSuccess(true);
    setData(response.data);
    setLoading(false);
  };

  return { getPeople, loading, error, success, data };
};

export default useGetPeople;
