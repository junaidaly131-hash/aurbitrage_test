import { useState } from "react";

const useGetAurbitrageSkuById = () => {
  const [aurbitrageSku, setAurbitrageSku] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/sku-relations/aurbitrage-sku";

  const fetchAurbitrageSkuById = async (aurbitrageSkuId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiEndpoint}/${aurbitrageSkuId}`);
      if (!response.ok) {
        throw new Error(
          `Error fetching Aurbitrage Sku: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setAurbitrageSku(res.data);
    } catch (error) {
      console.error("ERROR: ", error);
      setError(error.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { aurbitrageSku, loading, error, fetchAurbitrageSkuById };
};

export default useGetAurbitrageSkuById;
