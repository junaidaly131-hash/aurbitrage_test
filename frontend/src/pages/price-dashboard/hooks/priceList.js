import { useState, useEffect, useCallback } from "react";

const useGetPricelist = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState("loading");

  const apiEndpoint = "/api/v1/pricing/all";

  const fetchData = useCallback(async () => {
    try {
      setLoading("loading");
      const response = await fetch(apiEndpoint);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLoading("success");
      } else {
        setLoading("failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading("failed");
    }
  }, [apiEndpoint, setLoading, setData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, fetchData };
};

export default useGetPricelist;
