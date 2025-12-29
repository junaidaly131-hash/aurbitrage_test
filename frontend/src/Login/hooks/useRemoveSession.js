import { useState } from "react";
import axios from "axios";

const useRemoveSession = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const removeSession = async () => {
    setLoading(true);
    const apiEndpoint = "/api/v1/user/remove-session";
    try {
      const res = await axios.delete(apiEndpoint);
      setMessage("Session Removed");
    } catch (err) {
      setMessage("Failed To Remove Session");
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, removeSession };
};

export default useRemoveSession;
