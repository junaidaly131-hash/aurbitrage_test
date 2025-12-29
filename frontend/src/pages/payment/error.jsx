import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Error,
  Refresh,
  ArrowBack,
  Support,
  CreditCard,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  color: "white",
  border: "1px solid rgba(219, 164, 45, 0.2)",
  borderRadius: theme.spacing(3),
  maxWidth: 600,
  margin: "0 auto",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
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
  "&:hover": {
    backgroundColor: "rgba(219, 164, 45, 0.1)",
    borderColor: "#F4D03F",
    color: "#F4D03F",
  },
}));

const PaymentErrorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get error details from URL params
  const errorType = searchParams.get("error") || "unknown";
  const errorMessage =
    searchParams.get("message") || "An unknown error occurred";

  const getErrorDetails = () => {
    switch (errorType) {
      case "card_declined":
        return {
          title: "Card Declined",
          message:
            "Your payment method was declined. Please check your card details and try again.",
          suggestions: [
            "Verify your card number, expiry date, and security code",
            "Check that you have sufficient funds available",
            "Contact your bank if the issue persists",
            "Try using a different payment method",
          ],
        };
      case "insufficient_funds":
        return {
          title: "Insufficient Funds",
          message:
            "Your payment could not be processed due to insufficient funds.",
          suggestions: [
            "Check your account balance",
            "Add funds to your account",
            "Try using a different payment method",
          ],
        };
      case "expired_card":
        return {
          title: "Card Expired",
          message: "Your payment method has expired.",
          suggestions: [
            "Update your card information with the new expiry date",
            "Use a different payment method",
            "Contact your bank for a replacement card",
          ],
        };
      case "processing_error":
        return {
          title: "Processing Error",
          message:
            "There was an error processing your payment. Please try again.",
          suggestions: [
            "Wait a few minutes and try again",
            "Check your internet connection",
            "Try using a different payment method",
            "Contact support if the issue persists",
          ],
        };
      case "canceled":
        return {
          title: "Payment Canceled",
          message: "You canceled the payment process.",
          suggestions: [
            "You can try again whenever you're ready",
            "Contact support if you need assistance",
            "Explore our free features in the meantime",
          ],
        };
      default:
        return {
          title: "Payment Failed",
          message:
            errorMessage ||
            "An unexpected error occurred during payment processing.",
          suggestions: [
            "Please try again in a few minutes",
            "Check your payment details are correct",
            "Contact support if the problem continues",
            "Try using a different payment method",
          ],
        };
    }
  };

  const errorDetails = getErrorDetails();

  const handleTryAgain = () => {
    navigate("/dashboard/payment");
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleContactSupport = () => {
    // This could be enhanced to open a support modal or redirect to help center
    window.location.href =
      "mailto:support@aurbitrage.com?subject=Payment Issue";
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto", mt: 4 }}>
      <StyledCard>
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          {/* Error Icon */}
          <Box display="flex" justifyContent="center" mb={3}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "rgba(244, 67, 54, 0.2)",
                border: "2px solid #f44336",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Error sx={{ fontSize: 48, color: "#f44336" }} />
            </Box>
          </Box>

          {/* Error Title */}
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "700",
              mb: 2,
              background: "linear-gradient(135deg, #ffffff 0%, #f44336 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {errorDetails.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#cccccc", mb: 4, fontSize: "18px" }}
          >
            {errorDetails.message}
          </Typography>

          {/* Error Alert */}
          <Alert
            severity="error"
            sx={{
              mb: 4,
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              color: "#f44336",
              border: "1px solid rgba(244, 67, 54, 0.3)",
              "& .MuiAlert-icon": {
                color: "#f44336",
              },
            }}
          >
            Don't worry - no charges were made to your account.
          </Alert>

          {/* Suggestions */}
          <Box
            sx={{
              backgroundColor: "rgba(219, 164, 45, 0.1)",
              borderRadius: 3,
              p: 3,
              mb: 4,
              border: "1px solid rgba(219, 164, 45, 0.2)",
              textAlign: "left",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", mb: 2, fontWeight: "600" }}
            >
              What you can do:
            </Typography>
            {errorDetails.suggestions.map((suggestion, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: "#cccccc", mb: 1 }}
              >
                • {suggestion}
              </Typography>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box
            display="flex"
            gap={2}
            justifyContent="center"
            flexWrap="wrap"
            mb={3}
          >
            <StyledButton
              variant="contained"
              onClick={handleTryAgain}
              startIcon={<CreditCard />}
            >
              Try Payment Again
            </StyledButton>

            <SecondaryButton
              variant="outlined"
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
            >
              Back to Dashboard
            </SecondaryButton>
          </Box>

          {/* Support Section */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
              p: 3,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="body2" sx={{ color: "#cccccc", mb: 2 }}>
              Need help? Our support team is here to assist you.
            </Typography>
            <SecondaryButton
              variant="outlined"
              onClick={handleContactSupport}
              startIcon={<Support />}
              size="small"
            >
              Contact Support
            </SecondaryButton>
          </Box>

          {/* Additional Info */}
          <Typography
            variant="caption"
            sx={{ color: "#999999", mt: 3, display: "block" }}
          >
            Payment processing is handled securely by Stripe. Your payment
            information is never stored on our servers.
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default PaymentErrorPage;
