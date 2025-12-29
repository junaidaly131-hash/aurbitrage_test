import { useState, useEffect } from "react";

const useGetSkuMappingSkus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [loginAgain, setLoginAgain] = useState(false);

  const apiEndpoint = "/api/v1/sku-relations/all-sku-mappings";

  const fetchSkuMapping = async () => {
    try {
      setLoading("loading");
      const response = await fetch(apiEndpoint);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLoading("success");
      } else {
        setLoading("failed");
        if (response.status == 401) {
          setLoginAgain(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading("failed");
    }
  };

  useEffect(() => {
    fetchSkuMapping();
  }, []);

  return { data, loading, loginAgain, fetchSkuMapping };
};

export default useGetSkuMappingSkus;
