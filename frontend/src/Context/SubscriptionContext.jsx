import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import PaymentAPI from "../apis/payment";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { userId, token, userRole } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isActive: false,
    loading: true,
    subscription: null,
    message: "",
    error: null,
    lastChecked: null,
    isPayingUser: false,
    paymentInfo: null,
  });

  const isCheckingRef = useRef(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const checkIfPayingUser = async (dealerId) => {
    try {
      // Call the dealer payment info endpoint to get payment info
      const result = await PaymentAPI.getDealerPaymentInfo(dealerId);
      if (result.success && result.data) {
        // If the user is the paying user, it will have different fields compared to non-paying users
        const isPayingUser = result.data.initiatedBy ? false : true;
        return {
          isPayingUser,
          paymentInfo: result.data,
        };
      }
      return { isPayingUser: false, paymentInfo: null };
    } catch (error) {
      console.error("Error checking if paying user:", error);
      return { isPayingUser: false, paymentInfo: null };
    }
  };

  const checkSubscriptionStatus = async (isRetry = false) => {
    if (!userId || !token) {
      setSubscriptionStatus({
        isActive: false,
        loading: false,
        subscription: null,
        message: "No user logged in",
        error: null,
        lastChecked: new Date().toISOString(),
      });
      return;
    }

    // Superadmin override: always premium without payment
    if (
      typeof userRole === "string" &&
      userRole.toLowerCase() === "superadmin"
    ) {
      setSubscriptionStatus({
        isActive: true,
        loading: false,
        subscription: {
          status: "active",
          subscriptionType: "superadmin",
          createdAt: new Date().toISOString(),
          source: "internal",
        },
        message: "Superadmin access - premium enabled without payment",
        error: null,
        lastChecked: new Date().toISOString(),
        isPayingUser: false,
        paymentInfo: null,
      });
      return;
    }

    // Prevent concurrent requests
    if (isCheckingRef.current && !isRetry) {
      return;
    }

    try {
      isCheckingRef.current = true;
      setSubscriptionStatus((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      // Use the new dealer payment info endpoint instead of legacy stripe endpoint
      const response = await fetch(`/api/v1/dealer-payment/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to fetch subscription status`,
        );
      }

      const result = await response.json();

      if (result.success) {
        // Adapt the dealer payment response to match the expected subscription format
        const subscription = result.data.subscription;

        // CRITICAL FIX: Check for both active paid subscriptions AND active trials (exclude cancelled)
        const isActive =
          subscription &&
          (subscription.status === "active" ||
            (subscription.status === "trialing" &&
              subscription.subscriptionType === "trial"));

        const message =
          result.data.message ||
          (isActive ? "Active subscription" : "No active subscription");

        // Reset retry count on successful response
        retryCountRef.current = 0;

        // Check if the user is the paying user
        let payingUserInfo = { isPayingUser: false, paymentInfo: null };
        if (result.data.subscription?.dealerId) {
          payingUserInfo = await checkIfPayingUser(
            result.data.subscription.dealerId,
          );
        }

        setSubscriptionStatus({
          isActive,
          loading: false,
          subscription: subscription,
          message,
          error: null,
          lastChecked: new Date().toISOString(),
          isPayingUser: payingUserInfo.isPayingUser,
          paymentInfo: payingUserInfo.paymentInfo,
        });

        // If subscription is incomplete and we haven't exceeded retries, show appropriate message
        if (
          !isActive &&
          message?.includes("incomplete") &&
          retryCountRef.current < maxRetries
        ) {
          setSubscriptionStatus((prev) => ({
            ...prev,
            message:
              "Payment processing... Please wait a few minutes for your subscription to activate.",
            error: "SUBSCRIPTION_INCOMPLETE",
          }));
        }
      } else {
        setSubscriptionStatus({
          isActive: false,
          loading: false,
          subscription: null,
          message: result.message || "Failed to get subscription status",
          error: "API_ERROR",
          lastChecked: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);

      retryCountRef.current += 1;

      if (retryCountRef.current >= maxRetries) {
        setSubscriptionStatus({
          isActive: false,
          loading: false,
          subscription: null,
          message:
            "Unable to verify subscription status. Please contact support if you believe this is an error.",
          error: "MAX_RETRIES_EXCEEDED",
          lastChecked: new Date().toISOString(),
        });
      } else {
        setSubscriptionStatus({
          isActive: false,
          loading: false,
          subscription: null,
          message: `Error checking subscription status (attempt ${retryCountRef.current}/${maxRetries})`,
          error: "NETWORK_ERROR",
          lastChecked: new Date().toISOString(),
        });
      }
    } finally {
      isCheckingRef.current = false;
    }
  };

  const refreshSubscriptionStatus = async () => {
    retryCountRef.current = 0; // Reset retry count for manual refresh
    await checkSubscriptionStatus();
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, [userId, token, userRole]);

  const value = {
    ...subscriptionStatus,
    refreshSubscriptionStatus,
    checkSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return context;
};
