import { useState, useCallback } from "react";

const useUpdatePricingEmail = () => {
  const [loading, setLoading] = useState("idle");

  const updateEmail = useCallback(async (pricingEmail) => {
    try {
      setLoading("loading");

      const response = await fetch("/api/v1/user/update-pricing-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pricingEmail }),
      });

      const result = await response.json();

      if (result.success) {
        setLoading("success");
      } else {
        setLoading("failed");
      }
    } catch (error) {
      console.error("Error updating pricing email:", error);
      setLoading("failed");
    }
  }, []);

  return { loading, updateEmail };
};

export default useUpdatePricingEmail;
