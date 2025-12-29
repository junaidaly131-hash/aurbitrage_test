import { useState } from "react";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (
    email,
    password,
    firstName,
    lastName,
    dealerName,
    phoneNo,
    referenceDealer1,
    referenceTrader1,
    referenceTraderEmail1,
    referenceTraderPhoneNo1,
    referenceDealer2,
    referenceTrader2,
    referenceTraderEmail2,
    referenceTraderPhoneNo2,
    referenceDealer3,
    referenceTrader3,
    referenceTraderEmail3,
    referenceTraderPhoneNo3,
  ) => {
    setLoading(true);
    setError(null);
    const apiEndpoint = `/api/v1/user/create`;
    let userRole = "admin";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          dealerName,
          phoneNo,
          userRole,
          referenceDealer1,
          referenceTrader1,
          referenceTraderEmail1,
          referenceTraderPhoneNo1,
          referenceDealer2,
          referenceTrader2,
          referenceTraderEmail2,
          referenceTraderPhoneNo2,
          referenceDealer3,
          referenceTrader3,
          referenceTraderEmail3,
          referenceTraderPhoneNo3,
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

  return { handleRegister, loading, error }; // Return the function and state
};

export default useCreateUser;
