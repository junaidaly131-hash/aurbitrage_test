import { useState } from "react";

const useUnmapDealerApiSku = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");
  const apiEndpoint = "/api/v1/sku-relations/un-map-dealer-api-sku";

  const unmapDealerApiSku = async (sku, dealerId) => {
    try {
      setLoading("loading");
      setError("");
      const body = { sku, dealerId };
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
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

  return { loading, error, unmapDealerApiSku };
};

export default useUnmapDealerApiSku;
