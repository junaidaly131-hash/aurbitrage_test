import { useState } from "react";

const useActivateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activateUser = async (id, userType, status) => {
    setLoading(true);
    setError(null);
    const apiEndPoint = "/api/v1/user/change-status";

    try {
      const response = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status, userType }),
      });

      if (response.status === 403) {
        setError("Admin Cannot Update superadmin");
      } else if (!response.ok) {
        const errorMessage = `Error activating user: ${response.status} ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error while activating User: ", error);
      setError("An unexpected error occurred while activating the user.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, activateUser };
};

export default useActivateUser;
