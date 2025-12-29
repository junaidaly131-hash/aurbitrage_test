import {
  Header,
  NotificationsWrapper,
  Title,
  TitleBar,
  Wrapper,
  Setting,
  Error,
  NotFound,
  BulkActionsContainer,
  BulkActionsLeft,
  BulkActionsRight,
  SelectionInfo,
  ActionButton,
  SelectAllButton,
} from "./styles";
import Filters from "./Components/Filters";
import Notification from "@/components/Notification";
import { SubscriptionNotification } from "@/components/Notification/SubscriptionNotification";
import { useNotifications } from "@/Context";
import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { Button, CircularProgress, Tabs, Tab, Box } from "@mui/material";

export const Notifications = () => {
  const {
    notifications,
    loadMoreNotifications,
    loading,
    error,
    totalItems,
    refreshNotifications,
    selectedNotifications,
    selectVisibleNotifications,
    isAllVisibleSelected,
    clearSelection,
    bulkMarkAsRead,
    bulkMarkAsUnread,
    bulkDelete,
    markAllAsRead,
  } = useNotifications();
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const isSuperadmin = userRole === "superadmin";

  // Categorize notifications
  const { socialNotifications, subscriptionNotifications } = useMemo(() => {
    const subscriptionTypes = [
      "trial_started",
      "subscription_activated",
      "subscription_cancelled",
      "payment_failed",
      "payment_confirmed",
      "trial_halfway",
      "trial_ending",
    ];

    return {
      socialNotifications: notifications.filter(
        (n) => !subscriptionTypes.includes(n.type),
      ),
      subscriptionNotifications: notifications.filter((n) =>
        subscriptionTypes.includes(n.type),
      ),
    };
  }, [notifications]);

  // Get current notifications based on active tab
  const currentNotifications = useMemo(() => {
    if (!isSuperadmin) return notifications;
    if (activeTab === 0) return socialNotifications;
    return subscriptionNotifications;
  }, [
    activeTab,
    notifications,
    socialNotifications,
    subscriptionNotifications,
    isSuperadmin,
  ]);

  useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  const handleSelectAll = () => {
    if (isAllVisibleSelected()) {
      clearSelection();
    } else {
      selectVisibleNotifications();
    }
  };

  const handleClearSelection = () => {
    clearSelection();
  };

  const handleBulkMarkAsRead = () => {
    bulkMarkAsRead();
  };

  const handleBulkMarkAsUnread = () => {
    bulkMarkAsUnread();
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedNotifications.length} notification(s)?`,
      )
    ) {
      bulkDelete();
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    clearSelection();
  };

  return (
    <Wrapper>
      <Header>
        <TitleBar>
          <Title>Notifications</Title>
          {isSuperadmin && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                ml: 3,
                minHeight: "36px",
                "& .MuiTab-root": {
                  color: "#999",
                  minHeight: "36px",
                  py: 1,
                  px: 2,
                  fontSize: "14px",
                  textTransform: "none",
                  fontWeight: 500,
                },
                "& .Mui-selected": {
                  color: "#FFA500 !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#FFA500",
                },
              }}
            >
              <Tab label={`Social (${socialNotifications.length})`} />
              <Tab
                label={`Subscriptions (${subscriptionNotifications.length})`}
              />
            </Tabs>
          )}
          <Filters />
        </TitleBar>
        <Setting>
          <Button
            variant="text"
            color="inherit"
            onClick={handleMarkAllAsRead}
            disabled={loading || notifications.length === 0}
            sx={{
              color: "#92929D",
              fontSize: "14px",
              textTransform: "none",
              padding: "6px 12px",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#fff",
              },
              "&:disabled": {
                color: "#666",
              },
            }}
          >
            Mark All as Read
          </Button>
        </Setting>
      </Header>

      {selectedNotifications.length > 0 && (
        <BulkActionsContainer>
          <BulkActionsLeft>
            <SelectionInfo>
              {selectedNotifications.length} selected
            </SelectionInfo>
            <SelectAllButton onClick={handleSelectAll}>
              {isAllVisibleSelected() ? "Deselect All" : "Select All"}
            </SelectAllButton>
            <ActionButton onClick={handleClearSelection}>Clear</ActionButton>
          </BulkActionsLeft>
          <BulkActionsRight>
            <ActionButton onClick={handleBulkMarkAsRead}>
              Mark as Read
            </ActionButton>
            <ActionButton onClick={handleBulkMarkAsUnread}>
              Mark as Unread
            </ActionButton>
            <ActionButton onClick={handleBulkDelete} sx={{ color: "#EA3A3D" }}>
              Delete
            </ActionButton>
          </BulkActionsRight>
        </BulkActionsContainer>
      )}

      <NotificationsWrapper>
        {currentNotifications.map((notification) => {
          const isSubscription = [
            "trial_started",
            "subscription_activated",
            "subscription_cancelled",
            "payment_failed",
            "payment_confirmed",
            "trial_halfway",
            "trial_ending",
          ].includes(notification.type);

          if (isSuperadmin && isSubscription) {
            return (
              <SubscriptionNotification
                key={notification.id}
                notification={notification}
              />
            );
          }

          return (
            <Notification key={notification.id} notification={notification} />
          );
        })}
        {!currentNotifications.length ? (
          <NotFound>
            {isSuperadmin && activeTab === 1
              ? "No subscription notifications"
              : isSuperadmin && activeTab === 0
                ? "No social notifications"
                : "No notifications found"}
          </NotFound>
        ) : null}
        {!loading && !currentNotifications.length && error && (
          <Error>
            <span>{error}</span>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => refreshNotifications()}
            >
              Try again
            </Button>
          </Error>
        )}
        {loading && <CircularProgress size={60} />}
        {totalItems > notifications.length ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => loadMoreNotifications()}
            disabled={loading}
          >
            Load More
          </Button>
        ) : null}
      </NotificationsWrapper>
    </Wrapper>
  );
};
