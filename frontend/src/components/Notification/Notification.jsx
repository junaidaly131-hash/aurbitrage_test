import MessagesIcon from "../Icons/MessagesIcon";
import Actions from "./Actions";
import {
  Card,
  Content,
  NotifictionActions,
  Active,
  Info,
  Profile,
  Icon,
  Description,
  TimeDescription,
  Date,
  CheckboxContainer,
  StyledCheckbox,
  QuickActionsContainer,
  QuickActionButton,
} from "./styles";
import LikeIcon from "@/components/Icons/LikeIcon";
import { useNavigate } from "react-router-dom";
import { formatDateToAgo } from "@/lib";
import { useNotifications } from "@/Context";
import { useState } from "react";
import CommentIcon from "../Icons/CommentIcon";
import {
  Visibility,
  VisibilityOff,
  Delete,
  Notifications,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export const Notification = ({ notification = {} }) => {
  const {
    updateNotificationStatus,
    handleDeleteNotification,
    selectedNotifications,
    toggleNotificationSelection,
  } = useNotifications();
  const { sender, type, updatedAt, read_at, id, linked_entity_metadata } =
    notification;

  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const navigate = useNavigate();

  const isRead = !!read_at;
  const isSelected = selectedNotifications.includes(id);

  const handleNotificationStatus = async () => {
    setLoading(true);
    await updateNotificationStatus(id, read_at ? "unread" : "read");
    setLoading(false);
  };

  const deleteNotification = async (event) => {
    event?.stopPropagation();
    setLoading(true);
    await handleDeleteNotification(sender.id);
    setLoading(false);
  };

  const handleNavigate = async () => {
    if (!read_at) {
      await handleNotificationStatus();
    }
    if (type === "chat") {
      const path = `/dashboard/messages?id=${notification.linked_entity_metadata.groupId || notification.senderId}${`&msgId=${notification.linked_entity_id}`}`;
      navigate(path);
    } else if (
      type === "comment_tag" ||
      type === "dealer_tag" ||
      type === "comment"
    ) {
      navigate(
        `/dashboard/posting-board${notification.linked_entity_metadata?.postId ? `?id=${notification.linked_entity_metadata.postId}&comment_id=${notification.linked_entity_metadata.entityId}` : `?id=${notification.linked_entity_id}`}`,
      );
    } else if (
      type === "subscription_activated" ||
      type === "subscription_cancelled" ||
      type === "payment_confirmed" ||
      type === "payment_failed" ||
      type === "trial_started" ||
      type === "trial_halfway" ||
      type === "trial_ending"
    ) {
      // Navigate to subscription/billing page for payment-related notifications
      navigate("/dashboard/profile?tab=billing");
    } else {
      navigate(
        `/dashboard/posting-board${notification.linked_entity_metadata?.entityType === "post" ? `?id=${notification.linked_entity_id}` : notification.linked_entity_metadata?.postId && `?id=${notification.linked_entity_metadata.postId}&comment_id=${notification.linked_entity_metadata.entityId}`}`,
      );
    }
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

  return (
    <Card
      unread={read_at ? "" : "true"}
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
      <Content onClick={handleNavigate}>
        <Info>
          <Profile src={linked_entity_metadata?.senderProfileImage}>
            {(sender?.firstName || "").split("").slice(0, 2).join("")}
          </Profile>
          <Icon>
            {type === "chat" ? (
              <MessagesIcon />
            ) : type === "comment" ? (
              <CommentIcon />
            ) : type === "subscription_activated" ||
              type === "subscription_cancelled" ||
              type === "payment_confirmed" ||
              type === "payment_failed" ||
              type === "trial_started" ||
              type === "trial_halfway" ||
              type === "trial_ending" ? (
              <Notifications />
            ) : (
              <LikeIcon />
            )}
          </Icon>
        </Info>
        <TimeDescription>
          <Description>
            {type === "chat" ? (
              <>
                You&apos;ve got a new message from <b>{sender?.firstName}</b>
              </>
            ) : type === "comment" ? (
              <>
                {sender?.firstName} {sender?.lastName} commented on your post
              </>
            ) : type === "comment_tag" ? (
              <>
                {sender?.firstName} {sender?.lastName} tagged you in a comment
              </>
            ) : type === "dealer_tag" ? (
              <>
                {sender?.firstName} {sender?.lastName} tagged your dealer in a
                comment
              </>
            ) : type === "comment_reply" ? (
              <>
                {sender?.firstName} {sender?.lastName} replied on your comment
                on : &quot;{notification?.title}&quot;
              </>
            ) : type === "subscription_activated" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : type === "subscription_cancelled" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : type === "payment_confirmed" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : type === "payment_failed" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : type === "trial_started" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : type === "trial_halfway" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : type === "trial_ending" ? (
              <>
                <b>{notification?.title}</b>
              </>
            ) : (
              <>
                {sender?.firstName} {sender?.lastName} liked on your post :
                &quot;{notification?.title}&quot;
              </>
            )}
          </Description>
          <Date>{updatedAt && formatDateToAgo(updatedAt)}</Date>
        </TimeDescription>
      </Content>
      <NotifictionActions>
        {!read_at && <Active />}
        {showQuickActions && (
          <QuickActionsContainer>
            <QuickActionButton
              onClick={(e) => handleQuickActionClick("toggle", e)}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : isRead ? (
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
          </QuickActionsContainer>
        )}
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
      </NotifictionActions>
    </Card>
  );
};
