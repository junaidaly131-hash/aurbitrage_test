import { useState, useEffect } from "react";

const useGetPendingUsers = () => {
  const [pendingUser, setPendingUsers] = useState([]);
  const [uloading, setLoading] = useState(true);
  const [uerror, setError] = useState(null);
  const apiEndpoint = "/api/v1/user/get";

  const getPendingUsers = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching pending users: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setPendingUsers(res.data);
    } catch (error) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingUsers();
  }, [apiEndpoint]);

  return { pendingUser, uloading, uerror, urefetch: getPendingUsers };
};

export default useGetPendingUsers;
