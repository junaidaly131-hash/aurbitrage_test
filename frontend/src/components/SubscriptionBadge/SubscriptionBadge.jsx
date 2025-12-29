import React from "react";
import { Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PersonOutline, StarOutline, Schedule } from "@mui/icons-material";
import { useSubscription } from "../../Context/SubscriptionContext";
import { fontWeight } from "@mui/system";

const StyledChip = styled(Chip)(({ theme, variant }) => ({
  fontWeight: "600",
  fontSize: "0.65rem", // Reduced from 0.75rem
  // height: "28px",
  borderRadius: "4px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  "& .MuiChip-icon": {
    fontSize: "16px",
    marginLeft: "8px",
    marginRight: "8px",
  },
  "& .MuiChip-label": {
    paddingLeft: "12px",
    fontWeight: "900",
  },
  ...(variant === "basic" && {
    backgroundColor: "#001333",
    color: "#FFFFFF",
    border: "none",
    border: "1px solid white",
    "& .MuiChip-icon": {
      color: "#FFFFFF",
    },
  }),
  ...(variant === "premium" && {
    backgroundColor: "#DBA42D",
    color: "#000000",
    border: "none",
    boxShadow: "0 2px 8px rgba(219, 164, 45, 0.3)",
    "& .MuiChip-icon": {
      color: "#000000",
    },
  }),
  ...(variant === "trial" && {
    backgroundColor: "#4CAF50",
    color: "#FFFFFF",
    border: "none",
    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
    "& .MuiChip-icon": {
      color: "#FFFFFF",
    },
  }),
}));

const SubscriptionBadge = () => {
  const { isActive, subscription, loading } = useSubscription();

  if (loading) {
    return null;
  }

  const getSubscriptionBadge = () => {
    if (!isActive || !subscription) {
      return {
        label: "Basic Membership",
        variant: "basic",
        icon: <PersonOutline />,
      };
    }

    const isTrial =
      subscription.status === "trialing" ||
      subscription.subscriptionType === "trial" ||
      (subscription.trialEndDate &&
        new Date(subscription.trialEndDate) > new Date());

    if (isTrial) {
      return {
        label: "Premium Membership (Trial)",
        variant: "trial",
        icon: <Schedule />,
      };
    }

    return {
      label: "Premium Membership",
      variant: "premium",
      icon: <StarOutline />,
    };
  };

  const { label, variant, icon } = getSubscriptionBadge();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: 2,
        paddingBottom: 2,
      }}
    >
      <StyledChip icon={icon} label={label} variant={variant} size="small" />
    </Box>
  );
};

export default SubscriptionBadge;
