import { useState } from "react";

const useRePublishSkuPrices = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");
  const apiEndpoint = "/api/v1/sku-relations/republish-sku-prices";

  const rePublishSkuPrices = async (skuIds) => {
    try {
      setLoading("loading");

      setError("");

      const body = { skuIds };
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.data || "An error occurred.");
        return;
      }

      const result = await response.json();
      if (result.success) {
        setLoading("success");

        setError("");
      } else {
        setError(result.data || "An error occurred.");
        setLoading("failed");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      setLoading("failed");
    }
  };

  return { loading, error, rePublishSkuPrices };
};

export default useRePublishSkuPrices;
