import { useState } from "react";
import axios from "axios";

const useUpdatePassword = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiEndPoint = "/api/v1/user/update-password";
  const updatePassword = async (updatedUserData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(apiEndPoint, updatedUserData);
      if (response.status === 200) {
        setResponse(response.data.data);
      } else {
        console.error("Error updating userdata:", response);
        setError(response.data.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, updatePassword };
};

export default useUpdatePassword;
