import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSubscription } from "../../Context/SubscriptionContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle,
  Celebration,
  ArrowForward,
  Home,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import PaymentAPI from "../../apis/payment";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#292929",
  color: "white",
  border: "1px solid #666666",
  borderRadius: theme.spacing(2),
  maxWidth: 600,
  margin: "0 auto",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "48px",
  fontSize: "13px",
  borderRadius: 10,
  backgroundColor: theme.palette.secondary.main,
  color: "#000",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: "#000",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "48px",
  fontSize: "13px",
  borderRadius: 10,
  backgroundColor: "transparent",
  color: "#DBA42D",
  border: "1px solid #DBA42D",
  "&:hover": {
    backgroundColor: "#DBA42D",
    color: "#000",
  },
}));

const PaymentSuccessPage = () => {
  const { userId, token } = useAuth();
  const { isActive, loading, error, message, refreshSubscriptionStatus } =
    useSubscription();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  // Helper function to check if message indicates webhook-only mode
  const isWebhookOnlyMode = (message) => {
    return (
      message &&
      (message.includes("relying on webhooks only") ||
        message.includes("webhook processing") ||
        message.includes("Payment verification disabled"))
    );
  };

  useEffect(() => {
    // Check if this is a successful payment redirect and we haven't verified yet
    const paymentSuccess = searchParams.get("payment") === "success";
    const sessionId = searchParams.get("session_id");

    if (paymentSuccess && !hasVerified) {
      const verifyPayment = async () => {
        setIsVerifying(true);
        try {
          console.log(
            `[PaymentSuccess] Starting proactive payment verification for user ${userId}, sessionId: ${sessionId}`,
          );

          // Call the new proactive verification endpoint
          const result = await PaymentAPI.verifyPaymentStatus(
            userId,
            sessionId,
          );

          console.log(`[PaymentSuccess] Verification result:`, result);
          setVerificationResult(result);

          if (result.success && result.data.verified) {
            // Payment was verified successfully, refresh subscription status
            await refreshSubscriptionStatus();
            toast.success(
              "🎉 Payment verified successfully! Your subscription is now active.",
              { duration: 5000 },
            );
          } else if (result.success && isWebhookOnlyMode(result.data.message)) {
            // Webhook-only mode - this is expected, not an error
            console.log(
              `[PaymentSuccess] Webhook-only mode active: ${result.data.message}`,
            );
            // Refresh subscription status to get latest data from webhooks
            await refreshSubscriptionStatus();
            toast.success(
              "⏳ Payment processed! Your subscription will be activated shortly.",
              { duration: 4000 },
            );
          } else {
            // Payment verification failed or timed out
            console.warn(
              `[PaymentSuccess] Payment verification failed: ${result.data.message}`,
            );
            if (result.data.message.includes("timeout")) {
              toast.error(
                "Payment verification timed out. Please contact support if payment was successful.",
              );
            } else {
              toast.error(
                `Payment verification failed: ${result.data.message}`,
              );
            }
          }

          setHasVerified(true);
        } catch (error) {
          console.error(
            "[PaymentSuccess] Error during payment verification:",
            error,
          );
          setHasVerified(true);
          toast.error(
            "Error verifying payment. Please contact support if payment was successful.",
          );
        } finally {
          setIsVerifying(false);
        }
      };

      verifyPayment();
    }
  }, [searchParams, hasVerified, userId, refreshSubscriptionStatus]);

  // Show success toast after verification completes and subscription is active
  useEffect(() => {
    if (
      hasVerified &&
      !isVerifying &&
      isActive &&
      verificationResult?.success
    ) {
      toast.success("✅ Payment successful! Your subscription is now active.", {
        duration: 5000,
      });
    }
  }, [hasVerified, isVerifying, isActive, verificationResult]);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoToFeatures = () => {
    navigate("/dashboard/posting-board");
  };

  if (loading || isVerifying) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress sx={{ color: "#DBA42D" }} />
        <Typography variant="body1" sx={{ color: "white", ml: 2 }}>
          {isVerifying ? "Verifying payment..." : "Loading..."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <StyledCard>
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          {/* Success Icon */}
          <Box display="flex" justifyContent="center" mb={3}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#DBA42D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle sx={{ fontSize: 48, color: "#000" }} />
            </Box>
          </Box>

          {/* Success Message */}
          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: "600", mb: 2 }}
          >
            Payment Successful!
          </Typography>

          <Typography variant="body1" sx={{ color: "#cccccc", mb: 3 }}>
            Thank you for your subscription. Your payment has been processed
            successfully and your account has been upgraded.
          </Typography>

          {/* Subscription Status */}
          {isActive ? (
            <Alert
              severity="success"
              sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                ✅ Your subscription is now active!
              </Typography>
            </Alert>
          ) : verificationResult && !verificationResult.data.verified ? (
            isWebhookOnlyMode(verificationResult.data.message) ? (
              <Alert
                severity="info"
                sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
              >
                <Typography variant="body1" sx={{ color: "white" }}>
                  ⏳ Payment processed! Your subscription is being activated via
                  webhooks.
                </Typography>
              </Alert>
            ) : (
              <Alert
                severity="warning"
                sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
              >
                <Typography variant="body1" sx={{ color: "white" }}>
                  ⚠️{" "}
                  {verificationResult.data.message ||
                    "Payment verification failed. Please contact support."}
                </Typography>
              </Alert>
            )
          ) : error === "SUBSCRIPTION_INCOMPLETE" ? (
            <Alert
              severity="warning"
              sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                ⏳{" "}
                {message ||
                  "Your subscription is being processed. This may take a few minutes."}
              </Typography>
            </Alert>
          ) : error === "MAX_RETRIES_EXCEEDED" ? (
            <Alert
              severity="error"
              sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                ❌{" "}
                {message ||
                  "Unable to verify subscription status. Please contact support."}
              </Typography>
            </Alert>
          ) : error ? (
            <Alert
              severity="warning"
              sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                ⚠️{" "}
                {message ||
                  "There was an issue checking your subscription status."}
              </Typography>
            </Alert>
          ) : (
            <Alert
              severity="info"
              sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                ⏳ Your subscription is being activated. This may take a few
                minutes.
              </Typography>
            </Alert>
          )}

          {/* Features Available */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              🎉 You now have access to:
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              alignItems="center"
            >
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                • Send and receive messages
              </Typography>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                • Access to notifications
              </Typography>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                • Create and manage posts
              </Typography>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                • Advanced search filters
              </Typography>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                • Priority customer support
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <StyledButton
              variant="contained"
              onClick={handleGoToFeatures}
              startIcon={<ArrowForward />}
            >
              Explore Features
            </StyledButton>
            <SecondaryButton
              variant="outlined"
              onClick={handleGoToDashboard}
              startIcon={<Home />}
            >
              Go to Dashboard
            </SecondaryButton>
          </Box>

          {/* Celebration Icon */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Celebration sx={{ color: "#DBA42D", fontSize: 32 }} />
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default PaymentSuccessPage;
