import { useState } from "react";

const useCreateSkuPrice = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const apiEndpoint = "/api/v1/sku-relations/create-dealer-sku";

  const createSkuPrice = async (skuData) => {
    try {
      setLoading("loading");
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(skuData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setLoading("success");
        setError("");
        return result.data.pricelistId;
      } else {
        setError(result.data);
        setLoading("failed");
        return null;
      }
    } catch (error) {
      setLoading("failed");
      return null;
    }
  };

  return { createSkuPrice, loading, error };
};

export default useCreateSkuPrice;
