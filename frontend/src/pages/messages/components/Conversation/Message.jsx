import {
  Box,
  CircularProgress,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useState, useRef, useMemo, useEffect, memo } from "react";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  TimeLine,
  SkuMsg,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import useGetConversation from "../../hooks/useGetConversation";
import useMarkAsRead from "../../hooks/useMarkAsRead";
import { useSocketContext } from "@/Context/SocketContext";
import { useAuth } from "@/Context/AuthContext";
import MessageEditor from "@/pages/messages/components/Conversation/MessageEditor.jsx";
import { addEditor, removeEditor } from "@/redux/slices/editorSlice";
import { useSearchParams } from "react-router-dom";
import { useSpotPrices } from "@/Context/SpotPricesContext";

const formatDateLabel = (date) => {
  const messageDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  messageDate.setHours(0, 0, 0, 0);

  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    const day = messageDate.getDate();
    const month = messageDate.toLocaleDateString("en-US", { month: "short" });
    const year = messageDate.getFullYear();
    return `${day} ${month} ${year}`;
  }
};

const groupMessagesByDate = (messages) => {
  if (!messages || messages.length === 0) return [];

  const grouped = [];
  let lastDate = null;

  messages.forEach((message) => {
    const messageDate = new Date(message.time || message.createdAt);
    const messageDateString = messageDate.toDateString();

    if (messageDateString !== lastDate) {
      grouped.push({
        type: "divider",
        id: `divider-${messageDateString}`,
        text: formatDateLabel(messageDate),
      });
      lastDate = messageDateString;
    }

    grouped.push(message);
  });

  return grouped;
};

const Message = ({
  menu,
  newMessage,
  type,
  newImage,
  onlyImage,
  clearMessage,
  updateChatOptimistically,
  currentSkuData,
  searchTerm,
  searchResults = [],
  isSearchLoading,
  totalPages,
  page,
  onNextPage,
  onPrevPage,
}) => {
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );
  const { conversation, loading, fetchConversation } = useGetConversation();
  const { markAsRead } = useMarkAsRead();
  const { socket } = useSocketContext();
  const { userId } = useAuth();
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [chatContent, setChatContent] = React.useState([]);
  const [assetLoaded, setAssetLoaded] = useState(false);

  const dispatch = useDispatch();
  const [URLSearchParams] = useSearchParams();
  const msgId = URLSearchParams.get("msgId");
  const [isLast, setIsLast] = useState(false);
  const targetMessageRef = React.useRef(null);

  const fetchTimeoutRef = useRef(null);

  const [lastSocketUpdate, setLastSocketUpdate] = useState(Date.now());
  const prevConversationLengthRef = useRef(0);

  const conversationChannel = React.useMemo(() => {
    if (selectedConversation?.chatType === "group") {
      return `conversation/${selectedConversation?.id}`;
    }
    return `conversation/${[userId, selectedConversation?.id].sort().join("-")}`;
  }, [selectedConversation?.chatType, selectedConversation?.id, userId]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("JOIN_ROOM", conversationChannel);
    }
  }, [conversationChannel, socket]);

  React.useEffect(() => {
    if (socket) {
      socket.on("RECEIVE_MESSAGE", () => {
        setLastSocketUpdate(Date.now());

        if (selectedConversation?.id && selectedConversation?.chatType) {
          markAsRead(selectedConversation.id, selectedConversation.chatType);
          prevConversationLengthRef.current += 1;
        }

        if (fetchTimeoutRef.current) {
          clearTimeout(fetchTimeoutRef.current);
        }

        fetchTimeoutRef.current = setTimeout(() => {
          fetchConversation(
            selectedConversation?.id,
            selectedConversation?.chatType,
          );
        }, 300);
      });

      socket.on("MESSAGE_READ", (data) => {
        setLastSocketUpdate(Date.now());

        console.log("MESSAGE_READ received:", {
          readByUserId: data.readByUserId,
          socketConversationId: data.conversationId,
          selectedConversationId: selectedConversation?.id,
          socketChatType: data.chatType,
          selectedChatType: selectedConversation?.chatType,
        });

        const isMatchingConversation =
          data.chatType === "direct"
            ? data.readByUserId == selectedConversation?.id
            : data.conversationId == selectedConversation?.id;

        if (
          isMatchingConversation &&
          data.chatType === selectedConversation?.chatType
        ) {
          console.log("MESSAGE_READ condition matched - fetching conversation");
          if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
          }

          fetchTimeoutRef.current = setTimeout(() => {
            fetchConversation(
              selectedConversation?.id,
              selectedConversation?.chatType,
            );
          }, 100);
        } else {
          console.log("MESSAGE_READ condition NOT matched - ignoring event");
        }
      });

      return () => {
        socket.removeAllListeners("RECEIVE_MESSAGE");
        socket.removeAllListeners("MESSAGE_READ");
        // Clear timeout on cleanup
        if (fetchTimeoutRef.current) {
          clearTimeout(fetchTimeoutRef.current);
        }
      };
    }
  }, [
    socket,
    conversationChannel,
    fetchConversation,
    selectedConversation?.id,
    selectedConversation?.chatType,
    markAsRead,
  ]);

  const chatJustOpenedRef = useRef(false);

  React.useEffect(() => {
    prevConversationLengthRef.current = 0;
    chatJustOpenedRef.current = true;
  }, [selectedConversation?.id]);

  const handleEditSuccess = (updatedMessage) => {
    setChatContent((prev) => {
      return prev.map((msg) => {
        if (msg.id === updatedMessage.id) {
          return {
            ...msg,
            message: updatedMessage.message,
            asset: updatedMessage.asset,
            type: msg.type, // Keep original type
            subtype: updatedMessage.type, // Update subtype from new type
            isDeleted: updatedMessage.isDeleted,
            time: updatedMessage.updatedAt,
            updatedAt: updatedMessage.updatedAt,
            incoming: msg.incoming,
            outgoing: msg.outgoing,
            name: msg.name,
            userId: msg.userId,
            userProfileImage: msg.userProfileImage,
            dealerName: msg.dealerName,
            reaction: msg.reaction,
            repliedMessageText: msg.repliedMessageText,
            repliedMessageImage: msg.repliedMessageImage,
            repliedMessageName: msg.repliedMessageName,
          };
        }
        return msg;
      });
    });

    dispatch(
      removeEditor(selectedConversation.id + "_" + selectedConversation.type),
    );
  };

  const conversationId = useMemo(
    () => selectedConversation?.id,
    [selectedConversation?.id],
  );
  const conversationChatType = useMemo(
    () => selectedConversation?.chatType,
    [selectedConversation?.chatType],
  );
  const conversationName = useMemo(
    () => selectedConversation?.name,
    [selectedConversation?.name],
  );
  const conversationProfileImage = useMemo(
    () => selectedConversation?.profileImage,
    [selectedConversation?.profileImage],
  );

  React.useEffect(() => {
    if (newMessage != "" || onlyImage) {
      const insertMessage = {
        type: "msg",
        subtype: type,
        message: newMessage,
        repliedMessageText: selectedConversation?.msg,
        repliedMessageName: selectedConversation?.name,
        asset: newImage,
        incoming: false,
        outgoing: true,
        time: new Date(),
        ...(type === "sku" && { payload: currentSkuData }), // Use current SKU data for immediate display
      };

      socket.emit("SEND_MESSAGE", {
        message: insertMessage,
        room: conversationChannel,
        receiver: selectedConversation?.id,
      });

      if (updateChatOptimistically && newMessage) {
        updateChatOptimistically(
          newMessage,
          conversationId,
          conversationChatType,
          conversationName,
          conversationProfileImage,
          type,
        );
      }

      setChatContent((prev) => {
        const isDuplicate = prev.some(
          (msg) =>
            msg.message === insertMessage.message &&
            msg.time === insertMessage.time,
        );

        if (!isDuplicate) {
          return [...prev, insertMessage];
        }

        return prev;
      });

      clearMessage();
    }
  }, [
    clearMessage,
    conversationChannel,
    newMessage,
    socket,
    updateChatOptimistically,
    conversationId,
    conversationChatType,
    conversationName,
    conversationProfileImage,
    type,
    onlyImage,
    newImage,
    selectedConversation?.msg,
    selectedConversation?.name,
    selectedConversation?.id,
    currentSkuData,
  ]);

  React.useEffect(() => {
    setChatContent([...conversation]);

    if (
      conversation &&
      conversation.length > 0 &&
      conversationId &&
      conversationChatType &&
      conversation.length !== prevConversationLengthRef.current &&
      !chatJustOpenedRef.current
    ) {
      prevConversationLengthRef.current = conversation.length;
      markAsRead(conversationId, conversationChatType);
    }

    // Reset flag after first conversation load
    if (chatJustOpenedRef.current && conversation.length > 0) {
      chatJustOpenedRef.current = false;
      prevConversationLengthRef.current = conversation.length;
    }
  }, [conversation, conversationId, conversationChatType, markAsRead]);

  React.useEffect(() => {
    if (conversationId && conversationChatType) {
      markAsRead(conversationId, conversationChatType);
    }

    fetchConversation(conversationId, conversationChatType).catch((err) => {
      console.error(err);
    });

    setChatContent([]);
  }, [fetchConversation, conversationId, conversationChatType, markAsRead]);

  React.useEffect(() => {
    if (!conversationId || !conversationChatType) return;

    const fallbackInterval = setInterval(() => {
      const timeSinceLastSocketUpdate = Date.now() - lastSocketUpdate;
      const thirtySeconds = 30 * 1000; // 30 seconds in milliseconds

      if (timeSinceLastSocketUpdate > thirtySeconds) {
        fetchConversation(conversationId, conversationChatType).catch((err) => {
          console.error("Fallback conversation fetch error:", err);
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(fallbackInterval);
  }, [
    lastSocketUpdate,
    fetchConversation,
    conversationId,
    conversationChatType,
  ]);

  const onEdit = (messageId) => {
    setEditingMessageId(messageId);
    dispatch(
      addEditor(selectedConversation.id + "_" + selectedConversation.type),
    );
  };

  const messageEndRef = useRef(null);
  React.useEffect(() => {
    if (!msgId) {
      if (messageEndRef?.current) {
        messageEndRef.current.scrollIntoView();
      }
      if (assetLoaded) {
        if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView();
        }
        setAssetLoaded(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatContent, assetLoaded]);

  const chats = useMemo(() => {
    // If there's no search term, show normal chat with date dividers
    if (!searchTerm) {
      return groupMessagesByDate(chatContent);
    }

    // If we're searching, show search results with date dividers
    return groupMessagesByDate(searchResults);
  }, [chatContent, searchTerm, searchResults]);

  React.useEffect(() => {
    if (targetMessageRef.current?.current && isLast) {
      targetMessageRef.current.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (isLast && assetLoaded && targetMessageRef?.current?.current) {
      targetMessageRef.current.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setAssetLoaded(false);
    }
  }, [isLast, assetLoaded]);
  return (
    <Box>
      <Stack spacing={3} id="message-stack">
        <>
          {(loading && chatContent.length === 0) || isSearchLoading ? (
            <div
              style={{ display: "block", margin: "auto", marginTop: "10px" }}
            >
              <CircularProgress sx={{ color: "#DBA42D" }} />
            </div>
          ) : (
            <>
              {searchTerm && !chats.length ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="white"
                    textAlign="center"
                    sx={{
                      opacity: 0.7,
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    No messages found matching &quot;
                    <span style={{ color: "#DBA42D" }}>{searchTerm}</span>&quot;
                  </Typography>
                </Box>
              ) : (
                chats.map((el, index) => (
                  <MessageRenderer
                    key={el.id}
                    el={el}
                    menu={menu}
                    editingMessageId={editingMessageId}
                    onEdit={onEdit}
                    setAssetLoaded={setAssetLoaded}
                    setEditingMessageId={setEditingMessageId}
                    handleEditSuccess={handleEditSuccess}
                    targetMessageRef={targetMessageRef}
                    isLast={index === chats.length - 1}
                    setIsLast={setIsLast}
                    searchTerm={searchTerm}
                  />
                ))
              )}
              {searchTerm && chats.length > 0 && totalPages > 1 && (
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  mt={2}
                >
                  <IconButton
                    onClick={onPrevPage}
                    disabled={page === 1}
                    sx={{ color: "#DBA42D" }}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <Typography variant="body2" color="white" alignSelf="center">
                    Page {page} of {totalPages}
                  </Typography>
                  <IconButton
                    onClick={onNextPage}
                    disabled={page === totalPages}
                    sx={{ color: "#DBA42D" }}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Stack>
              )}
            </>
          )}
          <div ref={messageEndRef}></div>
        </>
      </Stack>
    </Box>
  );
};

const MessageRenderer = memo(
  ({
    el,
    menu,
    editingMessageId,
    onEdit,
    setAssetLoaded,
    setEditingMessageId,
    handleEditSuccess,
    targetMessageRef,
    isLast,
    setIsLast,
    searchTerm,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const messageRef = useRef(null);
    const [URLSearchParams] = useSearchParams();
    const msgId = URLSearchParams.get("msgId");
    const { spotPrices } = useSpotPrices();

    useEffect(() => {
      if (isLast && messageRef.current) {
        setIsLast(true);
      }
    }, [isLast, setIsLast]);

    useEffect(() => {
      if (editingMessageId === el.id) {
        setIsEditing(true);
      } else {
        setIsEditing(false);
      }
    }, [editingMessageId, el.id]);

    useEffect(() => {
      if (parseInt(msgId) === parseInt(el.id) && messageRef.current) {
        targetMessageRef.current = messageRef;
      }
    }, [msgId, el.id, targetMessageRef]);

    if (isEditing) {
      return (
        <div ref={messageRef}>
          <MessageEditor
            message={el}
            onEditSuccess={(updatedMessage) => {
              handleEditSuccess(updatedMessage);
              setEditingMessageId(null);
            }}
            onCancel={() => {
              setEditingMessageId(null);
            }}
          />
        </div>
      );
    }
    return (
      <div ref={messageRef}>
        {(() => {
          if (el.subtype === "sku" || el.type === "sku") {
            return (
              <SkuMsg
                el={el}
                menu={menu}
                onEdit={onEdit}
                isEditing={isEditing}
                spotPrices={spotPrices}
              />
            );
          }

          switch (el.type) {
            case "divider":
              return <TimeLine el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    <MediaMsg
                      el={el}
                      menu={menu}
                      onEdit={onEdit}
                      setAssetLoaded={setAssetLoaded}
                      isEditing={isEditing}
                    />
                  );
                case "pdf":
                  return (
                    <MediaMsg
                      el={el}
                      menu={menu}
                      isPdf={true}
                      onEdit={onEdit}
                      setAssetLoaded={setAssetLoaded}
                      isEditing={isEditing}
                    />
                  );
                case "doc":
                  return (
                    <DocMsg
                      el={el}
                      menu={menu}
                      onEdit={onEdit}
                      isEditing={isEditing}
                    />
                  );
                case "link":
                  return (
                    <LinkMsg
                      el={el}
                      menu={menu}
                      onEdit={onEdit}
                      isEditing={isEditing}
                    />
                  );
                case "reply":
                  return (
                    <ReplyMsg
                      el={el}
                      menu={menu}
                      onEdit={onEdit}
                      isEditing={isEditing}
                      spotPrices={spotPrices}
                    />
                  );
                default:
                  return (
                    <TextMsg
                      el={el}
                      menu={menu}
                      onEdit={onEdit}
                      isEditing={isEditing}
                      searchTerm={searchTerm}
                    />
                  );
              }
            default:
              return <></>;
          }
        })()}
      </div>
    );
  },
);

MessageRenderer.displayName = "MessageRenderer";

export default Message;
