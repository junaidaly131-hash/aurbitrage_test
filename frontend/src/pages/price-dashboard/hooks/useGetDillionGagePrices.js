import { useState, useEffect, useCallback } from "react";
import ls from "localstorage-slim";

const useGetDillionGagePrices = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState("loading");

  const apiEndpoint = "/api/v1/pricing/dillion-gage-prices";

  const GetDillionGagePrices = useCallback(async () => {
    try {
      if (ls.get("dillion-gage-api-prices")) {
        const savedResults = JSON.parse(ls.get("dillion-gage-api-prices"));
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
          ls.set("dillion-gage-api-prices", JSON.stringify(result.data.data), {
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
    GetDillionGagePrices();
  }, [GetDillionGagePrices]);

  return { data, loading, GetDillionGagePrices };
};

export default useGetDillionGagePrices;
