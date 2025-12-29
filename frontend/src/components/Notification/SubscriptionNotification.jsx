import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Warning,
  Celebration,
  Circle,
  Visibility,
  VisibilityOff,
  Delete,
} from "@mui/icons-material";
import { formatDateToAgo } from "@/lib";
import { useNotifications } from "@/Context";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Actions from "./Actions";

const NotificationCard = styled(Box)(({ unread, selected }) => ({
  backgroundColor: selected
    ? "rgba(255, 255, 255, 0.1)"
    : unread
      ? "#1a1a1a"
      : "#212223",
  borderLeft: unread ? "3px solid #FFA500" : "3px solid transparent",
  padding: "20px 24px",
  marginBottom: "12px",
  transition: "all 0.15s ease",
  cursor: "pointer",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "24px",
  width: "100%",
  border: selected ? "2px solid #FFA500" : "2px solid transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
}));

const TopRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "12px",
  marginBottom: "8px",
});

const StatusBadge = styled(Box)(({ color }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "3px 8px",
  borderRadius: "3px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  fontSize: "11px",
  fontWeight: 500,
  color: color || "#999",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  flexShrink: 0,
}));

const LeftSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: "1",
  minWidth: "200px",
});

const RightSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  flex: "1",
  minWidth: "250px",
});

const DetailsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const DetailRow = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  padding: "4px 0",
  width: "100%",
});

const DetailLabel = styled(Typography)({
  color: "#666",
  fontSize: "12px",
  fontWeight: 400,
  minWidth: "70px",
  flexShrink: 0,
});

const DetailValue = styled(Typography)({
  color: "#e0e0e0",
  fontSize: "12px",
  fontWeight: 500,
  flex: 1,
  wordBreak: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
  whiteSpace: "normal",
});

const CheckboxContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "24px",
  marginRight: "8px",
});

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#92929D",
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  padding: "2px",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
}));

const NotificationActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexShrink: 0,
});

const Active = styled(Box)(({ theme: { palette } }) => ({
  height: "14px",
  width: "14px",
  borderRadius: "50%",
  background: palette.secondary.main,
}));

const QuickActionsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginRight: "8px",
  minWidth: "60px",
  height: "28px",
});

const QuickActionButton = styled(IconButton)(({ theme, color }) => ({
  color: color === "error" ? "#EA3A3D" : "#92929D",
  padding: "4px",
  minWidth: "28px",
  height: "28px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  "&:disabled": {
    color: "#666",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

export const SubscriptionNotification = ({ notification }) => {
  const {
    updateNotificationStatus,
    handleDeleteNotification,
    selectedNotifications,
    toggleNotificationSelection,
  } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const {
    type,
    updatedAt,
    read_at,
    id,
    title,
    message,
    linked_entity_metadata,
    sender,
  } = notification;

  const isUnread = !read_at;
  const isSelected = selectedNotifications.includes(id);

  const handleNotificationStatus = async () => {
    setLoading(true);
    await updateNotificationStatus(id, read_at ? "unread" : "read");
    setLoading(false);
  };

  const deleteNotification = async (event) => {
    event?.stopPropagation();
    setLoading(true);
    await handleDeleteNotification(id);
    setLoading(false);
  };

  const onOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const onClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    toggleNotificationSelection(id);
  };

  const handleQuickActionClick = (action, event) => {
    event?.stopPropagation();
    if (action === "toggle") {
      handleNotificationStatus();
    } else if (action === "delete") {
      deleteNotification();
    }
  };

  const handleMouseEnter = () => {
    setShowQuickActions(true);
  };

  const handleMouseLeave = () => {
    setShowQuickActions(false);
  };

  const getNotificationConfig = () => {
    switch (type) {
      case "trial_started":
        return {
          icon: <Circle sx={{ fontSize: 8 }} />,
          color: "#4CAF50",
          label: "Trial Started",
        };
      case "subscription_activated":
        return {
          icon: <Circle sx={{ fontSize: 8 }} />,
          color: "#00BCD4",
          label: "Subscription Active",
        };
      case "subscription_cancelled":
        return {
          icon: <Circle sx={{ fontSize: 8 }} />,
          color: "#F44336",
          label: "Cancelled",
        };
      case "payment_failed":
        return {
          icon: <Circle sx={{ fontSize: 8 }} />,
          color: "#FF9800",
          label: "Payment Failed",
        };
      default:
        return {
          icon: <Circle sx={{ fontSize: 8 }} />,
          color: "#999",
          label: "Notification",
        };
    }
  };

  const config = getNotificationConfig();

  const handleToggleRead = async (e) => {
    e.stopPropagation();
    setLoading(true);
    await updateNotificationStatus(id, read_at ? "unread" : "read");
    setLoading(false);
  };

  // Extract metadata
  const userInfo = linked_entity_metadata?.userInfo || {};
  const dealerInfo = linked_entity_metadata?.dealerInfo || {};
  const subscriptionDetails = linked_entity_metadata?.subscriptionDetails || {};
  const cancellationReason = linked_entity_metadata?.cancellationReason;
  const failureReason = linked_entity_metadata?.failureReason;

  return (
    <NotificationCard
      unread={isUnread ? "true" : undefined}
      selected={isSelected}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CheckboxContainer>
        <StyledCheckbox
          checked={isSelected}
          onChange={handleCheckboxClick}
          onClick={(e) => e.stopPropagation()}
        />
      </CheckboxContainer>

      <LeftSection>
        <TopRow>
          <StatusBadge color={config.color}>
            {config.icon}
            {config.label}
          </StatusBadge>
          <Typography
            sx={{
              color: "#666",
              fontSize: "11px",
              fontWeight: 400,
            }}
          >
            {formatDateToAgo(updatedAt)}
          </Typography>
        </TopRow>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: message ? "8px" : "0",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </Typography>

        {message && (
          <Typography
            sx={{
              color: "#999",
              fontSize: "14px",
              lineHeight: 1.5,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {message}
          </Typography>
        )}
      </LeftSection>

      <RightSection>
        <DetailsContainer>
          {dealerInfo?.dealerName && (
            <DetailRow>
              <DetailLabel>Dealer:</DetailLabel>
              <DetailValue sx={{ color: "#FFA500" }}>
                {dealerInfo.dealerName}
              </DetailValue>
            </DetailRow>
          )}

          {(userInfo?.firstName || userInfo?.lastName) && (
            <DetailRow>
              <DetailLabel>User:</DetailLabel>
              <DetailValue>
                {`${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()}
              </DetailValue>
            </DetailRow>
          )}

          {userInfo?.email && (
            <DetailRow>
              <DetailLabel>Email:</DetailLabel>
              <DetailValue>{userInfo.email}</DetailValue>
            </DetailRow>
          )}

          {subscriptionDetails?.amount && (
            <DetailRow>
              <DetailLabel>Amount:</DetailLabel>
              <DetailValue sx={{ color: "#4CAF50" }}>
                {subscriptionDetails.currency === "usd"
                  ? "$"
                  : subscriptionDetails.currency || "$"}
                {(subscriptionDetails.amount / 100).toFixed(2)}
                {subscriptionDetails.interval &&
                  ` / ${subscriptionDetails.interval === "month" ? "mo" : "yr"}`}
              </DetailValue>
            </DetailRow>
          )}

          {cancellationReason &&
            cancellationReason !== "No specific reason provided" && (
              <DetailRow>
                <DetailLabel>Reason:</DetailLabel>
                <DetailValue>{cancellationReason}</DetailValue>
              </DetailRow>
            )}

          {failureReason && (
            <DetailRow>
              <DetailLabel>Failure:</DetailLabel>
              <DetailValue sx={{ color: "#FF9800" }}>
                {failureReason}
              </DetailValue>
            </DetailRow>
          )}
        </DetailsContainer>
      </RightSection>

      <NotificationActions>
        {!read_at && <Active />}
        <QuickActionsContainer>
          {showQuickActions && (
            <>
              <QuickActionButton
                onClick={(e) => handleQuickActionClick("toggle", e)}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : isUnread ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </QuickActionButton>
              <QuickActionButton
                onClick={(e) => handleQuickActionClick("delete", e)}
                disabled={loading}
                color="error"
              >
                {loading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <Delete fontSize="small" />
                )}
              </QuickActionButton>
            </>
          )}
        </QuickActionsContainer>
        <Actions
          id={id}
          onUpdate={handleNotificationStatus}
          onDelete={deleteNotification}
          read={read_at}
          loading={loading}
          onClose={onClose}
          onOpen={onOpen}
          anchorEl={anchorEl}
        />
      </NotificationActions>
    </NotificationCard>
  );
};
