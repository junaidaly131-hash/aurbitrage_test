import { useState, useEffect, useCallback } from "react";

const useGetDealers = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = `/api/v1/message/dealers`;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setDealers(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { dealers, loading };
};

export default useGetDealers;
