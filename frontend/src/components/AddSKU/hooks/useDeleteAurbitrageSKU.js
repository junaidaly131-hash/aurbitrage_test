import { deleteAurbitrageSKU } from "@/apis/pricing-dashboard";
import { useState } from "react";

const useDeleteAurbitrageSKU = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");

  const deleteSKU = async (skuId) => {
    try {
      setLoading("loading");
      const response = await deleteAurbitrageSKU(skuId);
      handleResponse(response);
      return response;
    } catch (error) {
      setError(error.message || "Error deleting SKU");
      setLoading("failed");
      return error;
    }
  };
  const handleResponse = (response) => {
    if (!response.success) {
      throw new Error(response.message || "Failed to delete SKU");
    }
    setLoading("success");
  };

  return { deleteSKU, loading, error };
};

export default useDeleteAurbitrageSKU;
