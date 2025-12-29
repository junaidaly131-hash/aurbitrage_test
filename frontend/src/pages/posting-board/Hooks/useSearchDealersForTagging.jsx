import { useState, useCallback, useRef } from "react";

const useSearchDealersForTagging = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastSearchTermRef = useRef("");
  const abortControllerRef = useRef(null);

  const searchDealers = useCallback(async (searchTerm = "", limit = 10) => {
    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      setDealers([]);
      return;
    }

    if (trimmedTerm === lastSearchTermRef.current) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    lastSearchTermRef.current = trimmedTerm;

    try {
      const params = new URLSearchParams({
        search: trimmedTerm,
        limit: limit.toString(),
      });

      const response = await fetch(`/api/v1/post/search/dealers?${params}`, {
        method: "GET",
        credentials: "include",
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Error searching dealers: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();

      if (result.success) {
        setDealers(result.data || []);
      } else {
        throw new Error(result.message || "Failed to search dealers");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error searching dealers for tagging:", err);
        setError(err.message);
        setDealers([]);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const clearDealers = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setDealers([]);
    setError(null);
    lastSearchTermRef.current = "";
    setLoading(false);
  }, []);

  return {
    dealers,
    loading,
    error,
    searchDealers,
    clearDealers,
  };
};

export default useSearchDealersForTagging;
