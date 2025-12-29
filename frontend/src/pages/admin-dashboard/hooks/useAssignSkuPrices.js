import { useState, useEffect } from "react";

const useAssignSKUPrices = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");

  const apiEndpoint = "/api/v1/pricing/assign-sku-prices";

  const postSKUPricesData = async (
    sku,
    dealer,
    date,
    askPrice,
    bidPrice,
    sourceTable,
  ) => {
    try {
      setLoading("loading");
      const body = {
        sku,
        dealer,
        date,
        askPrice,
        bidPrice,
        sourceTable,
      };
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setLoading("success");
        setError("");
      } else {
        setError(result.data);
        setLoading("failed");
      }
    } catch (error) {
      setLoading("failed");
    }
  };

  return { postSKUPricesData, loading, error };
};

export default useAssignSKUPrices;
