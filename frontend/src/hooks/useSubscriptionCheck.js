import { useSubscription } from "../Context/SubscriptionContext";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useSubscriptionCheck = () => {
  const { isActive, loading } = useSubscription();

  const requireSubscription = useCallback(
    (action = "perform this action") => {
      if (loading) {
        toast.loading("Checking subscription status...");
        return false;
      }

      if (!isActive) {
        toast.error(
          `Subscription required to ${action}. Please upgrade your subscription.`,
        );
        return false;
      }

      return true;
    },
    [isActive, loading],
  );

  const withSubscriptionCheck = useCallback(
    (callback, action = "perform this action") => {
      return (...args) => {
        if (requireSubscription(action)) {
          return callback(...args);
        }
      };
    },
    [requireSubscription],
  );

  return {
    isActive,
    loading,
    requireSubscription,
    withSubscriptionCheck,
  };
};
