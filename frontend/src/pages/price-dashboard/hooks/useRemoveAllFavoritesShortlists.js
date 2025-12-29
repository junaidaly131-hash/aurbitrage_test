import { removeAllFavoritesShortlists } from "@/apis/pricing-dashboard";
import { useState } from "react";

const useRemoveAllFavoritesShortlists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeAll = async (type) => {
    try {
      setLoading(true);
      setError(null);
      const response = await removeAllFavoritesShortlists({ type });
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { removeAll, loading, error };
};

export default useRemoveAllFavoritesShortlists;
