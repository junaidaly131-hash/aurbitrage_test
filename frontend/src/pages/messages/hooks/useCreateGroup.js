import { useState, useCallback } from "react";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const apiEndpoint = `/api/v1/message/group/create`;

  const createGroup = useCallback(
    async (dealerIds, userIds, name) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            dealerIds: dealerIds.join("|"),
            userIds: userIds.join("|"),
            name,
          }),
          credentials: "include",
        });

        const result = await response.json();

        if (result.success) {
          const id = result.data[0].groupId;
          setData(id);
          setSuccess(true);
        } else {
          setError(result.message || "Failed to create group");
        }
      } catch (error) {
        console.error("Error creating group:", error);
        setError("Error creating group");
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint],
  );

  return { createGroup, loading, error, success, data };
};

export default useCreateGroup;
