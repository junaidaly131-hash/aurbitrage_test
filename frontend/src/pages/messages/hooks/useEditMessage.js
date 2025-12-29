import { useState } from "react";
import axios from "axios";
import { useSocketContext } from "@/Context/SocketContext";

const useEditMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { socket } = useSocketContext();

  const editMessage = async (messageId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `/api/v1/message/edit/${messageId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "An error occurred");
      throw err;
    }
  };

  return { editMessage, loading, error };
};

export default useEditMessage;
