import { useState, useEffect } from "react";

const useGetDealerSku = () => {
  const [dealerSkus, setDealerSkus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/dealer/getDealerSku";

  const getDealerSku = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching Dealer Skus: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setDealerSkus(res.data);
    } catch (error) {
      console.error("ERROR: ", error.response);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDealerSku();
  }, [apiEndpoint]);

  return { dealerSkus, loading, error, getDealerSku };
};

export default useGetDealerSku;
