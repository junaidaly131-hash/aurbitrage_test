import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
const useSendInviteEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userName, dealerName } = useAuth();
  const apiEndpoint = "/api/v1/user/send-invite-to-user";
  const handleEmailSending = async (inviteEmail, receiverName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint, {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          inviteEmail,
          userName,
          dealerName,
          receiverName,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          throw new Error(errorData.data);
        } else {
          throw new Error(errorData.data);
        }
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Error sending email:", err);

      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { handleEmailSending, loading, error };
};

export default useSendInviteEmail;
