import { useState } from "react";

const useRemoveSkuPrice = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");
  const apiEndpoint = "/api/v1/sku-relations/remove-sku-from-masterpricelist";

  const removeSkuPrice = async (skuId, sourceTable) => {
    try {
      setLoading("loading");
      setError("");
      const body = { skuId, sourceTable };
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
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
        return result;
      } else {
        setError(result.data || "An error occurred.");
        setLoading("failed");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      setLoading("failed");
    }
  };

  return { loading, error, removeSkuPrice };
};

export default useRemoveSkuPrice;
