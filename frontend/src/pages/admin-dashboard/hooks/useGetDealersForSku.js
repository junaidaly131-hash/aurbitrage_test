import { useState, useEffect } from "react";

const useGetDealersForSku = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/dealer/getDealerForSku";

  const getDealersForSku = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching Dealers For Sku: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setDealers(res.data);
    } catch (error) {
      console.error("ERROR: ", error.response);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDealersForSku();
  }, [apiEndpoint]);

  return { dealers, loading, error, getDealersForSku };
};

export default useGetDealersForSku;
