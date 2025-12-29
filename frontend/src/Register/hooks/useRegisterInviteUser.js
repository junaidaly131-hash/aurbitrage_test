import { useState } from "react";

const useRegisterInvite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInviteRegister = async (
    email,
    password,
    firstName,
    lastName,
    dealerName,
    phoneNo,
    inviteId,
  ) => {
    setLoading(true);
    setError(null);
    const apiEndpoint = `/api/v1/user/register-invite-user`;
    let userRole = "admin";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          dealerName,
          phoneNo,
          userRole,
          inviteId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          throw new Error(errorData.data);
        } else {
          throw new Error(errorData.data);
        }
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleInviteRegister, loading, error };
};

export default useRegisterInvite;
