import { useState, useCallback } from "react";

const useDeleteToken = () => {
  const [loading, setLoading] = useState("idle");

  const deleteToken = useCallback(async (type) => {
    try {
      setLoading("loading");

      let apiEndpoint = "";

      if (type.toLowerCase() === "stonex") {
        apiEndpoint = "/api/v1/user/delete-stonex-token";
      } else if (type.toLowerCase() === "dilliongage") {
        apiEndpoint = "/api/v1/user/delete-dilliongage-token";
      } else if (type.toLowerCase() === "upstate") {
        apiEndpoint = "/api/v1/user/delete-upstate-token";
      } else {
        console.error("Invalid token type:", type);
        setLoading("failed");
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setLoading("success");
      } else {
        setLoading("failed");
      }
    } catch (error) {
      console.error("Error Removing Token:", error);
      setLoading("failed");
    }
  }, []);

  return { loading, deleteToken };
};

export default useDeleteToken;
