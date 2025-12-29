import { useState } from "react";
import axios from "axios";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const forgotPassword = async (email) => {
    setLoading(true);
    const apiEndpoint = "/api/v1/user/forgot-password";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      const data = await response.json();
      setMessage(data.data);
      setIsSubmitted(true);
    } catch (err) {
      setMessage("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return { loading, message, isSubmitted, forgotPassword };
};

export default useForgotPassword;
