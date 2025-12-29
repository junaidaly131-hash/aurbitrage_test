import { useState, useEffect } from "react";

const useFetchInvitedUser = () => {
  const [invitedUser, setInvitedUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvitedUser = async (inviteId) => {
    let apiEndpoint = `/api/v1/user/get-invited-user/${inviteId}`;
    try {
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        const data = await response.json();
        setInvitedUser(data.data);
      } else {
        setError("Failed to fetch invited user");
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
      setError("An error occurred while fetching dealers");
    } finally {
      setLoading(false);
    }
  };

  return { invitedUser, loading, error, fetchInvitedUser };
};
export default useFetchInvitedUser;
