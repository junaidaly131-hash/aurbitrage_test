import { useState } from "react";

const useMapDealerApiSku = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");
  const apiEndpoint = "/api/v1/sku-relations/map-dealer-api-sku";

  const mapDealerApiSku = async (sku, dealerId, aurbitrageSkuId) => {
    try {
      setLoading("loading");
      setError("");
      const body = { sku, dealerId, aurbitrageSkuId };
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred.");
        return;
      }
      const result = await response.json();
      if (result.success) {
        setLoading("success");
        setError("");
        return result;
      } else {
        setError(result.error || "An error occurred.");
        setLoading("failed");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      setLoading("failed");
    }
  };

  return { loading, error, mapDealerApiSku };
};

export default useMapDealerApiSku;
