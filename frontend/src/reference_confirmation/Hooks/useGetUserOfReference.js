import { useState, useEffect } from "react";

const useGetUserOfReference = () => {
  const [userReference, setUserReference] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserOfReference = async (refId) => {
    const apiEndpoint = `/api/v1/user/get-reference-user/${refId}`;

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(
          `Error fetching pending users: ${response.status} ${response.statusText}`,
        );
      }
      const res = await response.json();
      setUserReference(res.data);
    } catch (error) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { userReference, loading, error, getUserOfReference };
};

export default useGetUserOfReference;
