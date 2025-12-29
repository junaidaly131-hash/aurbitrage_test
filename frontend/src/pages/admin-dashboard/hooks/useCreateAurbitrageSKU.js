import { useState, useEffect } from "react";

const useCreateAurbitrageSKU = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");

  const apiEndpoint = "/api/v1/sku-relations/create-aurbitrage-sku";

  const postData = async (skuRelation) => {
    try {
      setLoading("loading");
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(skuRelation),
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
        throw result.data;
      }
    } catch (error) {
      setLoading("failed");
      throw error;
    }
  };

  return { postData, loading, error };
};

export default useCreateAurbitrageSKU;
