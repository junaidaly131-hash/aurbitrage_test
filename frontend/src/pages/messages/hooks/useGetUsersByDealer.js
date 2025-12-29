import { useState, useEffect, useCallback } from "react";

const useGetUsersByDealer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsersByDealer = useCallback(async (dealerName) => {
    if (!dealerName) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `/api/v1/message/users/dealer/${encodeURIComponent(dealerName)}`,
        {
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.message || "Failed to fetch users");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users by dealer:", error);
      setError("Error fetching users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error, fetchUsersByDealer };
};

export default useGetUsersByDealer;
