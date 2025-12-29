import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useSubscription } from "../../Context/SubscriptionContext";
import { Navigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Lock, NavigateNext, PostAdd } from "@mui/icons-material";
import PricingDashboardRestriction from "../PricingDashboardRestriction";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  maxWidth: 600,
  margin: "50px auto",
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
  margin: theme.spacing(1),
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
  margin: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#DBA42D",
    color: "#000",
  },
}));

const SubscriptionProtectedRoute = (Element, requireSubscription = true) => {
  return (props) => {
    const { token } = useAuth();
    const { isActive, loading } = useSubscription();
    const location = useLocation();

    // If not authenticated, redirect to login
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If loading subscription status, show loading
    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          sx={{ color: "white" }}
        >
          <Typography>Loading subscription status...</Typography>
        </Box>
      );
    }

    // If subscription is required but user doesn't have active subscription
    if (requireSubscription && !isActive) {
      // Check if this is a pricing dashboard route
      const isPricingDashboard = location.pathname.includes("/pricing");

      if (isPricingDashboard) {
        return <PricingDashboardRestriction />;
      }

      return (
        <StyledPaper elevation={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Lock sx={{ fontSize: 48, color: "#DBA42D" }} />
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "white", fontWeight: "600" }}
          >
            Subscription Required
          </Typography>

          <Typography variant="body1" sx={{ color: "#cccccc", mb: 3 }}>
            This feature requires an active subscription. Please subscribe to
            access this content.
          </Typography>

          <Box display="flex" justifyContent="center" mb={3}>
            <Chip
              label="Premium Feature"
              sx={{
                backgroundColor: "#DBA42D",
                color: "#000",
                fontWeight: "600",
                fontSize: "12px",
              }}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <StyledButton
              variant="contained"
              onClick={() => (window.location.href = "/dashboard/payment")}
              startIcon={<NavigateNext />}
            >
              Subscribe Now
            </StyledButton>

            <Typography variant="body2" sx={{ color: "#999999", mt: 2 }}>
              Or explore available features:
            </Typography>

            <SecondaryButton
              variant="outlined"
              onClick={() =>
                (window.location.href = "/dashboard/posting-board")
              }
              startIcon={<PostAdd />}
            >
              Go to Posting Board
            </SecondaryButton>
          </Box>
        </StyledPaper>
      );
    }

    // If all checks pass, render the component
    return <Element {...props} />;
  };
};

export default SubscriptionProtectedRoute;
