import { useState, useEffect, useCallback } from "react";
import ls from "localstorage-slim";

const useGetUpstatePrices = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState("loading");

  const apiEndpoint = "/api/v1/pricing/upstate-prices";

  const GetUpstatePrices = useCallback(async () => {
    try {
      if (ls.get("upstate-api-prices")) {
        const savedResults = JSON.parse(ls.get("upstate-api-prices"));
        setData(savedResults);
        setLoading("success");
      } else {
        setLoading("loading");
        const response = await fetch(apiEndpoint, {
          method: "GET",
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data.data);
          ls.set("upstate-api-prices", JSON.stringify(result.data.data), {
            ttl: 300,
          });
          setLoading("success");
        } else {
          setLoading("failed");
        }
      }
    } catch (error) {
      console.error("Error fetching Upstate data:", error);
      setLoading("failed");
    }
  }, [apiEndpoint]);

  useEffect(() => {
    GetUpstatePrices();
  }, [GetUpstatePrices]);

  return { data, loading, GetUpstatePrices };
};

export default useGetUpstatePrices;
