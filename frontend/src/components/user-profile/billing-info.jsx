import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Receipt,
  Payment,
  CreditCard,
  CalendarToday,
  CheckCircle,
  Cancel,
  Warning,
  Person,
  Refresh,
} from "@mui/icons-material";
import PaymentAPI from "../../apis/payment";
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
        ? theme.palette.warning.main
        : status === "canceled"
          ? theme.palette.error.main
          : "#666666",
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: "12px",
}));

const BillingInfo = () => {
  const { userId } = useAuth();
  const [billingInfo, setBillingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchBillingInfo();
    }
  }, [userId]);

  const fetchBillingInfo = async () => {
    try {
      setLoading(true);
      const result = await PaymentAPI.getDealerPaymentInfo();
      if (result.success) {
        setBillingInfo(result.data);
      } else {
        toast.error(result.message || "Failed to load billing information");
      }
    } catch (error) {
      console.error("Error fetching billing info:", error);
      toast.error("Failed to load billing information");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle fontSize="small" />;
      case "trialing":
        return <Warning fontSize="small" />;
      case "canceled":
        return <Cancel fontSize="small" />;
      default:
        return <Warning fontSize="small" />;
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

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "600" }}>
          Billing Information
        </Typography>
        <Button
          startIcon={<Refresh />}
          onClick={fetchBillingInfo}
          sx={{ color: "#DBA42D" }}
        >
          Refresh
        </Button>
      </Box>

      <StyledCard>
        <CardContent>
          <Grid container spacing={3}>
            {/* Subscription Status */}
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  Subscription Status
                </Typography>
                <StatusChip
                  label={billingInfo?.paymentType || "No Subscription"}
                  status={billingInfo?.paymentType}
                  icon={getStatusIcon(billingInfo?.paymentType)}
                />
              </Box>
            </Grid>

            {/* Payment Information */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #666666",
                  borderRadius: 1,
                  backgroundColor: "#191919",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Person fontSize="small" sx={{ color: "#DBA42D" }} />
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Payment Managed By
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {billingInfo?.initiatedBy ? (
                    <Link
                      component="a"
                      href={`/dashboard/profile/${billingInfo.initiatedByUserId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/dashboard/profile/${billingInfo.initiatedByUserId}`;
                      }}
                      sx={{
                        color: "#DBA42D",
                        textDecoration: "none",
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {billingInfo.initiatedBy}
                    </Link>
                  ) : (
                    "Not assigned"
                  )}
                </Typography>
              </Box>
            </Grid>

            {/* Next Payment/Trial End - Don't show for cancelled subscriptions */}
            {!(
              billingInfo?.subscription?.cancelAtPeriodEnd &&
              billingInfo?.paymentType !== "trial"
            ) && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #666666",
                    borderRadius: 1,
                    backgroundColor: "#191919",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarToday fontSize="small" sx={{ color: "#DBA42D" }} />
                    <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                      {billingInfo?.paymentType === "trial"
                        ? "Trial Ends"
                        : "Next Payment"}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {billingInfo?.paymentType === "trial"
                      ? billingInfo.trialEndDate
                      : billingInfo.nextBillingDate || "Not available"}
                  </Typography>
                </Box>
              </Grid>
            )}

            {/* Trial Status */}
            {billingInfo?.paymentType === "trial" && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #4CAF50",
                    borderRadius: 1,
                    backgroundColor: "#1a3d1a",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Warning fontSize="small" sx={{ color: "#4CAF50" }} />
                    <Typography variant="subtitle2" sx={{ color: "#4CAF50" }}>
                      Trial Status
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {billingInfo?.daysRemaining > 0
                      ? `${billingInfo.daysRemaining} day${
                          billingInfo.daysRemaining === 1 ? "" : "s"
                        } remaining in your trial`
                      : "Trial has expired"}
                  </Typography>
                </Box>
              </Grid>
            )}

            {/* Subscription Info */}
            {billingInfo?.paymentType === "paid" && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #666666",
                    borderRadius: 1,
                    backgroundColor: "#191919",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Payment fontSize="small" sx={{ color: "#DBA42D" }} />
                    <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                      Subscription Details
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {billingInfo?.subscriptionStatus === "active"
                      ? "Active subscription with monthly billing"
                      : billingInfo?.subscriptionStatus === "canceled"
                        ? "Subscription will end at the end of the current period"
                        : "Subscription status unknown"}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default BillingInfo;
