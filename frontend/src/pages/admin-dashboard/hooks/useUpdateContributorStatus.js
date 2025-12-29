import { useState } from "react";

const useUpdateContributorStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateContributorStatus = async (id, status) => {
    setLoading(true);
    const apiEndPoint = `/api/v1/dealer/contributor/update/${id}`;
    try {
      const response = await fetch(apiEndPoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contributor: status }),
      });
      if (!response.ok) {
        throw new Error(
          `Error updating contributor status: ${response.status} ${response.statusText}`,
        );
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error updating contributor status: ", error);
      setError(error);
      setLoading(false);
    }
  };

  return { updateContributorStatus, loading, error };
};

export default useUpdateContributorStatus;
