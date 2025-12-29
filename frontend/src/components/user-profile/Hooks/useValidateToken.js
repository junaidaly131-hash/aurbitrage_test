import { useState, useCallback } from "react";

const useValidateToken = () => {
  const [validateToken, setValidateToken] = useState({});
  const [loading, setLoading] = useState("idle");

  const ValidateToken = useCallback(async (type, credentials) => {
    try {
      setLoading("loading");

      let apiEndpoint = "";
      let requestBody = {};

      if (type.toLowerCase() === "StoneX".toLowerCase()) {
        apiEndpoint = "/api/v1/user/validate-stonex-token";
        requestBody = { stoneXApiToken: credentials };
      } else if (type.toLowerCase() === "DillionGage".toLowerCase()) {
        apiEndpoint = "/api/v1/user/validate-dilliongage-token";
        requestBody = { dillionGageApiToken: credentials };
      } else if (type.toLowerCase() === "Upstate".toLowerCase()) {
        apiEndpoint = "/api/v1/user/validate-upstate-token";
        requestBody = {
          email: credentials.email,
          password: credentials.password,
        };
      } else {
        console.error("Invalid token type:", type);
        setLoading("failed");
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.success) {
        setValidateToken(result.data);
        setLoading("success");
      } else {
        setLoading("failed");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setLoading("failed");
    }
  }, []);

  return { validateToken, loading, ValidateToken };
};

export default useValidateToken;
