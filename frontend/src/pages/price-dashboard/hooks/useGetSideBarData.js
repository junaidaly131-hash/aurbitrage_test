import { useState, useEffect } from "react";

const useFetchSideBarData = () => {
  const [sideBarData, setSideBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSideBarData = async () => {
    const apiEndpoint = `/api/v1/pricing/get-sidebar-data`;

    try {
      setLoading(true); // Set loading to true at the start
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching sidebar data: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setSideBarData(res.data);
    } catch (error) {
      console.error("Error: ", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { sideBarData, loading, error, fetchSideBarData };
};

export default useFetchSideBarData;
