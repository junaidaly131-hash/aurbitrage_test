import { useState, useCallback } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const apiEndpoint = `/api/v1/message/send`;

  const sendMessage = useCallback(
    async (
      receiverId,
      chatType,
      message,
      messageAsset,
      replyId,
      type,
      payload,
    ) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append("receiverId", receiverId);
        formData.append("chatType", chatType);
        formData.append("message", message);
        formData.append("type", type);
        if (messageAsset) {
          formData.append("messageAsset", messageAsset);
        }
        if (replyId != 0) {
          formData.append("replyId", replyId);
        }
        if (payload && type === "sku") {
          formData.append("payload", JSON.stringify(payload));
        }
        const response = await fetch(apiEndpoint, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const result = await response.json();

        if (result.success) {
          setSuccess(true);
        } else {
          setError(result.message || "Failed to send message");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Error sending message");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint],
  );

  return { sendMessage, loading, error, success };
};

export default useSendMessage;
