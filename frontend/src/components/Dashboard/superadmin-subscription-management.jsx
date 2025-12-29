import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle,
  Cancel,
  Warning,
  ExpandMore,
  Search,
  Refresh,
  Business,
  Person,
  Payment,
  Schedule,
  PlayArrow,
  Add,
  Stop,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: "#292929",
  color: "white",
  border: "1px solid #666666",
}));

const getStatusColor = (status, theme) => {
  const colors = {
    active: theme.palette.success.main,
    trialing: "#4CAF50",
    trial_expired: "#ff9800",
    expired: "#ff9800",
    canceled: theme.palette.error.main,
    past_due: theme.palette.warning.main,
    payment_failed: "#f44336",
    recently_renewed: "#4CAF50",
    incomplete: "#ff9800",
    unpaid: "#f44336",
  };
  return colors[status] || "#666666";
};

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: getStatusColor(status, theme),
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: "12px",
  height: "28px",
  "& .MuiChip-icon": {
    color: theme.palette.common.white,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  borderRadius: theme.spacing(1),
  "& .MuiTableHead-root": {
    backgroundColor: "#333333",
  },
  "& .MuiTableCell-root": {
    borderBottom: "1px solid #444444",
    color: "white",
    padding: theme.spacing(1.5, 2),
    "&.MuiTableCell-head": {
      backgroundColor: "#333333",
      color: "#DBA42D",
      fontWeight: 600,
      fontSize: "14px",
    },
  },
  "& .MuiTableRow-root:hover": {
    backgroundColor: "#333333",
  },
  "& .MuiTable-root": {
    tableLayout: "fixed",
    minWidth: "100%",
  },
  "& .MuiTableHead-root .MuiTableCell-root": {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
}));

const SuperadminSubscriptionManagement = () => {
  const { userRole } = useAuth();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDealer, setExpandedDealer] = useState(null);

  // Trial management states
  const [enableTrialDialog, setEnableTrialDialog] = useState(false);
  const [extendTrialDialog, setExtendTrialDialog] = useState(false);
  const [cancelTrialDialog, setCancelTrialDialog] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [trialDays, setTrialDays] = useState(14);
  const [additionalDays, setAdditionalDays] = useState(7);
  const [processing, setProcessing] = useState(false);

  // Check if user is superadmin
  const isSuperadmin = userRole === "superadmin";

  useEffect(() => {
    if (isSuperadmin) {
      fetchDealersData();
    }
  }, [isSuperadmin]);

  const fetchDealersData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v1/superadmin/dealers-subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDealers(data.data.dealers || []);
        } else {
          toast.error(data.message || "Failed to fetch dealers data");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch dealers data");
      }
    } catch (error) {
      console.error("Error fetching dealers data:", error);
      toast.error("Failed to load dealers data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (dealer) => {
    const subscription = dealer.subscription;

    if (!subscription) {
      return {
        status: "no_subscription",
        label: "No Subscription",
        icon: <Cancel />,
        color: "#666666",
        description: "This dealer has no active subscription or trial",
      };
    }

    if (subscription.status === "active") {
      // Check if recently renewed (within last 7 days)
      const renewalDate = new Date(subscription.currentPeriodStart);
      const daysSinceRenewal = Math.floor(
        (new Date() - renewalDate) / (1000 * 60 * 60 * 24),
      );

      if (daysSinceRenewal <= 7) {
        return {
          status: "recently_renewed",
          label: "Recently Renewed",
          icon: <CheckCircle />,
          color: "#4CAF50",
          description: `Subscription renewed ${daysSinceRenewal} day${daysSinceRenewal !== 1 ? "s" : ""} ago`,
        };
      }

      return {
        status: "active",
        label: "Active",
        icon: <CheckCircle />,
        color: "#4CAF50",
        description: "Active subscription",
      };
    }

    if (subscription.status === "trialing") {
      // Check if trial has actually expired (even if status hasn't been updated yet)
      const now = new Date();
      const trialEndDate = subscription.trialEndDate
        ? new Date(subscription.trialEndDate)
        : null;

      if (trialEndDate && trialEndDate < now) {
        // Trial has expired
        return {
          status: "trial_expired",
          label: "Trial Expired",
          icon: <Warning />,
          color: "#ff9800",
          description: `Trial expired on ${trialEndDate.toLocaleDateString()}`,
        };
      }

      return {
        status: "trialing",
        label: "Trial",
        icon: <Schedule />,
        color: "#4CAF50",
        description: `Trial ends ${subscription.trialEndDate ? new Date(subscription.trialEndDate).toLocaleDateString() : "soon"}`,
      };
    }

    if (subscription.status === "past_due") {
      return {
        status: "payment_failed",
        label: "Payment Failed",
        icon: <Warning />,
        color: "#f44336",
        description: "Payment failed - subscription may be suspended",
      };
    }

    if (subscription.status === "expired") {
      return {
        status: "trial_expired",
        label: "Trial Expired",
        icon: <Warning />,
        color: "#ff9800",
        description: `Trial ended on ${subscription.trialEndDate ? new Date(subscription.trialEndDate).toLocaleDateString() : "N/A"}`,
      };
    }

    if (subscription.status === "canceled") {
      return {
        status: "canceled",
        label: "Canceled",
        icon: <Cancel />,
        color: "#f44336",
        description: "Subscription has been canceled and will not renew",
      };
    }

    if (subscription.status === "incomplete") {
      return {
        status: "incomplete",
        label: "Incomplete",
        icon: <Warning />,
        color: "#ff9800",
        description:
          "Subscription setup was started but not completed - payment may be pending",
      };
    }

    if (subscription.status === "unpaid") {
      return {
        status: "unpaid",
        label: "Unpaid",
        icon: <Warning />,
        color: "#f44336",
        description:
          "Payment is overdue - subscription access has been revoked",
      };
    }

    // Default case for any other status values
    return {
      status: "unknown",
      label: `Unknown (${subscription.status})`,
      icon: <Warning />,
      color: "#666666",
      description: `Subscription has unrecognized status: "${subscription.status}"`,
    };
  };

  const filteredDealers = dealers.filter(
    (dealer) =>
      dealer.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.users.some(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const handleDealerExpand = (dealerId) => {
    setExpandedDealer(expandedDealer === dealerId ? null : dealerId);
  };

  // Trial management functions
  const handleEnableTrial = (dealer) => {
    setSelectedDealer(dealer);
    setEnableTrialDialog(true);
  };

  const handleExtendTrial = (dealer) => {
    setSelectedDealer(dealer);
    setExtendTrialDialog(true);
  };

  const handleCancelTrial = (dealer) => {
    setSelectedDealer(dealer);
    setCancelTrialDialog(true);
  };

  const enableTrial = async () => {
    if (!selectedDealer) return;

    // Validate trialDays is integer in [1, 365]
    const parsedDays = parseInt(trialDays, 10);
    if (
      Number.isNaN(parsedDays) ||
      !Number.isInteger(parsedDays) ||
      parsedDays < 1 ||
      parsedDays > 365
    ) {
      toast.error("Please enter a valid Trial Days value between 1 and 365.");
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch(
        `/api/v1/superadmin/dealer/${selectedDealer.id}/enable-trial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            trialDays: parsedDays,
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        const message =
          selectedDealer?.subscription?.status === "canceled"
            ? `Trial re-enabled for ${trialDays} days`
            : data.message;
        toast.success(message);
        setEnableTrialDialog(false);
        fetchDealersData(); // Refresh data
      } else {
        toast.error(data.message || "Failed to enable trial");
      }
    } catch (error) {
      console.error("Error enabling trial:", error);
      toast.error("Failed to enable trial");
    } finally {
      setProcessing(false);
    }
  };

  const extendTrial = async () => {
    if (!selectedDealer) return;

    // Validate additionalDays is integer in [1, 365]
    const parsedAdditional = parseInt(additionalDays, 10);
    if (
      Number.isNaN(parsedAdditional) ||
      !Number.isInteger(parsedAdditional) ||
      parsedAdditional < 1 ||
      parsedAdditional > 365
    ) {
      toast.error(
        "Please enter a valid Additional Days value between 1 and 365.",
      );
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch(
        `/api/v1/superadmin/dealer/${selectedDealer.id}/extend-trial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            additionalDays: parsedAdditional,
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
        setExtendTrialDialog(false);
        fetchDealersData(); // Refresh data
      } else {
        toast.error(data.message || "Failed to extend trial");
      }
    } catch (error) {
      console.error("Error extending trial:", error);
      toast.error("Failed to extend trial");
    } finally {
      setProcessing(false);
    }
  };

  const cancelTrial = async () => {
    if (!selectedDealer) return;

    try {
      setProcessing(true);
      const response = await fetch(
        `/api/v1/superadmin/dealer/${selectedDealer.id}/cancel-trial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
        setCancelTrialDialog(false);
        fetchDealersData(); // Refresh data
      } else {
        toast.error(data.message || "Failed to cancel trial");
      }
    } catch (error) {
      console.error("Error canceling trial:", error);
      toast.error("Failed to cancel trial");
    } finally {
      setProcessing(false);
    }
  };

  if (!isSuperadmin) {
    return (
      <Box>
        <Alert severity="error">
          Access denied. This feature is only available to superadmin users.
        </Alert>
      </Box>
    );
  }

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
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={3}>
        <Button
          startIcon={<Refresh />}
          onClick={fetchDealersData}
          sx={{ color: "#DBA42D" }}
        >
          Refresh
        </Button>
      </Box>

      {/* Search Bar */}
      <StyledCard>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search dealers or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#DBA42D" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "#666666" },
                "&:hover fieldset": { borderColor: "#DBA42D" },
                "&.Mui-focused fieldset": { borderColor: "#DBA42D" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#999999",
              },
            }}
          />
        </CardContent>
      </StyledCard>

      {/* Dealers List */}
      {filteredDealers.length === 0 ? (
        <StyledCard>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "white", textAlign: "center" }}
            >
              {searchTerm
                ? "No dealers found matching your search"
                : "No dealers found"}
            </Typography>
          </CardContent>
        </StyledCard>
      ) : (
        filteredDealers.map((dealer) => {
          const statusInfo = getStatusInfo(dealer);
          const isExpanded = expandedDealer === dealer.id;

          return (
            <StyledCard key={dealer.id}>
              <Accordion
                expanded={isExpanded}
                onChange={() => handleDealerExpand(dealer.id)}
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { margin: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "#DBA42D" }} />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2} width="100%">
                    <Business sx={{ color: "#DBA42D" }} />
                    <Box flexGrow={1}>
                      <Typography variant="h6" sx={{ color: "white" }}>
                        {dealer.dealerName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#cccccc" }}>
                        {dealer.users.length} user
                        {dealer.users.length !== 1 ? "s" : ""}
                      </Typography>
                    </Box>
                    <StatusChip
                      label={statusInfo.label}
                      status={statusInfo.status}
                      icon={statusInfo.icon}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#cccccc", mb: 2 }}
                    >
                      {statusInfo.description}
                    </Typography>

                    {/* Subscription Details */}
                    {dealer.subscription && (
                      <>
                        {/* Expired Trial Warning */}
                        {statusInfo.status === "trial_expired" && (
                          <Alert
                            severity="warning"
                            sx={{
                              mb: 3,
                              backgroundColor: "rgba(255, 152, 0, 0.1)",
                              color: "#ff9800",
                              border: "1px solid rgba(255, 152, 0, 0.3)",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "#ff9800", fontWeight: 500 }}
                            >
                              ⚠️ This trial has expired. The dealer no longer
                              has access to premium features. You can start a
                              new trial to restore access.
                            </Typography>
                          </Alert>
                        )}

                        {/* Cancelled Subscription Warning */}
                        {dealer.subscription.status === "canceled" &&
                          statusInfo.status !== "trial_expired" && (
                            <Alert
                              severity="warning"
                              sx={{
                                mb: 3,
                                backgroundColor: "rgba(244, 67, 54, 0.1)",
                                color: "#f44336",
                                border: "1px solid rgba(244, 67, 54, 0.3)",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#f44336", fontWeight: 500 }}
                              >
                                ⚠️ This{" "}
                                {dealer.subscription.subscriptionType ===
                                "trial"
                                  ? "trial"
                                  : "subscription"}{" "}
                                has been cancelled and will not auto-renew.
                                {dealer.subscription.subscriptionType ===
                                "trial"
                                  ? " The dealer will lose trial access immediately."
                                  : " The dealer will lose access at the end of their current period."}
                              </Typography>
                            </Alert>
                          )}

                        {/* Incomplete Subscription Warning */}
                        {dealer.subscription.status === "incomplete" && (
                          <Alert
                            severity="warning"
                            sx={{
                              mb: 3,
                              backgroundColor: "rgba(255, 152, 0, 0.1)",
                              color: "#ff9800",
                              border: "1px solid rgba(255, 152, 0, 0.3)",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "#ff9800", fontWeight: 500 }}
                            >
                              ⚠️ This subscription setup was not completed. The
                              payment may be pending or the subscription was
                              abandoned during setup. You can enable a trial to
                              give this dealer access.
                            </Typography>
                          </Alert>
                        )}

                        {/* Unpaid Subscription Warning */}
                        {dealer.subscription.status === "unpaid" && (
                          <Alert
                            severity="error"
                            sx={{
                              mb: 3,
                              backgroundColor: "rgba(244, 67, 54, 0.1)",
                              color: "#f44336",
                              border: "1px solid rgba(244, 67, 54, 0.3)",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "#f44336", fontWeight: 500 }}
                            >
                              🚨 Payment is overdue. The dealer has lost access
                              to premium features. You can enable a trial to
                              temporarily restore access.
                            </Typography>
                          </Alert>
                        )}

                        {/* Only show subscription details for properly initialized subscriptions */}
                        {dealer.subscription.status !== "incomplete" &&
                          dealer.subscription.status !== "unpaid" && (
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                              <Grid item xs={12} md={6}>
                                <Paper
                                  sx={{
                                    p: 2,
                                    backgroundColor: "#1a1a1a",
                                    border: "1px solid #444444",
                                  }}
                                >
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
                                      Subscription Type
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white" }}
                                  >
                                    {dealer.subscription.subscriptionType ===
                                    "trial"
                                      ? (() => {
                                          // Calculate actual trial duration
                                          if (
                                            dealer.subscription
                                              .trialStartDate &&
                                            dealer.subscription.trialEndDate
                                          ) {
                                            const startDate = new Date(
                                              dealer.subscription.trialStartDate,
                                            );
                                            const endDate = new Date(
                                              dealer.subscription.trialEndDate,
                                            );
                                            const daysDiff = Math.ceil(
                                              (endDate - startDate) /
                                                (1000 * 60 * 60 * 24),
                                            );
                                            return `${daysDiff}-Day Free Trial`;
                                          }
                                          return "14-Day Free Trial"; // fallback
                                        })()
                                      : "Premium Monthly"}
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Paper
                                  sx={{
                                    p: 2,
                                    backgroundColor: "#1a1a1a",
                                    border: "1px solid #444444",
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    mb={1}
                                  >
                                    <Schedule
                                      fontSize="small"
                                      sx={{ color: "#DBA42D" }}
                                    />
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ color: "#999999" }}
                                    >
                                      {statusInfo.status === "trial_expired"
                                        ? "Trial Ended"
                                        : dealer.subscription.status ===
                                            "trialing"
                                          ? "Trial Ends"
                                          : "Next Billing"}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white" }}
                                  >
                                    {statusInfo.status === "trial_expired" ||
                                    dealer.subscription.status === "trialing"
                                      ? dealer.subscription.trialEndDate
                                        ? new Date(
                                            dealer.subscription.trialEndDate,
                                          ).toLocaleDateString()
                                        : "Not available"
                                      : dealer.subscription.currentPeriodEnd
                                        ? new Date(
                                            dealer.subscription.currentPeriodEnd,
                                          ).toLocaleDateString()
                                        : "Not available"}
                                  </Typography>
                                </Paper>
                              </Grid>
                            </Grid>
                          )}
                      </>
                    )}

                    {/* Trial Management Actions */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                        Trial Management
                      </Typography>
                      <Box display="flex" gap={2} flexWrap="wrap">
                        {(!dealer.subscription ||
                          dealer.subscription.status === "canceled" ||
                          dealer.subscription.status === "expired" ||
                          dealer.subscription.status === "incomplete" ||
                          dealer.subscription.status === "unpaid" ||
                          statusInfo.status === "trial_expired") && (
                          <Button
                            variant="contained"
                            startIcon={<PlayArrow />}
                            onClick={() => handleEnableTrial(dealer)}
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#45a049",
                              },
                            }}
                          >
                            {statusInfo.status === "trial_expired"
                              ? "Start New Trial"
                              : dealer.subscription?.status === "canceled" &&
                                  dealer.subscription?.isTrialSubscription
                                ? "Re-enable Trial"
                                : dealer.subscription?.status ===
                                      "incomplete" ||
                                    dealer.subscription?.status === "unpaid"
                                  ? "Enable Trial"
                                  : "Enable Trial"}
                          </Button>
                        )}

                        {dealer.subscription &&
                          dealer.subscription.status === "trialing" &&
                          statusInfo.status === "trialing" && (
                            <>
                              <Button
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => handleExtendTrial(dealer)}
                                sx={{
                                  color: "#DBA42D",
                                  borderColor: "#DBA42D",
                                  "&:hover": {
                                    backgroundColor: "#DBA42D",
                                    color: "black",
                                  },
                                }}
                              >
                                Extend Trial
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<Stop />}
                                onClick={() => handleCancelTrial(dealer)}
                                sx={{
                                  color: "#f44336",
                                  borderColor: "#f44336",
                                  "&:hover": {
                                    backgroundColor: "#f44336",
                                    color: "white",
                                  },
                                }}
                              >
                                Cancel Trial
                              </Button>
                            </>
                          )}
                      </Box>
                    </Box>

                    {/* Users Table */}
                    <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                      Users ({dealer.users.length})
                    </Typography>
                    <StyledTableContainer
                      sx={{ maxHeight: 400, overflow: "auto" }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ width: "25%", textAlign: "left" }}>
                              Name
                            </TableCell>
                            <TableCell sx={{ width: "30%", textAlign: "left" }}>
                              Email
                            </TableCell>
                            <TableCell
                              sx={{ width: "15%", textAlign: "center" }}
                            >
                              Role
                            </TableCell>
                            <TableCell
                              sx={{ width: "15%", textAlign: "center" }}
                            >
                              Status
                            </TableCell>
                            <TableCell
                              sx={{ width: "15%", textAlign: "center" }}
                            >
                              Joined
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dealer.users.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                sx={{ textAlign: "center", color: "#999999" }}
                              >
                                No users found for this dealer
                              </TableCell>
                            </TableRow>
                          ) : (
                            dealer.users.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell sx={{ textAlign: "left" }}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <Person
                                      fontSize="small"
                                      sx={{ color: "#DBA42D" }}
                                    />
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "white" }}
                                    >
                                      {user.firstName} {user.lastName}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell sx={{ textAlign: "left" }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white" }}
                                  >
                                    {user.email}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Chip
                                    label={user.dealerRole || "Trader"}
                                    size="small"
                                    sx={{
                                      backgroundColor: "#444444",
                                      color: "white",
                                      fontSize: "10px",
                                      height: "24px",
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Chip
                                    label={
                                      user.status === "active"
                                        ? "Active"
                                        : "Inactive"
                                    }
                                    size="small"
                                    sx={{
                                      backgroundColor:
                                        user.status === "active"
                                          ? "#4CAF50"
                                          : "#666666",
                                      color: "white",
                                      fontSize: "10px",
                                      height: "24px",
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white" }}
                                  >
                                    {user.createdAt
                                      ? new Date(
                                          user.createdAt,
                                        ).toLocaleDateString()
                                      : "Unknown"}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </StyledTableContainer>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </StyledCard>
          );
        })
      )}

      {/* Enable Trial Dialog */}
      <Dialog
        open={enableTrialDialog}
        onClose={() => setEnableTrialDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #666666",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>
          {selectedDealer?.subscription?.status === "canceled"
            ? "Re-enable Trial"
            : "Enable Trial"}{" "}
          for {selectedDealer?.dealerName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#cccccc", mb: 2 }}>
            {selectedDealer?.subscription?.status === "canceled"
              ? "Re-enable the trial for this dealer. Set the number of trial days."
              : "Set the number of trial days for this dealer."}
          </DialogContentText>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel sx={{ color: "white", mb: 1 }}>Trial Days</FormLabel>
            <TextField
              type="number"
              value={trialDays}
              onChange={(e) => setTrialDays(e.target.value)}
              inputProps={{ min: 1, max: 365 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#666666" },
                  "&:hover fieldset": { borderColor: "#DBA42D" },
                  "&.Mui-focused fieldset": { borderColor: "#DBA42D" },
                },
              }}
            />
            <FormHelperText sx={{ color: "#999999" }}>
              Enter number of days (1-365)
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEnableTrialDialog(false)}
            sx={{ color: "#cccccc" }}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={enableTrial}
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#45a049" },
            }}
            disabled={processing}
          >
            {processing
              ? selectedDealer?.subscription?.status === "canceled"
                ? "Re-enabling..."
                : "Enabling..."
              : selectedDealer?.subscription?.status === "canceled"
                ? "Re-enable Trial"
                : "Enable Trial"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Extend Trial Dialog */}
      <Dialog
        open={extendTrialDialog}
        onClose={() => setExtendTrialDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #666666",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>
          Extend Trial for {selectedDealer?.dealerName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#cccccc", mb: 2 }}>
            Add additional days to the current trial period.
          </DialogContentText>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel sx={{ color: "white", mb: 1 }}>
              Additional Days
            </FormLabel>
            <TextField
              type="number"
              value={additionalDays}
              onChange={(e) => setAdditionalDays(e.target.value)}
              inputProps={{ min: 1, max: 365 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#666666" },
                  "&:hover fieldset": { borderColor: "#DBA42D" },
                  "&.Mui-focused fieldset": { borderColor: "#DBA42D" },
                },
              }}
            />
            <FormHelperText sx={{ color: "#999999" }}>
              Enter additional days to add (1-365)
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setExtendTrialDialog(false)}
            sx={{ color: "#cccccc" }}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={extendTrial}
            variant="contained"
            sx={{
              backgroundColor: "#DBA42D",
              color: "black",
              "&:hover": { backgroundColor: "#c49a1f" },
            }}
            disabled={processing}
          >
            {processing ? "Extending..." : "Extend Trial"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Trial Dialog */}
      <Dialog
        open={cancelTrialDialog}
        onClose={() => setCancelTrialDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #666666",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>
          Cancel Trial for {selectedDealer?.dealerName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#cccccc", mb: 2 }}>
            Are you sure you want to cancel the trial for this dealer? You can
            re-enable the trial later if needed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCancelTrialDialog(false)}
            sx={{ color: "#cccccc" }}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={cancelTrial}
            variant="contained"
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
            disabled={processing}
          >
            {processing ? "Canceling..." : "Cancel Trial"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuperadminSubscriptionManagement;
