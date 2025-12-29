import { useState } from "react";

const useDeleteAurbitrageSKU = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");

  const apiEndpoint = "/api/v1/sku-relations/delete-aurbitrage-sku";

  const deleteSKU = async (skuId) => {
    try {
      setLoading("loading");
      const response = await fetch(`${apiEndpoint}/${skuId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.success) {
        setLoading("success");
        setError("");
        return { success: true };
      } else {
        const errorMsg = result.data || "Failed to delete SKU";
        setError(errorMsg);
        setLoading("failed");
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to delete SKU";
      setError(errorMsg);
      setLoading("failed");
      return { success: false, error: errorMsg };
    }
  };

  return { deleteSKU, loading, error };
};

export default useDeleteAurbitrageSKU;
