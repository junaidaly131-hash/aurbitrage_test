import { useState, useEffect, useCallback } from "react";

const useGetMembers = (groupId) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiEndpoint = `/api/v1/message/groups/members/${groupId}`;

  const fetchMembers = useCallback(async () => {
    try {
      if (groupId) {
        setLoading(true);
        const response = await fetch(apiEndpoint, {
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setMembers(result.data);
        } else {
          setError("Failed to fetch members");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, loading, error };
};

export default useGetMembers;
