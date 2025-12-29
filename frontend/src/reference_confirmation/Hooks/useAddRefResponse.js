import { useState } from "react";

const useAddRefResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddResponse = async (
    referenceFeedback,
    referenceId,
    goodUnderstanding,
    wouldRecommend,
  ) => {
    setLoading(true);
    setError(null);
    const apiEndpoint = "/api/v1/refResponse/add";
    try {
      const response = await fetch(apiEndpoint, {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          referenceFeedback,
          referenceId,
          goodUnderstanding,
          wouldRecommend,
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
  return { handleAddResponse, loading, error };
};
export default useAddRefResponse;
