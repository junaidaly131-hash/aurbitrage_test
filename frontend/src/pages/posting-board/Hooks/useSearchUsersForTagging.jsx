import { useState, useCallback, useRef } from "react";

const useSearchUsersForTagging = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastSearchTermRef = useRef("");
  const abortControllerRef = useRef(null);

  const searchUsers = useCallback(async (searchTerm = "", limit = 10) => {
    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      setUsers([]);
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

      const response = await fetch(`/api/v1/post/search/users?${params}`, {
        method: "GET",
        credentials: "include",
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Error searching users: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();

      if (result.success) {
        setUsers(result.data || []);
      } else {
        throw new Error(result.message || "Failed to search users");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error searching users for tagging:", err);
        setError(err.message);
        setUsers([]);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const clearUsers = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setUsers([]);
    setError(null);
    lastSearchTermRef.current = "";
    setLoading(false);
  }, []);

  return {
    users,
    loading,
    error,
    searchUsers,
    clearUsers,
  };
};

export default useSearchUsersForTagging;
