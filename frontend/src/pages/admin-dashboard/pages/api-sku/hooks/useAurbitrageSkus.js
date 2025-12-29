import { useState } from "react";

const useAurbitrageSkus = () => {
  const [aurbitrageSkus, setAurbitrageSkus] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAurbitrageSkus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/sku-relations/all-aurbitrage-skus");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAurbitrageSkus(data);
      } else if (Array.isArray(data.data)) {
        setAurbitrageSkus(data.data);
      } else {
        setAurbitrageSkus([]);
      }
    } catch (e) {
      setAurbitrageSkus([]);
    }
    setLoading(false);
  };

  return { aurbitrageSkus, fetchAurbitrageSkus, loading };
};

export default useAurbitrageSkus;
