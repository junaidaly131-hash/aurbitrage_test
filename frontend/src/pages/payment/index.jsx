import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSubscription } from "../../Context/SubscriptionContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle,
  CreditCard,
  Message,
  Notifications,
  PostAdd,
  ArrowBack,
  TrendingUp,
  Security,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import PaymentAPI from "../../apis/payment";

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "700",
  height: "56px",
  fontSize: "16px",
  borderRadius: 16,
  background: "linear-gradient(135deg, #DBA42D 0%, #F4D03F 100%)",
  color: "#000",
  textTransform: "none",
  boxShadow: "0 4px 20px rgba(219, 164, 45, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #F4D03F 0%, #DBA42D 100%)",
    boxShadow: "0 6px 25px rgba(219, 164, 45, 0.4)",
    transform: "translateY(-2px)",
  },
  "&:disabled": {
    background: "#666666",
    color: "#999999",
    boxShadow: "none",
    transform: "none",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "48px",
  fontSize: "14px",
  borderRadius: 12,
  backgroundColor: "transparent",
  color: "#DBA42D",
  border: "2px solid #DBA42D",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(219, 164, 45, 0.1)",
    borderColor: "#F4D03F",
    color: "#F4D03F",
  },
}));

const PaymentPage = () => {
  const { userId, token, user } = useAuth();
  const { isActive, loading, refreshSubscriptionStatus } = useSubscription();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [trialEligible, setTrialEligible] = useState(true);
  const [trialMessage, setTrialMessage] = useState("");
  const [pricing, setPricing] = useState({
    price: 299,
    formattedPrice: "$299/month",
  });

  const premiumFeatures = [
    "Real-time pricing dashboard access",
    "Advanced search and filtering tools",
    "Price alerts and notifications",
    "Historical pricing data",
    "Export pricing reports",
    "Favorites and watchlists",
    "Priority customer support",
    "Unlimited users for your dealer",
  ];

  useEffect(() => {
    if (!loading && isActive) {
      toast.success("You already have an active subscription!");
      navigate("/dashboard/pricing/");
    }
  }, [isActive, loading, navigate]);

  // Fetch pricing data
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch("/api/v1/subscription-products/pricing");
        const data = await response.json();

        if (data.success && data.data) {
          setPricing({
            price: data.data.price,
            formattedPrice: data.data.formattedPrice,
          });
        }
      } catch (error) {
        console.error("Error fetching pricing:", error);
        // Keep default pricing if fetch fails
      }
    };

    fetchPricing();
  }, []);

  useEffect(() => {
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

    checkTrialEligibility();
  }, [user?.dealerId]);

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
        navigate("/dashboard/pricing/");
      } else {
        throw new Error(result.message || "Failed to start trial");
      }
    } catch (error) {
      console.error("Error starting trial:", error);

      // Handle different error scenarios gracefully
      if (
        error.message &&
        (error.message.includes("already has an active subscription") ||
          error.message.includes("already used the free trial"))
      ) {
        toast.error(error.message, { duration: 4000 });
        // Refresh to get the latest subscription status
        await refreshSubscriptionStatus();
      } else if (
        error.message &&
        error.message.includes("subscription is already being processed")
      ) {
        // This should be rare now with retry logic, but handle gracefully
        toast.success(
          "⏳ Processing your subscription request. Please wait...",
          { duration: 3000 },
        );
        await refreshSubscriptionStatus();
        setTimeout(async () => {
          await refreshSubscriptionStatus();
          if (isActive) {
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
        cancelUrl: `${window.location.origin}/dashboard/payment?canceled=true`,
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error(result.message || "Invalid response from server");
      }
    } catch (error) {
      console.error("Error processing payment:", error);

      // Handle race condition or existing subscription gracefully
      if (
        error.message &&
        (error.message.includes("subscription is already being processed") ||
          error.message.includes("already has an active subscription"))
      ) {
        toast.success("⏳ Checking your current subscription status...", {
          duration: 3000,
        });
        await refreshSubscriptionStatus();
        // Small delay to allow status refresh
        setTimeout(async () => {
          await refreshSubscriptionStatus();
          if (isActive) {
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

  const handleBackToDashboard = () => {
    navigate("/dashboard/posting-board");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress sx={{ color: "#DBA42D" }} />
      </Box>
    );
  }

  if (isActive) {
    return null;
  }

  return (
    <Box
      sx={{
        margin: "0 auto",
        minHeight: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: { xs: "100vw", sm: 1200 },
        padding: { xs: 1, sm: 2 },
        background: "transparent",
        position: "relative",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(219, 164, 45, 0.3)",
          borderRadius: "4px",
          "&:hover": {
            background: "rgba(219, 164, 45, 0.5)",
          },
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
        sx={{ position: "relative", zIndex: 1 }}
      >
        <SecondaryButton
          startIcon={<ArrowBack />}
          onClick={handleBackToDashboard}
          sx={{
            mr: 2,
            background: "rgba(219, 164, 45, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          Back to Posting Board
        </SecondaryButton>
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: "800",
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
              background: "linear-gradient(135deg, #ffffff 0%, #DBA42D 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Unlock Pricing Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "400",
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            Access real-time pricing data and professional trading tools
          </Typography>
        </Box>
      </Box>

      {searchParams.get("canceled") === "true" && (
        <Alert
          severity="warning"
          sx={{ mb: 3, backgroundColor: "#191919", color: "#cccccc" }}
        >
          Payment was canceled. You can try again or choose a different plan.
        </Alert>
      )}

      {/* Split-screen Layout */}
      <Grid container sx={{ minHeight: "70vh" }}>
        {/* Left Side - Hero Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(219, 164, 45, 0.15) 0%, rgba(219, 164, 45, 0.05) 100%)",
              borderRadius: { xs: 0, md: "0 0 0 24px" },
              p: { xs: 4, md: 6 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Pattern */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                background: `
                  radial-gradient(circle at 20% 20%, #DBA42D 2px, transparent 2px),
                  radial-gradient(circle at 80% 80%, #DBA42D 2px, transparent 2px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: { xs: "2.5rem", sm: "3.5rem" },
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                Unlock the
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #DBA42D 0%, #F4D03F 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Power of Data
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  mb: 4,
                  lineHeight: 1.5,
                  fontWeight: "400",
                }}
              >
                Real-time pricing insights and professional trading tools for
                serious dealers
              </Typography>

              <Box display="flex" alignItems="center" gap={3} mb={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#DBA42D",
                      fontWeight: "800",
                      fontSize: "3rem",
                    }}
                  >
                    ${pricing.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    per month
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
                  >
                    ✓ Billed monthly
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    ✓ Cancel anytime
                  </Typography>
                </Box>
              </Box>

              <Alert
                severity="info"
                sx={{
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  color: "#2196f3",
                  border: "1px solid rgba(33, 150, 243, 0.3)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">
                  <strong>Community features stay free!</strong> Only pricing
                  dashboard requires premium.
                </Typography>
              </Alert>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Features & Actions */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: "700",
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TrendingUp sx={{ color: "#DBA42D", fontSize: 32 }} />
              What You Get
            </Typography>

            <Box mb={4}>
              <Grid container spacing={2}>
                {premiumFeatures.slice(0, 6).map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      p={2}
                      sx={{
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: 2,
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: "rgba(219, 164, 45, 0.05)",
                          border: "1px solid rgba(219, 164, 45, 0.2)",
                        },
                      }}
                    >
                      <CheckCircle sx={{ color: "#4CAF50", fontSize: 20 }} />
                      <Typography
                        variant="body1"
                        sx={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "0.95rem",
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box display="flex" flexDirection="column" gap={3}>
              {trialEligible && (
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#4CAF50",
                      fontWeight: "600",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    🎉 Try Risk-Free
                  </Typography>
                  <StyledButton
                    variant="contained"
                    onClick={handleStartTrial}
                    disabled={isProcessing}
                    fullWidth
                    startIcon={
                      isProcessing ? (
                        <CircularProgress size={20} sx={{ color: "#000" }} />
                      ) : (
                        <CheckCircle />
                      )
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #81c784 0%, #4caf50 100%)",
                      },
                      mb: 2,
                    }}
                  >
                    {isProcessing
                      ? "Starting Trial..."
                      : "Start 14-Day Free Trial"}
                  </StyledButton>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      textAlign: "center",
                    }}
                  >
                    No credit card required • Full access for 14 days
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CreditCard sx={{ color: "#DBA42D" }} />
                  {trialEligible ? "Or Subscribe Directly" : "Get Started"}
                </Typography>
                <StyledButton
                  variant="contained"
                  onClick={handleSubscribeNow}
                  disabled={isProcessing}
                  fullWidth
                  startIcon={
                    isProcessing ? (
                      <CircularProgress size={20} sx={{ color: "#000" }} />
                    ) : (
                      <CreditCard />
                    )
                  }
                >
                  {isProcessing ? "Processing..." : "Subscribe Now"}
                </StyledButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section - Free Features */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          background: "rgba(255, 255, 255, 0.02)",
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "600",
            mb: 3,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Security sx={{ color: "#4CAF50" }} />
          Always Free Community Features
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <Message sx={{ color: "#DBA42D", fontSize: 28 }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "600", mb: 0.5 }}
                >
                  Messaging
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Real-time dealer communication
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <Notifications sx={{ color: "#DBA42D", fontSize: 28 }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "600", mb: 0.5 }}
                >
                  Notifications
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Market alerts and updates
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <PostAdd sx={{ color: "#DBA42D", fontSize: 28 }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "600", mb: 0.5 }}
                >
                  Advanced Posting
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Community engagement tools
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PaymentPage;
