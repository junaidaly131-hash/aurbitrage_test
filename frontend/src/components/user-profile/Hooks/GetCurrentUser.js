import { useState, useEffect } from "react";

const useCurrentUserHook = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndPoint = "/api/v1/user/get-current-user";
  const fetchUser = async () => {
    try {
      const response = await fetch(apiEndPoint);
      const result = await response.json();
      if (result.success) {
        setUser(result.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching spot prices:", error);
      setLoading(false);
    }
  };

  return { user, loading, fetchUser };
};

export default useCurrentUserHook;
