import { useState } from "react";
import axios from "axios";

const useGetApiKeys = () => {
  const [apiKeys, setApiKeys] = useState({
    stoneXApiToken: "",
    dillionGageApiToken: "",
    upstateEmail: "",
    upstatePassword: "",
  });
  const [loading, setLoading] = useState("idle");
  const [error, setError] = useState(null);
  const apiEndPoint = "/api/v1/user/get-api-keys";

  const fetchApiKeys = async () => {
    setLoading("pending");
    setError(null);
    try {
      const response = await axios.get(apiEndPoint);
      if (response.status === 200) {
        setApiKeys(response.data.data);
        setLoading("success");
      } else {
        setError("Failed to fetch API keys.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setLoading("failed");
    }
  };

  return { apiKeys, loading, error, fetchApiKeys };
};

export default useGetApiKeys;
