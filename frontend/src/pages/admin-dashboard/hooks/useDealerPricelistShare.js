import { useState, useCallback } from "react";

const useDealerPricelistShare = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendingDealers, setSendingDealers] = useState([]);
  const [allDealers, setAllDealers] = useState([]);
  const [sharingConfig, setSharingConfig] = useState([]);

  const fetchSendingDealers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/v1/dealer-pricelist-share/senders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setSendingDealers(result.data);
      } else {
        setError(result.message || "Failed to fetch sending dealers");
      }
    } catch (err) {
      console.error("Error fetching sending dealers:", err);
      setError("Failed to fetch sending dealers");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllDealers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/api/v1/dealer-pricelist-share/all-dealers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        setAllDealers(result.data);
      } else {
        setError(result.message || "Failed to fetch all dealers");
      }
    } catch (err) {
      console.error("Error fetching all dealers:", err);
      setError("Failed to fetch all dealers");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSharingConfig = useCallback(async (senderDealerId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/v1/dealer-pricelist-share/sender/${senderDealerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        setSharingConfig(result.data);
      } else {
        setError(result.message || "Failed to fetch sharing configuration");
      }
    } catch (err) {
      console.error("Error fetching sharing config:", err);
      setError("Failed to fetch sharing configuration");
    } finally {
      setLoading(false);
    }
  }, []);

  const configureSharing = useCallback(
    async (senderDealerId, additionalViewerDealerIds) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "/api/v1/dealer-pricelist-share/configure",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              senderDealerId,
              additionalViewerDealers: additionalViewerDealerIds,
            }),
          },
        );

        const result = await response.json();

        if (result.success) {
          return result.data;
        } else {
          setError(result.message || "Failed to configure sharing");
          throw new Error(result.message || "Failed to configure sharing");
        }
      } catch (err) {
        console.error("Error configuring sharing:", err);
        setError("Failed to configure sharing");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const removeSharing = useCallback(async (senderDealerId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/v1/dealer-pricelist-share/remove?senderDealerId=${senderDealerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        return result.data;
      } else {
        setError(result.message || "Failed to remove sharing");
        throw new Error(result.message || "Failed to remove sharing");
      }
    } catch (err) {
      setError("Failed to remove sharing");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    sendingDealers,
    allDealers,
    sharingConfig,
    fetchSendingDealers,
    fetchAllDealers,
    fetchSharingConfig,
    configureSharing,
    removeSharing,
  };
};

export default useDealerPricelistShare;
