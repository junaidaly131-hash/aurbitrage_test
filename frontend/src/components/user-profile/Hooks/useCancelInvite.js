import { useState } from "react";
import axios from "axios";

const useCancelInvite = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelInvite = async (inviteId) => {
    const apiEndPoint = `/api/v1/user/cancel-invite/${inviteId}`;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(apiEndPoint);
      if (response.status === 200) {
        setResponse(response.data.data);
      } else {
        console.error("Error cancelling invite:", response);
        setError(response.data.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, cancelInvite };
};

export default useCancelInvite;
