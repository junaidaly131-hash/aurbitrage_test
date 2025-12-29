import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import PaymentAPI from "../../apis/payment";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Receipt,
  Download,
  Visibility,
  Search,
  Payment,
  CreditCard,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  Cancel,
  Warning,
  Refresh,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: "#292929",
  color: "white",
  border: "1px solid #666666",
}));

const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderColor: "#666666",
    color: "white",
  },
  "& .MuiTableHead-root .MuiTableCell-root": {
    backgroundColor: "#191919",
    color: "#DBA42D",
    fontWeight: "600",
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "paid"
      ? theme.palette.success.main
      : status === "open"
        ? theme.palette.warning.main
        : status === "void"
          ? theme.palette.error.main
          : "#666666",
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: "11px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "36px",
  fontSize: "12px",
  borderRadius: 8,
  backgroundColor: theme.palette.secondary.main,
  color: "#000",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: "#000",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "36px",
  fontSize: "12px",
  borderRadius: 8,
  backgroundColor: "transparent",
  color: "#DBA42D",
  border: "1px solid #DBA42D",
  "&:hover": {
    backgroundColor: "#DBA42D",
    color: "#000",
  },
}));

const BillingHistory = () => {
  const { userId } = useAuth();
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPayingUser, setIsPayingUser] = useState(false);
  const [checkingPayingUser, setCheckingPayingUser] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchBillingHistory();
      checkPayingUser();
    }
  }, [userId]);

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

  const fetchBillingHistory = async () => {
    try {
      setLoading(true);
      // Use the new dealer payment service which restricts invoice access to paying users only
      const result = await PaymentAPI.getDealerInvoices();
      if (result.success) {
        setBillingData({
          invoices: result.invoices || [],
          paymentMethods: result.paymentMethods || [],
          customer: result.customer,
          paymentHistory: result.paymentHistory || [],
          accessDenied: result.accessDenied || false,
          message: result.message,
        });
      } else {
        toast.error(result.message || "Failed to load billing history");
      }
    } catch (error) {
      console.error("Error fetching billing history:", error);
      toast.error("Failed to load billing history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = async (invoiceId) => {
    try {
      const result = await PaymentAPI.getInvoiceDetails(invoiceId);
      if (result.success) {
        setSelectedInvoice(result.data);
        setShowInvoiceDialog(true);
      } else {
        toast.error("Failed to load invoice details");
      }
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      toast.error("Failed to load invoice details");
    }
  };

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      const blob = await PaymentAPI.downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice");
    }
  };

  const formatCurrency = (amount, currency = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle fontSize="small" />;
      case "open":
        return <Warning fontSize="small" />;
      case "void":
        return <Cancel fontSize="small" />;
      default:
        return <Warning fontSize="small" />;
    }
  };

  const filteredInvoices =
    billingData?.invoices?.filter((invoice) => {
      const matchesSearch =
        invoice.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || invoice.status === filterStatus;
      return matchesSearch && matchesStatus;
    }) || [];

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
          Billing History
        </Typography>
        <Button
          startIcon={<Refresh />}
          onClick={fetchBillingHistory}
          sx={{ color: "#DBA42D" }}
        >
          Refresh
        </Button>
      </Box>

      {/* Section 3: Detailed Invoice View (paying users only) */}
      {isPayingUser && !billingData?.accessDenied && (
        <>
          {/* Search and Filter */}
          <StyledCard>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "#666666" }} />
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "#666666" },
                        "&:hover fieldset": { borderColor: "#DBA42D" },
                        "&.Mui-focused fieldset": { borderColor: "#DBA42D" },
                      },
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="open">Open</option>
                    <option value="void">Void</option>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>

          {/* Invoices Table */}
          <StyledCard>
            <CardContent>
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: "#191919" }}
              >
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} hover>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "white", fontWeight: "500" }}
                            >
                              {invoice.number || invoice.id}
                            </Typography>
                            {invoice.description && (
                              <Typography
                                variant="caption"
                                sx={{ color: "#cccccc" }}
                              >
                                {invoice.description}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: "white" }}>
                            {formatDate(invoice.created)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StatusChip
                            label={invoice.status}
                            status={invoice.status}
                            icon={getStatusIcon(invoice.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ color: "white", fontWeight: "500" }}
                          >
                            {formatCurrency(
                              invoice.total || invoice.amount_due || 0,
                              invoice.currency,
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                onClick={() => handleViewInvoice(invoice.id)}
                                sx={{ color: "#DBA42D" }}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {invoice.invoicePdf && (
                              <Tooltip title="Download PDF">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleDownloadInvoice(invoice.id)
                                  }
                                  sx={{ color: "#DBA42D" }}
                                >
                                  <Download fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </CardContent>
          </StyledCard>

          {/* Payment Methods */}
          {billingData?.paymentMethods?.length > 0 && (
            <StyledCard>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <CreditCard sx={{ color: "#DBA42D" }} />
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Payment Methods
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {billingData.paymentMethods.map((pm) => (
                    <Grid item xs={12} md={6} key={pm.id}>
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #666666",
                          borderRadius: 1,
                          backgroundColor: "#191919",
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Payment sx={{ color: "#DBA42D" }} />
                          <Typography variant="body2" sx={{ color: "white" }}>
                            {pm.card?.brand?.toUpperCase()} ••••{" "}
                            {pm.card?.last4}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: "#cccccc" }}>
                          Expires {pm.card?.expMonth}/{pm.card?.expYear}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </StyledCard>
          )}
        </>
      )}

      {/* Invoice Details Dialog */}
      <Dialog
        open={showInvoiceDialog}
        onClose={() => setShowInvoiceDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #666666",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Invoice Details</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Invoice Number
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {selectedInvoice.number || selectedInvoice.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Status
                  </Typography>
                  <StatusChip
                    label={selectedInvoice.status}
                    status={selectedInvoice.status}
                    icon={getStatusIcon(selectedInvoice.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Date
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {formatDate(selectedInvoice.created)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Amount
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "white", fontWeight: "500" }}
                  >
                    {formatCurrency(
                      selectedInvoice.total,
                      selectedInvoice.currency,
                    )}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: "#666666", my: 2 }} />

              {selectedInvoice.lineItems?.length > 0 && (
                <Box mb={3}>
                  <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                    Line Items
                  </Typography>
                  {selectedInvoice.lineItems.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: "1px solid #666666",
                        borderRadius: 1,
                        mb: 1,
                        backgroundColor: "#191919",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {item.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#cccccc" }}>
                        {formatCurrency(item.amount, selectedInvoice.currency)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {formatCurrency(
                      selectedInvoice.subtotal,
                      selectedInvoice.currency,
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Tax
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {formatCurrency(
                      selectedInvoice.tax,
                      selectedInvoice.currency,
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Total
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "white", fontWeight: "500" }}
                  >
                    {formatCurrency(
                      selectedInvoice.total,
                      selectedInvoice.currency,
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                    Amount Paid
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "white", fontWeight: "500" }}
                  >
                    {formatCurrency(
                      selectedInvoice.amountPaid,
                      selectedInvoice.currency,
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <SecondaryButton onClick={() => setShowInvoiceDialog(false)}>
            Close
          </SecondaryButton>
          {selectedInvoice?.invoicePdf && (
            <StyledButton
              startIcon={<Download />}
              onClick={() => handleDownloadInvoice(selectedInvoice.id)}
            >
              Download PDF
            </StyledButton>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillingHistory;
