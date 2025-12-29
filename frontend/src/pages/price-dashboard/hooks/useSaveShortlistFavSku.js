import { useState } from "react";

const useSaveShortlistFavSku = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveShortlistFavSku = async (aurbitrageSkuId, type) => {
    const apiEndpoint = `/api/v1/pricing/shortlist-favourite-sku`;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aurbitrageSkuId, type }),
      });

      if (!response.ok) {
        throw new Error(
          `Error saving shortlist favorite SKU: ${response.status} ${response.statusText}`,
        );
      }

      const res = await response.json();
      return res;
    } catch (error) {
      console.error("Error: ", error.message);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, saveShortlistFavSku };
};

export default useSaveShortlistFavSku;
