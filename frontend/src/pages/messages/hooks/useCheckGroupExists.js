import { useState, useCallback } from "react";

const useCheckGroupExists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const apiEndpoint = `/api/v1/message/group/check-group-exists`;

  const checkGroupExists = useCallback(
    async (dealerId, name) => {
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
            dealerId,
            name,
          }),
          credentials: "include",
        });

        const result = await response.json();

        if (result.success) {
          setData(result.data);
          setSuccess(true);
        } else {
          setError(result.message || "Failed to check group exists");
        }
      } catch (error) {
        console.error("Error checking group exists:", error);
        setError("Error checking group exists");
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint],
  );

  return { checkGroupExists, loading, error, success, data };
};

export default useCheckGroupExists;
