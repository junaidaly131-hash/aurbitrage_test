import { useState } from "react";
import axios from "axios";

const useCheckSession = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const checkSession = async () => {
    setLoading(true);
    const apiEndpoint = "/api/v1/user/get-session-status";
    try {
      const res = await axios.get(apiEndpoint);
      if (res.data.data.loggedIn) {
        setIsValid(true);
        setMessage("Session is Valid");
      } else {
        setIsValid(false);
        setMessage("Session Expired");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMessage("Session Expired");
      } else {
        setMessage("Error Getting Session");
      }
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, isValid, checkSession };
};

export default useCheckSession;
