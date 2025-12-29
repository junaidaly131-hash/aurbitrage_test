import { useCallback, useEffect, useState } from "react";
import {
  deleteNotification,
  getAllNotifications,
  readUnreadNotification,
} from "../apis/notifications";
import { Notifications } from "./Context";
import dayjs from "dayjs";
import { useAuth } from "./AuthContext";

export const NotificationsProvider = ({ children }) => {
  const { userId } = useAuth();
  const [state, setState] = useState({
    notifications: [],
    loading: false,
    loadingUnread: false,
    page: 1,
    pageUnread: 1,
    hasMore: true,
    hasMoreUnread: true,
    error: null,
    errorUnread: null,
    filter: "latest",
    unread: [],
    totalItems: 0,
    totalItemsUnread: 0,
    totalPages: 0,
    totalPagesUnread: 0,
    selectedNotifications: [],
  });

  const loadNotifications = useCallback(
    async (page, feed) => {
      if (feed) {
        setState((prev) => ({
          ...prev,
          loadingUnread: true,
          errorUnread: null,
        }));
      } else {
        setState((prev) => ({ ...prev, loading: true, error: null }));
      }

      try {
        const response = await getAllNotifications(
          page,
          10,
          feed ? false : state.filter === "read",
          feed || state.filter === "unread",
        );

        if (response.success) {
          setState((prev) => {
            if (feed) {
              return {
                ...prev,
                loadingUnread: false,
                unread: response.data.notifications,
                hasMoreUnread:
                  response.data.currentPage < response.data.totalPages,
                totalItemsUnread: response.data.totalItems,
                totalPagesUnread: response.data.totalPages,
              };
            } else {
              return {
                ...prev,
                loading: false,
                notifications:
                  page === 1
                    ? response.data.notifications
                    : [...prev.notifications, ...response.data.notifications],
                hasMore: response.data.currentPage < response.data.totalPages,
                totalItems: response.data.totalItems,
                totalPages: response.data.totalPages,
              };
            }
          });
        } else {
          throw new Error("Failed to fetch notifications");
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: feed ? prev.error : err.message,
          errorUnread: feed ? err.message : prev.errorUnread,
          loading: feed ? prev.loading : false,
          loadingUnread: feed ? false : prev.loadingUnread,
        }));
      }
    },
    [state.filter],
  );

  const updateNotificationStatus = async (id, type) => {
    try {
      const response = await readUnreadNotification(id, type);
      if (response.success) {
        setState((prev) => {
          const isUnreadStatusChange =
            type === "unread" ||
            (prev.unread.some((n) => n.id === id) && type === "read");

          return {
            ...prev,
            notifications: prev.notifications.map((notification) =>
              notification.id === id
                ? {
                    ...notification,
                    read_at: type === "unread" ? "" : dayjs().toISOString(),
                  }
                : notification,
            ),
            unread: prev.unread.map((notification) =>
              notification.id === id
                ? {
                    ...notification,
                    read_at: type === "unread" ? "" : dayjs().toISOString(),
                  }
                : notification,
            ),
            totalItemsUnread: isUnreadStatusChange
              ? type === "unread"
                ? prev.totalItemsUnread + 1
                : prev.totalItemsUnread - 1
              : prev.totalItemsUnread,
          };
        });
        return response;
      } else {
        throw new Error("Failed to update notification");
      }
    } catch (err) {
      return err;
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const response = await deleteNotification(id);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          notifications: prev.notifications.filter(
            (notification) => notification.id !== id,
          ),
          selectedNotifications: prev.selectedNotifications.filter(
            (selectedId) => selectedId !== id,
          ),
        }));
        return response;
      } else {
        throw new Error("Failed to delete notification");
      }
    } catch (err) {
      return err;
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = state.notifications.filter(
      (notification) => !notification.read_at,
    );

    if (unreadNotifications.length === 0) return;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const promises = unreadNotifications.map((notification) =>
        updateNotificationStatus(notification.id, "read"),
      );
      await Promise.all(promises);

      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Bulk selection methods
  const toggleNotificationSelection = (id) => {
    setState((prev) => ({
      ...prev,
      selectedNotifications: prev.selectedNotifications.includes(id)
        ? prev.selectedNotifications.filter((selectedId) => selectedId !== id)
        : [...prev.selectedNotifications, id],
    }));
  };

  const selectVisibleNotifications = () => {
    setState((prev) => ({
      ...prev,
      selectedNotifications: prev.notifications.map(
        (notification) => notification.id,
      ),
    }));
  };

  const isAllVisibleSelected = () => {
    return (
      state.notifications.length > 0 &&
      state.notifications.every((notification) =>
        state.selectedNotifications.includes(notification.id),
      )
    );
  };

  const clearSelection = () => {
    setState((prev) => ({
      ...prev,
      selectedNotifications: [],
    }));
  };

  const bulkMarkAsRead = async () => {
    if (state.selectedNotifications.length === 0) return;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const promises = state.selectedNotifications.map((id) =>
        updateNotificationStatus(id, "read"),
      );
      await Promise.all(promises);

      setState((prev) => ({
        ...prev,
        selectedNotifications: [],
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const bulkMarkAsUnread = async () => {
    if (state.selectedNotifications.length === 0) return;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const promises = state.selectedNotifications.map((id) =>
        updateNotificationStatus(id, "unread"),
      );
      await Promise.all(promises);

      setState((prev) => ({
        ...prev,
        selectedNotifications: [],
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const bulkDelete = async () => {
    if (state.selectedNotifications.length === 0) return;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const promises = state.selectedNotifications.map((id) =>
        handleDeleteNotification(id),
      );
      await Promise.all(promises);

      setState((prev) => ({
        ...prev,
        selectedNotifications: [],
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (userId) {
      loadNotifications(1);
      loadNotifications(1, true);
    }
  }, [loadNotifications, userId]);

  const loadMoreNotifications = useCallback(
    (value, feed) => {
      if (value && !state.loading && !state.loadingUnread) {
        loadNotifications(1, feed);
      } else if (!feed && !state.loading && state.hasMore) {
        setState((prev) => ({ ...prev, page: prev.page + 1 }));
      } else if (feed && !state.loadingUnread && state.hasMoreUnread) {
        setState((prev) => ({ ...prev, pageUnread: prev.pageUnread + 1 }));
      }
    },
    [
      state.loading,
      state.loadingUnread,
      state.hasMore,
      state.hasMoreUnread,
      loadNotifications,
    ],
  );

  useEffect(() => {
    if (state.page > 1) {
      loadNotifications(state.page);
    }
  }, [state.page, loadNotifications]);

  useEffect(() => {
    if (state.pageUnread > 1) {
      loadNotifications(state.pageUnread, true);
    }
  }, [state.pageUnread, loadNotifications]);

  const changeFilter = (newFilter) => {
    setState((prev) => ({
      ...prev,
      filter: newFilter,
      notifications: [],
      page: 1,
    }));
  };

  const refreshNotifications = useCallback(() => {
    loadNotifications(1);
    loadNotifications(1, true);
  }, [loadNotifications]);

  return (
    <Notifications.Provider
      value={{
        notifications: state.notifications,
        unreadNotifications: state.unread,
        loadMoreNotifications,
        loading: state.loading,
        loadingUnread: state.loadingUnread,
        error: state.error,
        errorUnread: state.errorUnread,
        updateNotificationStatus,
        handleDeleteNotification,
        changeFilter,
        filter: state.filter,
        refreshNotifications,
        totalItems: state.totalItems,
        totalItemsUnread: state.totalItemsUnread,
        hasMore: state.hasMore,
        hasMoreUnread: state.hasMoreUnread,
        markAllAsRead,
        // Bulk selection methods
        selectedNotifications: state.selectedNotifications,
        toggleNotificationSelection,
        selectVisibleNotifications,
        isAllVisibleSelected,
        clearSelection,
        bulkMarkAsRead,
        bulkMarkAsUnread,
        bulkDelete,
      }}
    >
      {children}
    </Notifications.Provider>
  );
};
