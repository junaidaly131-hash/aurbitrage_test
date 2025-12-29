import { useState, useCallback } from "react";

const useValidateDillionGageToken = () => {
  const [validateToken, setValidateToken] = useState({});
  const [loading, setLoading] = useState("loading");

  const apiEndpoint = "/api/v1/user/validate-dilliongage-token";

  const ValidateToken = useCallback(
    async (dillionGageApiToken) => {
      try {
        setLoading("loading");
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dillionGageApiToken }),
        });
        const result = await response.json();
        if (result.success) {
          setValidateToken(result.data);
          setLoading("success");
        } else {
          setLoading("failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading("failed");
      }
    },
    [apiEndpoint],
  );

  return { validateToken, loading, ValidateToken };
};

export default useValidateDillionGageToken;
