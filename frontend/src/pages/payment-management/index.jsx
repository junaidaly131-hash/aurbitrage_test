import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSubscription } from "../../Context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  CreditCard,
  Payment,
  Security,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Warning,
  Info,
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

const PaymentManagementPage = () => {
  const { user } = useAuth();
  const { isActive, loading, subscription, refreshSubscriptionStatus } =
    useSubscription();
  const navigate = useNavigate();
  const [billingData, setBillingData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [showUpdateCardDialog, setShowUpdateCardDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!loading && !isActive) {
      toast.error("You need an active subscription to manage payment details");
      navigate("/dashboard/payment");
      return;
    }
  }, [isActive, loading, navigate]);

  useEffect(() => {
    if (user?.dealerId && isActive) {
      fetchBillingData();
      fetchPaymentInfo();
    }
  }, [user, isActive]);

  const fetchBillingData = async () => {
    try {
      setLoadingBilling(true);
      setAccessDenied(false);
      // Use the new dealer payment service which restricts access to paying users only
      const result = await PaymentAPI.getDealerInvoices();
      if (result.success) {
        setBillingData({
          invoices: result.invoices || [],
          paymentMethods: result.paymentMethods || [],
          customer: result.customer,
        });
      } else {
        // If user is not the paying user, show access denied
        if (result.message?.includes("Access denied")) {
          setAccessDenied(true);
          setBillingData(null);
        } else {
          toast.error(result.message || "Failed to load billing information");
        }
      }
    } catch (error) {
      console.error("Error fetching billing data:", error);
      if (error.message?.includes("Access denied")) {
        setAccessDenied(true);
        setBillingData(null);
      } else {
        toast.error("Failed to load billing information");
      }
    } finally {
      setLoadingBilling(false);
    }
  };

  const fetchPaymentInfo = async () => {
    try {
      const result = await PaymentAPI.getDealerPaymentInfo(user.dealerId);
      if (result.success) {
        setPaymentInfo(result.data);
      }
    } catch (error) {
      console.error("Error fetching payment info:", error);
    }
  };

  const handleAddPaymentMethod = () => {
    // This would typically open Stripe's payment method setup
    toast.info("Payment method management coming soon");
    setShowAddCardDialog(false);
  };

  const handleUpdatePaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setShowUpdateCardDialog(true);
  };

  const handleDeletePaymentMethod = async (paymentMethodId) => {
    try {
      // This would call an API to delete the payment method
      toast.info("Payment method deletion coming soon");
    } catch (error) {
      console.error("Error deleting payment method:", error);
      toast.error("Failed to delete payment method");
    }
  };

  const handleBackToProfile = () => {
    navigate("/dashboard/profile?tab=subscription");
  };

  if (loading || loadingBilling) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress sx={{ color: "#DBA42D" }} />
      </Box>
    );
  }

  if (!isActive) {
    return null; // Will redirect
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <IconButton onClick={handleBackToProfile} sx={{ color: "#DBA42D" }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "600" }}>
          Payment Management
        </Typography>
      </Box>

      {/* Subscription Status */}
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CheckCircle sx={{ color: "#DBA42D" }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Active Subscription
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#cccccc", mb: 2 }}>
            Your subscription is active and will automatically renew. You can
            manage your payment methods and billing information below.
          </Typography>
          <Box display="flex" gap={2}>
            <SecondaryButton
              startIcon={<Refresh />}
              onClick={() => {
                fetchBillingData();
                fetchPaymentInfo();
              }}
            >
              Refresh Data
            </SecondaryButton>
          </Box>
        </CardContent>
      </StyledCard>

      {/* Payment Methods */}
      <StyledCard>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CreditCard sx={{ color: "#DBA42D" }} />
              <Typography variant="h6" sx={{ color: "white" }}>
                Payment Methods
              </Typography>
            </Box>
            {!accessDenied && (
              <StyledButton
                startIcon={<Add />}
                onClick={() => setShowAddCardDialog(true)}
              >
                Add Payment Method
              </StyledButton>
            )}
          </Box>

          {accessDenied ? (
            <Alert
              severity="warning"
              sx={{ backgroundColor: "#ed6c02", color: "white" }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Access Restricted</strong>
              </Typography>
              <Typography variant="body2">
                Only the user who initiated the payment can manage payment
                methods and view detailed billing information.
                {paymentInfo?.initiatedBy && (
                  <>
                    {" "}
                    Contact <strong>{paymentInfo.initiatedBy}</strong> for
                    payment management.
                  </>
                )}
              </Typography>
            </Alert>
          ) : billingData?.paymentMethods?.length > 0 ? (
            <List>
              {billingData.paymentMethods.map((pm) => (
                <ListItem
                  key={pm.id}
                  sx={{
                    border: "1px solid #666666",
                    borderRadius: 1,
                    mb: 1,
                    backgroundColor: "#191919",
                  }}
                >
                  <ListItemIcon>
                    <CreditCard sx={{ color: "#DBA42D" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: "white", fontWeight: "500" }}>
                        {pm.card?.brand?.toUpperCase()} •••• {pm.card?.last4}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color: "#cccccc" }}>
                        Expires {pm.card?.expMonth}/{pm.card?.expYear}
                      </Typography>
                    }
                  />
                  <Box display="flex" gap={1}>
                    <Tooltip title="Update Payment Method">
                      <IconButton
                        size="small"
                        onClick={() => handleUpdatePaymentMethod(pm)}
                        sx={{ color: "#DBA42D" }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Payment Method">
                      <IconButton
                        size="small"
                        onClick={() => handleDeletePaymentMethod(pm.id)}
                        sx={{ color: "#ff4444" }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Alert
              severity="info"
              sx={{ backgroundColor: "#191919", color: "#cccccc" }}
            >
              No payment methods found. Add a payment method to manage your
              subscription.
            </Alert>
          )}
        </CardContent>
      </StyledCard>

      {/* Billing Information */}
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Payment sx={{ color: "#DBA42D" }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Billing Information
            </Typography>
          </Box>

          {accessDenied ? (
            <Alert
              severity="warning"
              sx={{ backgroundColor: "#ed6c02", color: "white" }}
            >
              <Typography variant="body2">
                Detailed billing information is only available to the user who
                initiated the payment.
                {paymentInfo?.initiatedBy && (
                  <>
                    {" "}
                    Contact <strong>{paymentInfo.initiatedBy}</strong> for
                    billing details.
                  </>
                )}
              </Typography>
            </Alert>
          ) : billingData?.customer ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                  Customer Email
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {billingData.customer.email}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                  Customer ID
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontFamily: "monospace" }}
                >
                  {billingData.customer.id}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Alert
              severity="warning"
              sx={{ backgroundColor: "#191919", color: "#cccccc" }}
            >
              Billing information not available. Please contact support if you
              need assistance.
            </Alert>
          )}
        </CardContent>
      </StyledCard>

      {/* Security Notice */}
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Security sx={{ color: "#DBA42D" }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Security & Privacy
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#cccccc", mb: 2 }}>
            Your payment information is securely processed by Stripe, a
            PCI-compliant payment processor. We never store your full card
            details on our servers.
          </Typography>
          <List>
            <ListItem sx={{ py: 0 }}>
              <ListItemIcon>
                <CheckCircle sx={{ color: "#4CAF50", fontSize: "20px" }} />
              </ListItemIcon>
              <ListItemText
                primary="PCI DSS Compliant"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemIcon>
                <CheckCircle sx={{ color: "#4CAF50", fontSize: "20px" }} />
              </ListItemIcon>
              <ListItemText
                primary="256-bit SSL Encryption"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemIcon>
                <CheckCircle sx={{ color: "#4CAF50", fontSize: "20px" }} />
              </ListItemIcon>
              <ListItemText
                primary="SOC 2 Type II Certified"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
          </List>
        </CardContent>
      </StyledCard>

      {/* Add Payment Method Dialog */}
      <Dialog
        open={showAddCardDialog}
        onClose={() => setShowAddCardDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #666666",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Add Payment Method</DialogTitle>
        <DialogContent>
          <Alert
            severity="info"
            sx={{ mb: 2, backgroundColor: "#191919", color: "#cccccc" }}
          >
            Payment method management is handled securely by Stripe. This
            feature will be available soon.
          </Alert>
          <Typography variant="body2" sx={{ color: "#cccccc" }}>
            You'll be able to add new payment methods, update existing ones, and
            manage your billing information directly through Stripe's secure
            interface.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <SecondaryButton onClick={() => setShowAddCardDialog(false)}>
            Close
          </SecondaryButton>
          <StyledButton onClick={handleAddPaymentMethod}>
            Continue to Stripe
          </StyledButton>
        </DialogActions>
      </Dialog>

      {/* Update Payment Method Dialog */}
      <Dialog
        open={showUpdateCardDialog}
        onClose={() => setShowUpdateCardDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #666666",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Update Payment Method</DialogTitle>
        <DialogContent>
          <Alert
            severity="info"
            sx={{ mb: 2, backgroundColor: "#191919", color: "#cccccc" }}
          >
            Payment method updates are handled securely by Stripe. This feature
            will be available soon.
          </Alert>
          {selectedPaymentMethod && (
            <Typography variant="body2" sx={{ color: "#cccccc" }}>
              Update your {selectedPaymentMethod.card?.brand?.toUpperCase()}{" "}
              card ending in {selectedPaymentMethod.card?.last4}.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <SecondaryButton onClick={() => setShowUpdateCardDialog(false)}>
            Close
          </SecondaryButton>
          <StyledButton onClick={() => setShowUpdateCardDialog(false)}>
            Continue to Stripe
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentManagementPage;
