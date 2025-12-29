import { useState } from "react";
import axios from "axios";

const useResetPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const resetPassword = async (token, password) => {
    setLoading(true);
    const apiEndpoint = "/api/v1/user/reset-password";
    try {
      const res = await axios.post(apiEndpoint, { token, password });
      // Extract the actual message string from the response
      const successMessage =
        typeof res.data === "string"
          ? res.data
          : res.data?.data || res.data?.message || "Password has been reset";
      setMessage(successMessage);
      setIsReset(true);
    } catch (err) {
      // Extract error message, ensuring it's always a string
      let errorMessage = "Error resetting password";

      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.data) {
          errorMessage = err.response.data.data;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  return { message, loading, isReset, resetPassword, updateMessage };
};

export default useResetPassword;
