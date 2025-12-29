import { useState } from "react";
import axios from "axios";

const useCheckToken = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const checkToken = async (resetToken) => {
    setLoading(true);
    const apiEndpoint = "/api/v1/user/check-reset-token";
    try {
      const res = await axios.post(apiEndpoint, { resetToken });
      // Extract the actual message string from the response
      const successMessage =
        typeof res.data === "string"
          ? res.data
          : res.data?.data || res.data?.message || "Reset token is valid";
      setMessage(successMessage);
      setIsValid(true);
    } catch (err) {
      // Extract error message, ensuring it's always a string
      let errorMessage = "Error Getting Token";

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
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };
  return { message, loading, isValid, checkToken };
};

export default useCheckToken;
