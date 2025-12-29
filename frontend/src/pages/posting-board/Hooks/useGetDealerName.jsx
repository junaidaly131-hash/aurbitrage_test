import { useState } from "react";

const useGetDealerName = () => {
  const [dealerName, setDealerName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiEndpoint = "/api/v1/dealer/getName";

  const fetchDealerName = async (dealerId) => {
    try {
      setLoading(true);
      setError(null); // Reset error before starting a new request

      // Ensure dealerId is included in the request
      const response = await fetch(`${apiEndpoint}/${dealerId}`);
      if (!response.ok) {
        throw new Error(
          `Error fetching dealer name: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setDealerName(res.data.dealerName);
    } catch (error) {
      console.error("ERROR: ", error);
      setError(error.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { dealerName, loading, error, fetchDealerName };
};

export default useGetDealerName;
