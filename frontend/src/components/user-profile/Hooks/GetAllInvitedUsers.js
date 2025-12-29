import { useState } from "react";
import axios from "axios";

const useGetInvitedUsers = () => {
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiEndPoint = "/api/v1/user/get-invited-users";
  const GetInvitedUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiEndPoint);
      if (response.status === 200) {
        setInvitedUsers(response.data.data);
      } else {
        console.error("Error updating userdata:", response);
        setError(response.data.data);
      }
    } catch (error) {
      console.error("Error Fetching invited users:", error);
      setError(error.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  return { invitedUsers, loading, error, GetInvitedUsers };
};

export default useGetInvitedUsers;
