import React, { useState, useEffect } from "react";
import { useSubscription } from "../../Context/SubscriptionContext";
import { useAuth } from "../../Context/AuthContext";
import BillingHistory from "./billing-history";
import PaymentAPI from "../../apis/payment";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle,
  Cancel,
  Warning,
  Upgrade,
  CalendarToday,
  Info,
  Payment,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: "#292929",
  color: "white",
  border: "1px solid #666666",
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "active"
      ? theme.palette.success.main
      : status === "trialing"
        ? "#4CAF50" // Green for trial
        : status === "canceled"
          ? theme.palette.error.main
          : status === "past_due"
            ? theme.palette.warning.main
            : "#666666",
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: "12px",
  height: "28px",
  "& .MuiChip-icon": {
    color: theme.palette.common.white,
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

const DangerButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "48px",
  fontSize: "13px",
  borderRadius: 10,
  backgroundColor: "transparent",
  color: theme.palette.danger.main,
  border: `1px solid ${theme.palette.danger.main}`,
  "&:hover": {
    backgroundColor: theme.palette.danger.main,
    color: "#fff",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#191919",
  color: "white",
  border: "1px solid #666666",
  borderRadius: theme.spacing(1),
}));

const SubscriptionManagement = () => {
  const { isActive, loading, subscription, refreshSubscriptionStatus } =
    useSubscription();
  const { userId, token, userRole } = useAuth();
  const [showTrialConfirmation, setShowTrialConfirmation] = useState(false);

  // Check if user is coming from a successful trial signup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("trial_started") === "true") {
      setShowTrialConfirmation(true);
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Close trial confirmation modal
  const handleCloseTrialConfirmation = () => {
    setShowTrialConfirmation(false);
  };

  // Check if user is paying user
  useEffect(() => {
    const checkPayingUser = async () => {
      try {
        setCheckingPayingUser(true);
        const result = await PaymentAPI.isPayingUser();
        setIsPayingUser(result.success && result.isPayingUser);
      } catch (error) {
        console.error("Error checking paying user status:", error);
        setIsPayingUser(false);
      } finally {
        setCheckingPayingUser(false);
      }
    };

    if (userId) {
      checkPayingUser();
    }
  }, [userId]);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [activeTab, setActiveTab] = useState("subscription");
  const [isPayingUser, setIsPayingUser] = useState(false);
  const [checkingPayingUser, setCheckingPayingUser] = useState(true);

  const isSuperadmin =
    typeof userRole === "string" && userRole.toLowerCase() === "superadmin";

  const handleUpgrade = async () => {
    if (!userId || !token) {
      return;
    }

    setIsUpgrading(true);
    try {
      // Use the primary dealer payment checkout method
      const result = await PaymentAPI.createDealerCheckoutSession({
        planId: "monthly", // Default to monthly plan for upgrade
        successUrl: `${window.location.origin}/dashboard/profile?tab=subscription&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/dashboard/profile?tab=subscription`,
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error(result.message || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to start upgrade process. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!userId || !token) {
      return;
    }

    setIsCanceling(true);
    try {
      const reason =
        cancellationReason === "other" ? otherReason : cancellationReason;

      // Use the new dealer-based cancellation method
      const result = await PaymentAPI.cancelDealerSubscription(reason);

      if (result.success) {
        toast.success(
          "Subscription cancellation scheduled. You'll have access until the end of your billing period.",
          { duration: 5000 },
        );
        setShowCancelDialog(false);
        setCancellationReason("");
        setOtherReason("");
        await refreshSubscriptionStatus();
      } else {
        toast.error(
          result.message || "Failed to cancel subscription. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error(
        error.message ||
          "Failed to cancel subscription. Please contact support if the issue persists.",
      );
    } finally {
      setIsCanceling(false);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!userId || !token) {
      toast.error("Please log in to continue");
      return;
    }

    try {
      // Use the new dealer-based reactivation method
      const result = await PaymentAPI.reactivateDealerSubscription();

      if (result.success) {
        toast.success(
          "🎉 Subscription reactivated successfully! Your subscription will continue at the end of the current period.",
          { duration: 5000 },
        );
        await refreshSubscriptionStatus();
      } else {
        toast.error(
          result.message ||
            "Failed to reactivate subscription. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error reactivating subscription:", error);
      toast.error(
        error.message ||
          "Failed to reactivate subscription. Please contact support.",
      );
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress sx={{ color: "#DBA42D" }} />
      </Box>
    );
  }

  // Check if user is on free trial - improved logic (exclude cancelled trials)
  const isOnTrial =
    subscription &&
    subscription.subscriptionType === "trial" &&
    subscription.status === "trialing" &&
    subscription.trialEndDate &&
    new Date(subscription.trialEndDate) > new Date();

  // Calculate days left in trial (only for active trials)
  const daysLeftInTrial =
    isOnTrial && subscription?.trialEndDate
      ? Math.ceil(
          (new Date(subscription.trialEndDate) - new Date()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  // Check if trial was cancelled
  const isCancelledTrial =
    subscription &&
    subscription.subscriptionType === "trial" &&
    subscription.status === "canceled";

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "white", fontWeight: "600", mb: 3 }}
      >
        Subscription Management
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "#666666", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: "#cccccc",
              "&.Mui-selected": {
                color: "#DBA42D",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#DBA42D",
            },
          }}
        >
          <Tab label="Subscription" value="subscription" />
          {!isSuperadmin && isPayingUser && (
            <Tab label="Billing History" value="billing" />
          )}
        </Tabs>
      </Box>

      {activeTab === "billing" ? (
        <BillingHistory />
      ) : (
        <>
          <StyledCard>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  Current Subscription Status
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <StatusChip
                    label={
                      isSuperadmin
                        ? "Active"
                        : isCancelledTrial
                          ? "Trial Cancelled"
                          : isOnTrial
                            ? `Trial (${daysLeftInTrial} day${daysLeftInTrial !== 1 ? "s" : ""} left)`
                            : subscription?.status === "active"
                              ? "Active"
                              : "Inactive"
                    }
                    status={
                      isSuperadmin
                        ? "active"
                        : isCancelledTrial
                          ? "canceled"
                          : isOnTrial
                            ? "trialing"
                            : subscription?.status
                    }
                    icon={
                      isSuperadmin ? (
                        <CheckCircle />
                      ) : isOnTrial ? (
                        <Warning />
                      ) : subscription?.status === "active" ? (
                        <CheckCircle />
                      ) : subscription?.status === "canceled" ? (
                        <Cancel />
                      ) : subscription?.status === "past_due" ? (
                        <Warning />
                      ) : (
                        <Cancel />
                      )
                    }
                  />
                </Box>
              </Box>

              {/* Membership Status Display */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                  Current Membership
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#DBA42D", fontWeight: 600, mb: 1 }}
                >
                  {isSuperadmin
                    ? "Premium Membership"
                    : isCancelledTrial
                      ? "Basic Membership"
                      : isOnTrial
                        ? "Premium Membership"
                        : subscription?.status === "active"
                          ? "Premium Membership"
                          : "Basic Membership"}
                </Typography>
                {isCancelledTrial && !isSuperadmin && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#f44336", fontWeight: 500 }}
                  >
                    Trial has been cancelled and will not renew
                  </Typography>
                )}
                {isOnTrial && !isSuperadmin && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#4CAF50", fontWeight: 500 }}
                  >
                    {daysLeftInTrial} day{daysLeftInTrial !== 1 ? "s" : ""} left
                    in free trial
                  </Typography>
                )}
                {!isSuperadmin && !isActive && (
                  <Typography variant="body2" sx={{ color: "#cccccc", mt: 1 }}>
                    Upgrade to Premium to unlock additional features and
                    capabilities.
                  </Typography>
                )}
              </Box>

              {(isSuperadmin || isActive) && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <StyledPaper elevation={1} sx={{ p: 2 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <CalendarToday
                          fontSize="small"
                          sx={{ color: "#DBA42D" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#999999" }}
                        >
                          Current Period
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {isSuperadmin ? (
                          "Always active (superadmin access)"
                        ) : subscription.currentPeriodStart &&
                          subscription.currentPeriodEnd ? (
                          <>
                            {new Date(
                              subscription.currentPeriodStart,
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {(() => {
                              // End date should be one day before renewal (fixed as requested)
                              const endDate = new Date(
                                subscription.currentPeriodEnd,
                              );
                              endDate.setDate(endDate.getDate() - 1);
                              return endDate.toLocaleDateString();
                            })()}
                          </>
                        ) : subscription.trialStartDate &&
                          subscription.trialEndDate ? (
                          <>
                            {new Date(
                              subscription.trialStartDate,
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {(() => {
                              // Trial end should be one day before renewal
                              const endDate = new Date(
                                subscription.trialEndDate,
                              );
                              endDate.setDate(endDate.getDate() - 1);
                              return endDate.toLocaleDateString();
                            })()}
                          </>
                        ) : subscription.createdAt ? (
                          <>
                            {(() => {
                              // Calculate period based on subscription creation date
                              const created = new Date(subscription.createdAt);
                              const now = new Date();
                              const nextBilling = new Date(created);
                              nextBilling.setMonth(nextBilling.getMonth() + 1);

                              if (now > nextBilling) {
                                // Calculate current period
                                const monthsPassed = Math.floor(
                                  (now.getTime() - created.getTime()) /
                                    (1000 * 60 * 60 * 24 * 30),
                                );
                                const periodStart = new Date(created);
                                periodStart.setMonth(
                                  periodStart.getMonth() + monthsPassed,
                                );
                                const periodEnd = new Date(periodStart);
                                periodEnd.setMonth(periodEnd.getMonth() + 1);
                                // End date should be one day before renewal
                                periodEnd.setDate(periodEnd.getDate() - 1);

                                return `${periodStart.toLocaleDateString()} - ${periodEnd.toLocaleDateString()}`;
                              } else {
                                // First month - end date should be one day before renewal
                                const endDate = new Date(nextBilling);
                                endDate.setDate(endDate.getDate() - 1);
                                return `${created.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
                              }
                            })()}
                          </>
                        ) : (
                          "Not available"
                        )}
                      </Typography>
                    </StyledPaper>
                  </Grid>

                  {/* Only show Next Payment for paid subscriptions, not trials, not cancelled, and never for superadmin */}
                  {!isSuperadmin &&
                    !isOnTrial &&
                    !subscription.cancelAtPeriodEnd && (
                      <Grid item xs={12} md={6}>
                        <StyledPaper elevation={1} sx={{ p: 2 }}>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mb={1}
                          >
                            <Payment
                              fontSize="small"
                              sx={{ color: "#DBA42D" }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "#999999" }}
                            >
                              Next Payment
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: "white" }}>
                            {subscription.currentPeriodEnd
                              ? new Date(
                                  subscription.currentPeriodEnd,
                                ).toLocaleDateString()
                              : subscription.createdAt
                                ? (() => {
                                    // Calculate next payment based on subscription creation date
                                    const created = new Date(
                                      subscription.createdAt,
                                    );
                                    const now = new Date();
                                    const nextBilling = new Date(created);
                                    nextBilling.setMonth(
                                      nextBilling.getMonth() + 1,
                                    );

                                    if (now > nextBilling) {
                                      // Calculate current period end
                                      const monthsPassed = Math.floor(
                                        (now.getTime() - created.getTime()) /
                                          (1000 * 60 * 60 * 24 * 30),
                                      );
                                      const periodStart = new Date(created);
                                      periodStart.setMonth(
                                        periodStart.getMonth() + monthsPassed,
                                      );
                                      const periodEnd = new Date(periodStart);
                                      periodEnd.setMonth(
                                        periodEnd.getMonth() + 1,
                                      );

                                      return periodEnd.toLocaleDateString();
                                    } else {
                                      // First month
                                      return nextBilling.toLocaleDateString();
                                    }
                                  })()
                                : "Not available"}
                          </Typography>
                        </StyledPaper>
                      </Grid>
                    )}

                  <Grid item xs={12} md={6}>
                    <StyledPaper elevation={1} sx={{ p: 2 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Info fontSize="small" sx={{ color: "#DBA42D" }} />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#999999" }}
                        >
                          Plan Type
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {isSuperadmin
                          ? "Superadmin Access"
                          : subscription.subscriptionType === "trial"
                            ? (() => {
                                // Calculate actual trial duration
                                if (
                                  subscription.trialStartDate &&
                                  subscription.trialEndDate
                                ) {
                                  const startDate = new Date(
                                    subscription.trialStartDate,
                                  );
                                  const endDate = new Date(
                                    subscription.trialEndDate,
                                  );
                                  const daysDiff = Math.ceil(
                                    (endDate - startDate) /
                                      (1000 * 60 * 60 * 24),
                                  );
                                  return `${daysDiff}-Day Free Trial`;
                                }
                                return "14-Day Free Trial"; // fallback
                              })()
                            : subscription.stripePriceId
                              ? "Premium Monthly"
                              : "Premium"}
                      </Typography>
                    </StyledPaper>
                  </Grid>

                  {/* Trial Days Remaining - only show for trials */}
                  {!isSuperadmin &&
                    subscription.subscriptionType === "trial" &&
                    subscription.trialEndDate && (
                      <Grid item xs={12}>
                        <StyledPaper
                          elevation={1}
                          sx={{
                            p: 2,
                            backgroundColor: "#1a3d1a",
                            border: "1px solid #4CAF50",
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mb={1}
                          >
                            <Warning
                              fontSize="small"
                              sx={{ color: "#4CAF50" }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "#4CAF50" }}
                            >
                              Trial Status
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: "white" }}>
                            {(() => {
                              const trialEnd = new Date(
                                subscription.trialEndDate,
                              );
                              const now = new Date();
                              const daysRemaining = Math.ceil(
                                (trialEnd.getTime() - now.getTime()) /
                                  (1000 * 60 * 60 * 24),
                              );

                              if (daysRemaining > 0) {
                                return `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining in your trial`;
                              } else if (daysRemaining === 0) {
                                return "Your trial ends today";
                              } else {
                                return "Your trial has expired";
                              }
                            })()}
                          </Typography>
                        </StyledPaper>
                      </Grid>
                    )}
                </Grid>
              )}

              <Divider sx={{ my: 3, borderColor: "#666666" }} />

              {/* Action Buttons - hidden for superadmin */}
              {!isSuperadmin && (
                <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                  {!isActive ? (
                    <StyledButton
                      variant="contained"
                      color="primary"
                      startIcon={<Upgrade />}
                      onClick={handleUpgrade}
                      disabled={isUpgrading}
                    >
                      {isUpgrading ? "Processing..." : "Upgrade Now"}
                    </StyledButton>
                  ) : (
                    <>
                      {/* TEMPORARILY DISABLED: Restriction removed - all users can manage subscriptions */}
                      {/* {isPayingUser && ( */}
                      <>
                        {subscription.status === "active" &&
                          subscription.cancelAtPeriodEnd && (
                            <StyledButton
                              variant="outlined"
                              color="primary"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleReactivateSubscription();
                              }}
                            >
                              Reactivate Subscription
                            </StyledButton>
                          )}

                        {subscription.status === "active" &&
                          !subscription.cancelAtPeriodEnd && (
                            <DangerButton
                              variant="outlined"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowCancelDialog(true);
                              }}
                            >
                              Cancel Subscription
                            </DangerButton>
                          )}

                        {subscription.status !== "active" && (
                          <StyledButton
                            variant="contained"
                            color="primary"
                            startIcon={<Upgrade />}
                            onClick={handleUpgrade}
                            disabled={isUpgrading}
                          >
                            {isUpgrading ? "Processing..." : "Upgrade Now"}
                          </StyledButton>
                        )}
                      </>
                      {/* )} */}

                      {/* TEMPORARILY DISABLED: Restriction message hidden */}
                      {/* {!isPayingUser && subscription && (
                        <Alert
                          severity="info"
                          sx={{
                            backgroundColor: "#191919",
                            color: "#cccccc",
                            border: "1px solid #666666",
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "white" }}>
                            Only the user who manages payments for your dealer can
                            modify subscription settings.
                          </Typography>
                        </Alert>
                      )} */}
                    </>
                  )}
                </Box>
              )}
            </CardContent>
          </StyledCard>

          {/* Cancellation Information */}
          {subscription && subscription.cancelAtPeriodEnd && (
            <StyledCard>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Info sx={{ color: "#DBA42D" }} />
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Subscription Cancellation
                  </Typography>
                </Box>
                <Alert
                  severity="info"
                  sx={{
                    mb: 2,
                    backgroundColor: "rgba(219, 164, 45, 0.1)",
                    color: "#DBA42D",
                    border: "1px solid rgba(219, 164, 45, 0.3)",
                  }}
                >
                  Your subscription is set to cancel at the end of your current
                  billing period. You'll continue to have full access to all
                  premium features until{" "}
                  {subscription.currentPeriodEnd
                    ? (() => {
                        const endDate = new Date(subscription.currentPeriodEnd);
                        endDate.setDate(endDate.getDate() - 1);
                        return endDate.toLocaleDateString();
                      })()
                    : subscription.trialEndDate
                      ? (() => {
                          const endDate = new Date(subscription.trialEndDate);
                          endDate.setDate(endDate.getDate() - 1);
                          return endDate.toLocaleDateString();
                        })()
                      : "the end of your billing period"}
                  . After that date, your subscription will not auto-renew.
                </Alert>
                <Typography variant="body2" sx={{ color: "#cccccc", mb: 2 }}>
                  If you change your mind, you can reactivate your subscription
                  at any time before it expires to continue with monthly
                  auto-renewal.
                </Typography>
              </CardContent>
            </StyledCard>
          )}

          {/* Cancel Subscription Dialog */}
          <Dialog
            open={showCancelDialog}
            onClose={(event, reason) => {
              if (reason === "backdropClick" || reason === "escapeKeyDown") {
                if (!isCanceling) {
                  setShowCancelDialog(false);
                }
              }
            }}
            disableEscapeKeyDown={isCanceling}
            PaperProps={{
              style: {
                backgroundColor: "#292929",
                color: "white",
                border: "1px solid #666666",
              },
              onClick: (e) => e.stopPropagation(),
            }}
          >
            <DialogTitle sx={{ color: "white" }}>
              Cancel Subscription
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: "#cccccc", mb: 2 }}>
                Are you sure you want to cancel your subscription? Here's what
                will happen:
              </DialogContentText>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                  • Your subscription will be set to cancel at the end of your
                  current billing period
                </Typography>
                <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                  • You'll continue to have full access until{" "}
                  {subscription?.currentPeriodEnd
                    ? (() => {
                        const endDate = new Date(subscription.currentPeriodEnd);
                        endDate.setDate(endDate.getDate() - 1);
                        return endDate.toLocaleDateString();
                      })()
                    : subscription?.trialEndDate
                      ? (() => {
                          const endDate = new Date(subscription.trialEndDate);
                          endDate.setDate(endDate.getDate() - 1);
                          return endDate.toLocaleDateString();
                        })()
                      : "the end of your billing period"}
                </Typography>
                <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                  • Your subscription will NOT auto-renew after that date
                </Typography>
                <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                  • You can reactivate anytime before your access expires
                </Typography>
              </Box>

              <Alert
                severity="info"
                sx={{
                  mb: 3,
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  color: "#2196f3",
                  border: "1px solid rgba(33, 150, 243, 0.3)",
                }}
              >
                Your subscription will remain active until the end of your paid
                period. You won't lose access immediately and no refunds will be
                processed.
              </Alert>

              <FormControl component="fieldset" sx={{ width: "100%", mb: 2 }}>
                <FormLabel
                  component="legend"
                  sx={{
                    color: "white",
                    mb: 2,
                    "&.Mui-focused": { color: "#DBA42D" },
                  }}
                >
                  Help us improve - Why are you canceling? (Optional)
                </FormLabel>
                <RadioGroup
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                >
                  <FormControlLabel
                    value="too_expensive"
                    control={
                      <Radio
                        sx={{
                          color: "#DBA42D",
                          "&.Mui-checked": { color: "#DBA42D" },
                          "&.Mui-disabled": { color: "#999999" },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "white" }}>
                        Too expensive
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="temporary_pause"
                    control={
                      <Radio
                        sx={{
                          color: "#DBA42D",
                          "&.Mui-checked": { color: "#DBA42D" },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "white" }}>
                        Temporary pause
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="other"
                    control={
                      <Radio
                        sx={{
                          color: "#DBA42D",
                          "&.Mui-checked": { color: "#DBA42D" },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "white" }}>Other</Typography>
                    }
                  />
                </RadioGroup>

                {cancellationReason === "other" && (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Please tell us more..."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    sx={{
                      mt: 2,
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "#666666" },
                        "&:hover fieldset": { borderColor: "#DBA42D" },
                        "&.Mui-focused fieldset": { borderColor: "#DBA42D" },
                      },
                      "& .MuiInputLabel-root": { color: "#cccccc" },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#999999",
                      },
                    }}
                  />
                )}
              </FormControl>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <SecondaryButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCancelDialog(false);
                }}
                disabled={isCanceling}
              >
                Keep Subscription
              </SecondaryButton>
              <DangerButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCancelSubscription();
                }}
                disabled={isCanceling}
                startIcon={
                  isCanceling ? <CircularProgress size={16} /> : <Cancel />
                }
              >
                {isCanceling ? "Canceling..." : "Cancel Subscription"}
              </DangerButton>
            </DialogActions>
          </Dialog>
        </>
      )}

      {/* Trial Confirmation Dialog */}
      <Dialog
        open={showTrialConfirmation}
        onClose={handleCloseTrialConfirmation}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#1a3d1a",
            color: "white",
            borderRadius: "12px",
            border: "1px solid #4CAF50",
          },
        }}
      >
        <DialogTitle sx={{ color: "#4CAF50", textAlign: "center" }}>
          <CheckCircle
            sx={{ fontSize: 60, display: "block", margin: "0 auto 10px" }}
          />
          Congratulations!
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 2, color: "white" }}
          >
            Your 14-day free trial as a Premium Member has now begun.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: "#e0e0e0" }}
          >
            You can now access all the features available on Aurbitrage.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <StyledButton
            variant="contained"
            onClick={() => {
              handleCloseTrialConfirmation();
              window.location.href = "/dashboard";
            }}
            sx={{ minWidth: "200px" }}
          >
            View Dashboard
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManagement;
