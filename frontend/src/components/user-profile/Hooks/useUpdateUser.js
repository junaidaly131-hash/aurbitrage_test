import { useState, useCallback } from "react";
import { updateUser as updateUserApi } from "@/apis/user";
const useUpdateUser = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUserApi(formData);
      handleResponse(response);
    } catch (error) {
      setError(error.message || "Error fetching details");
      setLoading(false);
    }
  }, []);
  const handleResponse = (response) => {
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch details");
    }
    setResponse(response.data);
    setLoading(false);
  };

  return { response, loading, error, updateUser };
};

export default useUpdateUser;
