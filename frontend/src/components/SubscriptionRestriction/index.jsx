import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSubscription } from "../../Context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Lock,
  NavigateNext,
  PostAdd,
  CheckCircle,
  CreditCard,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import PaymentAPI from "../../apis/payment";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#292929",
    color: "white",
    borderRadius: theme.spacing(2),
    border: "1px solid #666666",
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "100%",
    margin: theme.spacing(2),
  },
  "& .MuiDialog-container": {
    alignItems: "center",
    justifyContent: "center",
  },
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

const SubscriptionRestriction = ({
  children,
  requireSubscription = true,
  fallback = null,
  showUpgradeDialog = true,
  upgradeMessage = "This action requires an active subscription.",
}) => {
  const { userId, token, user } = useAuth();
  const { isActive, loading, refreshSubscriptionStatus } = useSubscription();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [trialEligible, setTrialEligible] = useState(true);
  const [trialMessage, setTrialMessage] = useState("");

  // If loading, show children or fallback
  if (loading) {
    return fallback || children;
  }

  // If subscription is not required or user has active subscription, show children
  if (!requireSubscription || isActive) {
    return children;
  }

  // If subscription is required but user doesn't have it
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (showUpgradeDialog) {
      checkTrialEligibility();
      setShowDialog(true);
    }
  };

  const checkTrialEligibility = async () => {
    if (!user?.dealerId) return;

    try {
      const result = await PaymentAPI.getDealerPaymentInfo(user.dealerId);
      if (result.success) {
        const { paymentType, message, trialEligible, hasUsedTrial } =
          result.data;

        if (!trialEligible || hasUsedTrial) {
          setTrialEligible(false);
          if (hasUsedTrial) {
            setTrialMessage("Your dealer has already used the free trial");
          } else if (paymentType === "trial") {
            setTrialMessage("Your dealer currently has an active trial");
          } else if (paymentType === "paid") {
            setTrialMessage("Your dealer already has an active subscription");
          }
        }
      }
    } catch (error) {
      console.error("Error checking trial eligibility:", error);
    }
  };

  const handleStartTrial = async () => {
    if (!userId || !token) {
      toast.error("Please log in to continue");
      return;
    }

    if (!trialEligible) {
      toast.error(trialMessage);
      return;
    }

    setIsProcessing(true);
    try {
      const result = await PaymentAPI.startDealerTrialNew(user?.dealerId);

      if (result.success) {
        toast.success(
          "🎉 Your 14-day free trial has started! Enjoy full premium access.",
          { duration: 5000 },
        );
        await refreshSubscriptionStatus();
        setShowDialog(false);
        navigate("/dashboard/pricing/");
      } else {
        throw new Error(result.message || "Failed to start trial");
      }
    } catch (error) {
      console.error("Error starting trial:", error);

      if (
        error.message &&
        (error.message.includes("already has an active subscription") ||
          error.message.includes("already used the free trial"))
      ) {
        toast.error(error.message);
        await refreshSubscriptionStatus();
      } else if (
        error.message &&
        error.message.includes("subscription is already being processed")
      ) {
        toast.success("Processing your subscription request. Please wait...");
        await refreshSubscriptionStatus();
        setTimeout(async () => {
          await refreshSubscriptionStatus();
          if (isActive) {
            setShowDialog(false);
            navigate("/dashboard/pricing/");
          }
        }, 2000);
      } else {
        toast.error(
          error.message || "Failed to start trial. Please try again.",
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubscribeNow = async () => {
    if (!userId || !token) {
      toast.error("Please log in to continue");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await PaymentAPI.createDealerCheckoutSession({
        planId: "monthly",
        successUrl: `${window.location.origin}/dashboard/payment/success?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/dashboard/posting-board?canceled=true`,
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error(result.message || "Invalid response from server");
      }
    } catch (error) {
      console.error("Error processing payment:", error);

      if (
        error.message &&
        (error.message.includes("subscription is already being processed") ||
          error.message.includes("already has an active subscription"))
      ) {
        toast.success("Checking your current subscription status...");
        await refreshSubscriptionStatus();
        setTimeout(async () => {
          await refreshSubscriptionStatus();
          if (isActive) {
            setShowDialog(false);
            navigate("/dashboard/pricing/");
          }
        }, 1500);
      } else {
        toast.error(
          error.message || "Failed to process payment. Please try again.",
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleGoToPostingBoard = () => {
    setShowDialog(false);
    navigate("/dashboard/posting-board");
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          position: "relative",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      >
        {children}
      </Box>

      <StyledDialog
        open={showDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "white", textAlign: "center" }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Lock sx={{ fontSize: 40, color: "#DBA42D" }} />
          </Box>
          Subscription Required
        </DialogTitle>
        <DialogContent sx={{ color: "white", textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "#cccccc", mb: 2 }}>
            {upgradeMessage}
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <Chip
              label="Premium Action"
              sx={{
                backgroundColor: "#DBA42D",
                color: "#000",
                fontWeight: "600",
                fontSize: "12px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="100%"
          >
            {trialEligible && (
              <>
                <Typography
                  variant="body2"
                  sx={{ color: "#4CAF50", fontWeight: "600" }}
                >
                  🎉 Start Your 14-Day Free Trial
                </Typography>
                <StyledButton
                  variant="contained"
                  onClick={handleStartTrial}
                  disabled={isProcessing}
                  startIcon={
                    isProcessing ? (
                      <CircularProgress size={20} sx={{ color: "#000" }} />
                    ) : (
                      <CheckCircle />
                    )
                  }
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #81c784 0%, #4caf50 100%)",
                    },
                  }}
                >
                  {isProcessing ? "Starting Trial..." : "Start Free Trial"}
                </StyledButton>
                <Typography
                  variant="body2"
                  sx={{ color: "#999999", fontSize: "12px" }}
                >
                  No credit card required • Full access
                </Typography>
              </>
            )}

            <Typography variant="body2" sx={{ color: "#999999", mt: 1 }}>
              {trialEligible ? "Or subscribe directly:" : "Get Started:"}
            </Typography>

            <SecondaryButton
              variant="outlined"
              onClick={handleSubscribeNow}
              disabled={isProcessing}
              startIcon={
                isProcessing ? (
                  <CircularProgress size={20} sx={{ color: "#DBA42D" }} />
                ) : (
                  <CreditCard />
                )
              }
              fullWidth
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </SecondaryButton>

            <Typography variant="body2" sx={{ color: "#999999", mt: 2 }}>
              Or explore free features:
            </Typography>

            <Button
              onClick={handleGoToPostingBoard}
              startIcon={<PostAdd />}
              sx={{
                color: "#999999",
                textTransform: "none",
                fontSize: "13px",
                "&:hover": {
                  color: "#DBA42D",
                },
              }}
            >
              Go to Posting Board
            </Button>

            <Button
              onClick={handleClose}
              sx={{
                color: "#666666",
                textTransform: "none",
                fontSize: "12px",
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default SubscriptionRestriction;
