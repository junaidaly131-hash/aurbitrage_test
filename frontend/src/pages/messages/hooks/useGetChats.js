import { useState, useEffect, useCallback } from "react";

const useGetChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = `/api/v1/message/chats`;

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setChats(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [apiEndpoint]);

  const updateChatOptimistically = useCallback(
    (
      newMessage,
      receiverId,
      chatType,
      senderName,
      senderProfileImage,
      messageType = "msg",
      payload,
    ) => {
      setChats((prevChats) => {
        const updatedChats = [...prevChats];

        let existingChatIndex = -1;

        if (chatType === "direct") {
          existingChatIndex = updatedChats.findIndex(
            (chat) => chat.userId === receiverId && chat.chatType === "direct",
          );
        } else {
          existingChatIndex = updatedChats.findIndex(
            (chat) => chat.userId === receiverId && chat.chatType === "group",
          );
        }

        const now = new Date();

        let messagePreview = "";
        if (messageType === "img") {
          messagePreview = "📷 Image";
        } else if (messageType === "pdf") {
          messagePreview = "📄 PDF Document";
        } else if (messageType === "sku") {
          messagePreview = "📦 SKU Message";
        } else if (messageType === "reply") {
          messagePreview =
            "↩️ " +
            (newMessage.length > 45
              ? newMessage.substring(0, 45) + "..."
              : newMessage);
        } else {
          messagePreview =
            newMessage.length > 50
              ? newMessage.substring(0, 50) + "..."
              : newMessage;
        }

        if (existingChatIndex !== -1) {
          updatedChats[existingChatIndex] = {
            ...updatedChats[existingChatIndex],
            msg: messagePreview,
            time: now,
            type: messageType,
            unread: "0",
          };

          const chatToMove = updatedChats.splice(existingChatIndex, 1)[0];
          updatedChats.unshift(chatToMove);
        } else {
          const newChat = {
            userId: receiverId,
            msg: messagePreview,
            time: now,
            type: messageType,
            chatType: chatType,
            name: senderName,
            profileImage: senderProfileImage,
            unread: "0",
            dealerName: "",
            dealerId: null,
            payload,
          };

          updatedChats.unshift(newChat);
        }

        return updatedChats;
      });
    },
    [],
  );

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { chats, loading, fetchChats, updateChatOptimistically };
};

export default useGetChats;
