import { useState, useEffect, useCallback } from "react";

const useGetAllUnread = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = `/api/v1/message/unread`;

  const fetchAllUnread = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setUnreadCount(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchAllUnread();
  }, []);

  return { unreadCount, loading, fetchAllUnread };
};

export default useGetAllUnread;
