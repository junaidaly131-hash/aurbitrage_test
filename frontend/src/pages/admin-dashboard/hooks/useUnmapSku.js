import { useState, useEffect } from "react";

const useUnMapSku = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");

  const apiEndpoint = "/api/v1/sku-relations/un-map-sku";

  const unMapSku = async (sku, dealer, section) => {
    try {
      setLoading("loading");
      const body = {
        dealer,
        sku,
        section,
      };
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
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

  return { unMapSku, loading, error };
};

export default useUnMapSku;
