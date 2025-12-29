import { useState, useEffect, useCallback } from "react";
import ls from "localstorage-slim";

const useGetStoneXPrices = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState("loading");

  const apiEndpoint = "/api/v1/pricing/stonex-prices";

  const GetStoneXPrices = useCallback(async () => {
    try {
      if (ls.get("stonex-api-prices")) {
        const savedResults = JSON.parse(ls.get("stonex-api-prices"));
        setData(savedResults);
        setLoading("success");
      } else {
        setLoading("loading");
        const response = await fetch(apiEndpoint, {
          method: "POST",
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
          ls.set("stonex-api-prices", JSON.stringify(result.data), {
            ttl: 300,
          });
          setLoading("success");
        } else {
          setLoading("failed");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading("failed");
    }
  }, [apiEndpoint]);

  useEffect(() => {
    GetStoneXPrices();
  }, [GetStoneXPrices]);

  return { data, loading, GetStoneXPrices };
};

export default useGetStoneXPrices;
