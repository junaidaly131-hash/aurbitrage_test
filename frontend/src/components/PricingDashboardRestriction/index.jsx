import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSubscription } from "../../Context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Lock,
  NavigateNext,
  PostAdd,
  TrendingUp,
  CheckCircle,
  Payment,
  Dashboard,
  Star,
  Upgrade,
  CreditCard,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import PaymentAPI from "../../apis/payment";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  maxWidth: 800,
  width: "100%",
  maxHeight: "calc(100% - 32px)", // Use percentage instead of viewport units
  margin: "0 auto",
  borderRadius: theme.spacing(3),
  background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  color: "white",
  border: "1px solid rgba(219, 164, 45, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  overflow: "auto",
  boxSizing: "border-box",
  // Responsive adjustments
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
    maxWidth: "calc(100% - 32px)",
    maxHeight: "calc(100% - 32px)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
    maxWidth: "calc(100% - 16px)",
    maxHeight: "calc(100% - 16px)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "700",
  height: "56px",
  fontSize: "16px",
  borderRadius: 16,
  background: "linear-gradient(135deg, #DBA42D 0%, #F4D03F 100%)",
  color: "#000",
  textTransform: "none",
  boxShadow: "0 4px 20px rgba(219, 164, 45, 0.3)",
  margin: theme.spacing(1),
  minWidth: "200px",
  "&:hover": {
    background: "linear-gradient(135deg, #F4D03F 0%, #DBA42D 100%)",
    boxShadow: "0 6px 25px rgba(219, 164, 45, 0.4)",
    transform: "translateY(-2px)",
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
  margin: theme.spacing(1),
  minWidth: "180px",
  "&:hover": {
    backgroundColor: "rgba(219, 164, 45, 0.1)",
    borderColor: "#F4D03F",
    color: "#F4D03F",
  },
}));

const PricingDashboardRestriction = () => {
  const { userId, token, user } = useAuth();
  const { isActive, loading, refreshSubscriptionStatus } = useSubscription();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [trialEligible, setTrialEligible] = useState(true);
  const [trialMessage, setTrialMessage] = useState("");
  const [checkingEligibility, setCheckingEligibility] = useState(true);
  const [pricing, setPricing] = useState({
    price: 299,
    formattedPrice: "$299/month",
  });

  const basicFeatures = [
    "Access to the Posting Board and Messaging",
    "Post, save, and interact with dealer listings",
    "Message members or groups directly in-platform",
  ];

  const premiumFeatures = [
    "Real-time pricing on 1,100+ products from 8+ top market makers",
    "Side-by-side pricing comparisons and custom sheet integration",
    'Contact dealers directly about prices with "Message from Dashboard"',
    "Quick access to Favorites and QuickLists",
    "Advanced search and filtering tools",
  ];

  useEffect(() => {
    if (!loading && isActive) {
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
      // Don't check if user is not logged in
      if (!userId || !token) {
        console.log(
          "PricingDashboardRestriction - No user/token, skipping check",
        );
        setCheckingEligibility(false);
        return;
      }

      try {
        console.log(
          "PricingDashboardRestriction - Checking trial eligibility for userId:",
          userId,
        );
        const result = await PaymentAPI.getDealerPaymentInfo();
        console.log("PricingDashboardRestriction - Full API Response:", result);

        if (result.success && result.data) {
          const {
            paymentType,
            message,
            trialEligible: apiTrialEligible,
            hasUsedTrial,
            isCreatedBeforeCutoff,
            subscription,
          } = result.data;

          console.log(
            "PricingDashboardRestriction - Trial Eligibility Check:",
            {
              apiTrialEligible,
              hasUsedTrial,
              isCreatedBeforeCutoff,
              paymentType,
              subscription,
            },
          );

          // Check if trial is NOT eligible
          // Trial is not eligible if: hasUsedTrial is true OR trialEligible is false
          const isTrialNotEligible =
            hasUsedTrial === true || apiTrialEligible === false;

          console.log(
            "PricingDashboardRestriction - Setting trialEligible to:",
            !isTrialNotEligible,
          );

          if (isTrialNotEligible) {
            setTrialEligible(false);
            if (hasUsedTrial) {
              setTrialMessage("Your dealer has already used the free trial");
            } else if (paymentType === "trial") {
              setTrialMessage("Your dealer currently has an active trial");
            } else if (paymentType === "paid") {
              setTrialMessage("Your dealer already has an active subscription");
            } else {
              setTrialMessage("");
            }
          } else {
            setTrialEligible(true);
            setTrialMessage("");
          }
        } else {
          console.warn("PricingDashboardRestriction - API returned no data");
        }
      } catch (error) {
        console.error("Error checking trial eligibility:", error);
      } finally {
        setCheckingEligibility(false);
      }
    };

    checkTrialEligibility();
  }, [userId, token]);

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
        toast.success(`Your 14-day free trial has started for your dealer!`);
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
        toast.error(error.message);
        // Refresh to get the latest subscription status
        await refreshSubscriptionStatus();
      } else if (
        error.message &&
        error.message.includes("subscription is already being processed")
      ) {
        // This should be rare now with retry logic, but handle gracefully
        toast.success("Processing your subscription request. Please wait...");
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
        cancelUrl: `${window.location.origin}/dashboard/pricing?canceled=true`,
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
        toast.success("Checking your current subscription status...");
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

  // Debug logging at render time
  console.log("PricingDashboardRestriction - Render State:", {
    loading,
    checkingEligibility,
    trialEligible,
    trialMessage,
    userId,
    hasToken: !!token,
  });

  // Show loading while checking eligibility
  if (loading || checkingEligibility) {
    console.log("PricingDashboardRestriction - Rendering: Loading spinner");
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

  // Single-lane view for users who already used trial
  if (!trialEligible) {
    console.log(
      "PricingDashboardRestriction - Rendering: Single-lane view (trial not eligible)",
    );
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
          maxWidth: { xs: "100vw", sm: 800 },
          padding: { xs: 2, sm: 4 },
          background: "transparent",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          sx={{
            width: "100%",
            maxWidth: 600,
            background:
              "linear-gradient(135deg, rgba(219, 164, 45, 0.1) 0%, rgba(219, 164, 45, 0.05) 100%)",
            borderRadius: 4,
            p: { xs: 4, sm: 6 },
            border: "1px solid rgba(219, 164, 45, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
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
              opacity: 0.05,
              background: `
                radial-gradient(circle at 20% 20%, #DBA42D 2px, transparent 2px),
                radial-gradient(circle at 80% 80%, #DBA42D 2px, transparent 2px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            {/* Lock Icon */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Lock
                sx={{
                  fontSize: 64,
                  color: "#DBA42D",
                  filter: "drop-shadow(0 4px 12px rgba(219, 164, 45, 0.3))",
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "900",
                fontSize: { xs: "2rem", sm: "2.5rem" },
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Upgrade to
              <Box
                component="span"
                sx={{
                  display: "block",
                  background:
                    "linear-gradient(135deg, #DBA42D 0%, #F4D03F 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mt: 1,
                }}
              >
                Premium Access
              </Box>
            </Typography>

            {/* Trial message */}
            {trialMessage && (
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  mb: 4,
                  fontSize: "0.95rem",
                }}
              >
                {trialMessage}
              </Typography>
            )}

            {/* Pricing */}
            <Box mb={4}>
              <Typography
                variant="h2"
                sx={{
                  color: "#DBA42D",
                  fontWeight: "800",
                  fontSize: "3.5rem",
                  mb: 1,
                }}
              >
                ${pricing.price}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}
              >
                per month
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                Billed monthly • Cancel anytime
              </Typography>
            </Box>

            {/* Features */}
            <Box mb={4}>
              <Grid container spacing={1.5}>
                {premiumFeatures.slice(0, 5).map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1.5}
                      p={1.5}
                      sx={{
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: 1.5,
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        textAlign: "left",
                      }}
                    >
                      <CheckCircle sx={{ color: "#4CAF50", fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* CTA Button */}
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
              sx={{ mb: 2 }}
            >
              {isProcessing ? "Processing..." : "Upgrade to Premium"}
            </StyledButton>

            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}
            >
              Secure payment powered by Stripe
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Two-column view for users eligible for trial
  console.log(
    "PricingDashboardRestriction - Rendering: Two-column view (trial eligible)",
  );
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
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        my={5}
        flexWrap="wrap"
        gap={2}
        sx={{ position: "relative", zIndex: 1 }}
      >
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
              my: 2,
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

      {/* Two-column layout */}
      <Grid container sx={{ minHeight: "70vh" }}>
        {/* Left side - Basic Membership */}
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
                Your Current
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
                  Basic Plan
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
                Access to community features and basic trading tools
              </Typography>

              <Box mb={4}>
                <Grid container spacing={2}>
                  {basicFeatures.map((feature, index) => (
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
                <Box>
                  {trialEligible && (
                    <>
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
                        🎉 Try the Premium membership with a 14-day free trial
                      </Typography>
                      <StyledButton
                        variant="contained"
                        onClick={handleStartTrial}
                        disabled={isProcessing}
                        fullWidth
                        startIcon={
                          isProcessing ? (
                            <CircularProgress
                              size={20}
                              sx={{ color: "#000" }}
                            />
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
                          : "Start Your FREE Trial"}
                      </StyledButton>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.6)",
                          textAlign: "center",
                        }}
                      >
                        No credit card required
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Premium Membership */}
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
              Premium Membership - ${pricing.formattedPrice}
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

            <Box mb={4}>
              <Grid container spacing={2}>
                {premiumFeatures.map((feature, index) => (
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
                  {isProcessing ? "Processing..." : "Upgrade Now"}
                </StyledButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PricingDashboardRestriction;
