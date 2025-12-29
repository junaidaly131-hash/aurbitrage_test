import { useState } from "react";

const useFetchPricingDashboardData = () => {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState("idle");
  const [error, setError] = useState(null);

  const fetchPricingDashboardData = async (params, signal = null) => {
    const {
      category,
      subCategory,
      mint,
      type,
      dealerName,
      refinery,
      search,
      metals,
      pageView,
      year,
      saveType,
      aurbitrageSku,
    } = params;
    const options = {
      method: "GET",
    };
    if (signal) {
      options.signal = signal;
    }
    const apiEndpoint = `/api/v1/pricing/get-dashboard-data`;
    // Order-sensitive query building
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (dealerName) query.append("dealerName", dealerName);
    if (refinery) query.append("refinery", refinery);
    if (search) query.append("search", search);
    if (metals) query.append("metal", metals);
    if (pageView && Object.keys(params).length == 1)
      query.append("pageView", pageView);
    if (year) query.append("year", year);
    if (saveType) query.append("saveType", saveType);
    if (aurbitrageSku) query.append("aurbitrageSku", aurbitrageSku);

    if (type === "mint") {
      if (mint) query.append("mint", mint);
      if (subCategory) query.append("subCategory", subCategory);
    } else if (type === "subcategory") {
      if (subCategory) query.append("subCategory", subCategory);
      if (mint) query.append("mint", mint);
    }

    const url = query.toString()
      ? `${apiEndpoint}?${query.toString()}`
      : apiEndpoint;

    try {
      setLoading("loading");
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `Error fetching pricing dashboard data: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setPricingData(res.data);
      setLoading("success");
    } catch (error) {
      console.error("Error: ", error.message);
      setError(error);
      setLoading("failed");
    }
  };

  return { pricingData, loading, error, fetchPricingDashboardData };
};

export default useFetchPricingDashboardData;
