import React from "react";
import { useSubscription } from "../../Context/SubscriptionContext";
import {
  Chip,
  Button,
  Box,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.success.main : "#666666",
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: "11px",
  height: "24px",
  maxWidth: "100%",
  "& .MuiChip-label": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "&:hover": {
    backgroundColor: isActive ? theme.palette.success.dark : "#999999",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  height: "32px",
  fontSize: "12px",
  borderRadius: 8,
  backgroundColor: "transparent",
  color: "#DBA42D",
  border: "1px solid #DBA42D",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#DBA42D",
    color: "#000",
  },
}));

const SubscriptionStatus = ({
  showManageButton = true,
  compact = false,
  showDetails = false,
}) => {
  const { isActive, loading, subscription, message } = useSubscription();

  if (loading) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={16} sx={{ color: "#DBA42D" }} />
        <Typography variant="caption" sx={{ color: "#999999" }}>
          Checking subscription...
        </Typography>
      </Box>
    );
  }

  const handleManageSubscription = () => {
    window.location.href = "/dashboard/payment";
  };

  if (compact) {
    return (
      <Tooltip
        title={isActive ? "Active Subscription" : "Subscription Required"}
      >
        <StyledChip
          label={isActive ? "Active" : "Inactive"}
          size="small"
          isActive={isActive}
        />
      </Tooltip>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <StyledChip
          label={isActive ? "Active Subscription" : "No Active Subscription"}
          size="small"
          isActive={isActive}
        />
        {showManageButton && (
          <StyledButton
            size="small"
            variant="outlined"
            onClick={handleManageSubscription}
          >
            Manage
          </StyledButton>
        )}
      </Box>

      {showDetails && subscription && (
        <Box>
          <Typography variant="caption" sx={{ color: "#999999" }}>
            Status: {subscription.status}
          </Typography>
          {subscription.currentPeriodEnd && (
            <Typography
              variant="caption"
              display="block"
              sx={{ color: "#999999" }}
            >
              Expires:{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      )}

      {message && !isActive && (
        <Typography variant="caption" sx={{ color: "#999999" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default SubscriptionStatus;
