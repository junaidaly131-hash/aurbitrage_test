import { useState, useEffect } from "react";

const useGetPendingDealers = () => {
  const [pendingDealer, setPendingDealers] = useState([]);
  const [dloading, setLoading] = useState(true);
  const [derror, setError] = useState(null);
  const apiEndpoint = "/api/v1/dealer/get-dealers-info";

  const getPendingDealers = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching pending Dealers: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setPendingDealers(res.data);
    } catch (error) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingDealers();
  }, [apiEndpoint]);

  return { pendingDealer, dloading, derror, drefetch: getPendingDealers };
};

export default useGetPendingDealers;
