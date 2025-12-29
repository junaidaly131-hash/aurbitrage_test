import { useState } from "react";

const useApiSkus = () => {
  const [apiSkus, setApiSkus] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApiSkus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/sku-relations/all-dealer-api-skus");
      const data = await res.json();
      if (Array.isArray(data)) {
        setApiSkus(data);
      } else if (Array.isArray(data.data)) {
        setApiSkus(data.data);
      } else {
        setApiSkus([]);
      }
    } catch (e) {
      setApiSkus([]);
    }
    setLoading(false);
  };

  return { apiSkus, fetchApiSkus, loading };
};

export default useApiSkus;
