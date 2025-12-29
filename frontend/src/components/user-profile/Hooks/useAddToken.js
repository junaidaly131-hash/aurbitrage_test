import { useState, useCallback } from "react";

const useAddToken = () => {
  const [loading, setLoading] = useState("idle");

  const addToken = useCallback(async (credentials, type) => {
    try {
      setLoading("loading");

      let apiEndpoint = "";
      let requestBody = {};

      if (type === "StoneX" || type.toLowerCase() === "stonex") {
        apiEndpoint = "/api/v1/user/add-stonex-token";
        requestBody = { stoneXApiToken: credentials };
      } else if (
        type === "DillionGage" ||
        type.toLowerCase() === "dilliongage"
      ) {
        apiEndpoint = "/api/v1/user/add-dilliongage-token";
        requestBody = { dillionGageApiToken: credentials };
      } else if (type === "Upstate" || type === "upstate") {
        apiEndpoint = "/api/v1/user/add-upstate-token";
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
        setLoading("success");
      } else {
        setLoading("failed");
      }
    } catch (error) {
      console.error("Error adding token:", error);
      setLoading("failed");
    }
  }, []);

  return { loading, addToken };
};

export default useAddToken;
