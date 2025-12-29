import { useState, useEffect, useCallback } from "react";

const useGetUsers = (query = "") => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = `/api/v1/message/users${query}`;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setUsers(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, loading };
};

export default useGetUsers;
