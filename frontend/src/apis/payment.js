import { getAuthToken } from "./api";

/**
 * Payment API service for application payment operations
 * Uses the DealerPaymentService (primary) and StripeService (legacy)
 */
class PaymentAPI {
  /**
   * Create a Stripe checkout session
   * @param {Object} params - Payment parameters
   * @param {number} params.userId - User ID
   * @param {string} params.successUrl - Success redirect URL
   * @param {string} params.cancelUrl - Cancel redirect URL
   * @returns {Promise<Object>} Checkout session data
   * @deprecated Use createDealerCheckoutSession instead
   */
  static async createCheckoutSession(params) {
    console.warn(
      "⚠️ Deprecated: Use PaymentAPI.createDealerCheckoutSession() instead",
    );

    // Transform parameters to match dealer payment format
    const dealerParams = {
      planId: params.planId,
      successUrl: params.successUrl,
      cancelUrl: params.cancelUrl,
    };

    return this.createDealerCheckoutSession(dealerParams);
  }

  /**
   * Get subscription status for a user (via dealer payment system)
   * @param {number} userId - User ID (deprecated, now uses current user's dealer)
   * @returns {Promise<Object>} Subscription status data
   */
  static async getSubscriptionStatus(userId) {
    console.warn(
      "⚠️ getSubscriptionStatus is deprecated. Use getDealerPaymentInfo() instead.",
    );

    try {
      // Use the new dealer payment info endpoint instead
      return await this.getDealerPaymentInfo();
    } catch (error) {
      console.error("Error getting subscription status:", error);
      throw error;
    }
  }

  /**
   * Get subscription details for a user (via dealer payment system)
   * @param {number} userId - User ID (deprecated, now uses current user's dealer)
   * @returns {Promise<Object>} Subscription details data
   */
  static async getSubscriptionDetails(userId) {
    console.warn(
      "⚠️ getSubscriptionDetails is deprecated. Use getDealerPaymentInfo() instead.",
    );

    try {
      // Use the new dealer payment info endpoint instead
      return await this.getDealerPaymentInfo();
    } catch (error) {
      console.error("Error getting subscription details:", error);
      throw error;
    }
  }

  /**
   * Cancel subscription for current user's dealer
   * @param {number} userId - User ID (deprecated, now uses current user's dealer)
   * @param {string} reason - Cancellation reason (optional)
   * @returns {Promise<Object>} Cancellation result
   */
  static async cancelSubscription(userId, reason = null) {
    console.warn(
      "⚠️ cancelSubscription with userId is deprecated. Use cancelDealerSubscription() instead.",
    );

    try {
      // Use dealer-based cancellation instead of user-based
      return await this.cancelDealerSubscription(reason);
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  }

  /**
   * Cancel subscription for current user's dealer (primary method)
   * @param {string} reason - Cancellation reason (optional)
   * @returns {Promise<Object>} Cancellation result
   */
  static async cancelDealerSubscription(reason = null) {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/v1/dealer-payment/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(reason && { cancellationReason: reason }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel subscription");
      }

      return await response.json();
    } catch (error) {
      console.error("Error canceling dealer subscription:", error);
      throw error;
    }
  }

  /**
   * Reactivate subscription for current user's dealer
   * @param {number} userId - User ID (deprecated, now uses current user's dealer)
   * @returns {Promise<Object>} Reactivation result
   */
  static async reactivateSubscription(userId) {
    console.warn(
      "⚠️ reactivateSubscription with userId is deprecated. Use reactivateDealerSubscription() instead.",
    );

    try {
      return await this.reactivateDealerSubscription();
    } catch (error) {
      console.error("Error reactivating subscription:", error);
      throw error;
    }
  }

  /**
   * Reactivate subscription for current user's dealer (primary method)
   * @returns {Promise<Object>} Reactivation result
   */
  static async reactivateDealerSubscription() {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/v1/dealer-payment/reactivate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to reactivate subscription",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error reactivating dealer subscription:", error);
      throw error;
    }
  }

  /**
   * Get Stripe publishable key
   * @returns {Promise<Object>} Publishable key data
   */
  static async getPublishableKey() {
    try {
      const response = await fetch("/api/v1/stripe/publishable-key", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get publishable key");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting publishable key:", error);
      throw error;
    }
  }

  /**
   * Verify payment status proactively
   * Called when frontend receives success signal before webhook callback
   * @param {number} userId - User ID
   * @param {string} sessionId - Stripe checkout session ID (optional)
   * @returns {Promise<Object>} Verification result
   */
  static async verifyPaymentStatus(userId, sessionId = null) {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/v1/stripe/payment/verify/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to verify payment status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying payment status:", error);
      throw error;
    }
  }

  /**
   * Start a 14-day trial for a dealer
   * @param {number} userId - User ID
   * @param {number} dealerId - Dealer ID (optional, auto-detected if not provided)
   * @returns {Promise<Object>} Trial start result
   * @deprecated Use the standard startDealerTrial method that doesn't require userId
   */
  static async startDealerTrial(userId, dealerId = null) {
    console.warn(
      "⚠️ Deprecated: Use PaymentAPI.startDealerTrial() without userId parameter",
    );
    return this.startDealerTrialNew(dealerId);
  }

  /**
   * Check user access through their dealer
   * @param {number} userId - User ID
   * @returns {Promise<Object>} User access data
   * @deprecated Use checkUserAccessNew() instead which doesn't require userId
   */
  static async checkUserAccess(userId) {
    console.warn("⚠️ Deprecated: Use PaymentAPI.checkUserAccessNew() instead");
    return this.checkUserAccessNew();
  }

  /**
   * Check dealer access
   * @param {number} dealerId - Dealer ID
   * @returns {Promise<Object>} Dealer access data
   */
  static async checkDealerAccess(dealerId) {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/v1/stripe/dealer/access/${dealerId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check dealer access");
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking dealer access:", error);
      throw error;
    }
  }

  /**
   * Get billing history for a user
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Billing history data
   */
  static async getBillingHistory(userId) {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/v1/stripe/billing-history/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get billing history");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting billing history:", error);
      throw error;
    }
  }

  /**
   * Get invoice details
   * @param {string} invoiceId - Invoice ID
   * @returns {Promise<Object>} Invoice details data
   */
  static async getInvoiceDetails(invoiceId) {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/v1/stripe/invoice/${invoiceId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get invoice details");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting invoice details:", error);
      throw error;
    }
  }

  /**
   * Download invoice PDF
   * @param {string} invoiceId - Invoice ID
   * @returns {Promise<Blob>} Invoice PDF blob
   */
  static async downloadInvoice(invoiceId) {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `/api/v1/stripe/invoice/${invoiceId}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to download invoice");
      }

      return await response.blob();
    } catch (error) {
      console.error("Error downloading invoice:", error);
      throw error;
    }
  }

  /**
   * Sync subscription data from Stripe
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Sync result
   */
  static async syncSubscriptionData(userId) {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `/api/v1/stripe/subscription/sync/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to sync subscription data",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error syncing subscription data:", error);
      throw error;
    }
  }

  // ========== DEALER PAYMENT METHODS ==========

  /**
   * Check dealer payment status - basic info visible to all dealer users
   * @param {number} dealerId - Dealer ID
   * @returns {Promise<Object>} Dealer payment status
   */
  static async checkDealerPaymentStatus(dealerId) {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `/api/v1/dealer-payment/status/${dealerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to check dealer payment status",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking dealer payment status:", error);
      throw error;
    }
  }

  /**
   * Get dealer invoices - only accessible by paying user
   * @returns {Promise<Object>} Dealer invoices
   */
  static async getDealerInvoices() {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/v1/dealer-payment/invoices", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get dealer invoices");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting dealer invoices:", error);
      throw error;
    }
  }

  /**
   * Get dealer payment info for settings - visible to all dealer users
   * @param {number} dealerId - Dealer ID
   * @returns {Promise<Object>} Dealer payment info
   */
  static async getDealerPaymentInfo() {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/v1/dealer-payment/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to get dealer payment info",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting dealer payment info:", error);
      throw error;
    }
  }

  /**
   * Create checkout session for subscription
   * This is the primary method for creating checkout sessions
   * @param {Object} params - Checkout parameters
   * @returns {Promise<Object>} Checkout session result
   */
  static async createDealerCheckoutSession(params) {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/v1/dealer-payment/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create checkout session",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  }

  /**
   * Start a 14-day trial for a dealer using the DealerPaymentService
   * @param {number} dealerId - Dealer ID (optional, auto-detected from current user)
   * @returns {Promise<Object>} Trial start result
   */
  static async startDealerTrialNew(dealerId = null) {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/v1/dealer-payment/trial/start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(dealerId && { dealerId: dealerId }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to start dealer trial");
      }

      return await response.json();
    } catch (error) {
      console.error("Error starting dealer trial:", error);
      throw error;
    }
  }

  /**
   * PRIMARY METHOD: Start dealer trial (replaces legacy methods)
   * @param {number} dealerId - Dealer ID (optional, auto-detected from current user)
   * @returns {Promise<Object>} Trial start result
   */
  static async startTrial(dealerId = null) {
    return this.startDealerTrialNew(dealerId);
  }

  /**
   * Check user access through dealer payment service (primary method)
   * @returns {Promise<Object>} User access data
   */
  static async checkUserAccessNew() {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/v1/dealer-payment/user/access", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check user access");
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking user access:", error);
      throw error;
    }
  }

  /**
   * Check if current user is a paying user
   * @returns {Promise<Object>} Paying user status
   */
  static async isPayingUser() {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/v1/dealer-payment/is-paying-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to check paying user status",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking paying user status:", error);
      throw error;
    }
  }
}

export default PaymentAPI;
