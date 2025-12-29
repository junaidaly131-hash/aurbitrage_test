import { useState, useCallback } from "react";

const useCreateGroupChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const createGroupChat = useCallback(
    async (dealerId, dealerName, currentUserId) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // First, check if group already exists
        const checkResponse = await fetch(
          `/api/v1/message/group/check-group-exists`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              dealerId: dealerId.toString(),
            }),
            credentials: "include",
          },
        );

        const checkResult = await checkResponse.json();

        if (checkResult.success) {
          if (checkResult.data?.groupExists) {
            // Group exists, return the existing group ID
            setData(checkResult.data.groupId);
            setSuccess(true);
            setLoading(false);
            return checkResult.data.groupId;
          } else {
            // Create new group
            const createResponse = await fetch(`/api/v1/message/group/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                dealerIds: dealerId.toString(),
                userIds: currentUserId.toString(),
                name: `${dealerName} Group`,
              }),
              credentials: "include",
            });

            const createResult = await createResponse.json();

            if (createResult.success) {
              const groupId = createResult.data[0].groupId;
              setData(groupId);
              setSuccess(true);
              setLoading(false);
              return groupId;
            } else {
              throw new Error(createResult.message || "Failed to create group");
            }
          }
        } else {
          throw new Error(
            checkResult.message || "Failed to check group exists",
          );
        }
      } catch (error) {
        console.error("Error creating group chat:", error);
        setError("Error creating group chat");
        setLoading(false);
        throw error;
      }
    },
    [],
  );

  return { createGroupChat, loading, error, success, data };
};

export default useCreateGroupChat;
