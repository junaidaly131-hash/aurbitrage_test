import Chats from "./Chats";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledBox,
  StyledStack,
  SidebarBox,
  ChatBox,
  CenteredTextBox,
  StyledTypography,
} from "./styles";
import "../../css/global.css";
import NewChat from "./CreateNewChat";
import NewGroup from "./CreateNewGroup";
import Conversation from "../../components/Conversation";
import useGetChats from "../../hooks/useGetChats";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SetSelectedChatId, SetSelectedConversation } from "@/redux/slices/app";
import { getUsers } from "@/apis/messages";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { useMediaQuery, useTheme } from "@mui/material";

const GeneralApp = () => {
  const { pricingLoading, PricingData } = useContext(PricingDashboardContext);
  const { sidebar, chat } = useSelector((store) => store.app);
  const { chats, loading, fetchChats, updateChatOptimistically } =
    useGetChats();
  const [status, setStatus] = useState("idle");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showSidebar, setShowSidebar] = useState(true);

  const dispatch = useDispatch();
  const [URLSearchParams] = useSearchParams();
  const sku = URLSearchParams.get("arbitrageSku");
  const dealerId = URLSearchParams.get("skuDealerId");
  const skuDealerName = URLSearchParams.get("skuDealerName");
  const fetchSkuDetails = useCallback(async () => {
    setStatus("pending");
    const hasChat = chats.find(
      (chat) => chat.dealerId === dealerId && chat.chatType === "group",
    );

    if (hasChat?.dealerId) {
      dispatch(SetSelectedChatId(hasChat.userId));
      dispatch(
        SetSelectedConversation({
          id: hasChat.userId,
          name: hasChat.name,
          dealer: hasChat.dealerName,
          chatType: "direct",
          profileImage: hasChat.profileImage,
          type: hasChat.type,
          msgId: hasChat.msgId,
          msg: hasChat.msg,
        }),
      );
    } else {
      const users = await getUsers();
      const hasUser = users?.data?.find((chat) => chat.dealerId === dealerId);
      if (hasUser?.userId) {
        dispatch(SetSelectedChatId(hasUser.userId));
        dispatch(
          SetSelectedConversation({
            id: hasUser.userId,
            name: hasUser.name,
            dealer: hasUser.dealerName,
            chatType: "direct",
            profileImage: "",
            type: "msg",
          }),
        );
      }
    }
    setStatus("success");
  }, [chats, skuDealerName, dealerId, dispatch]);

  useEffect(() => {
    if (
      sku &&
      status === "idle" &&
      chats?.length &&
      pricingLoading === "success" &&
      PricingData
    ) {
      fetchSkuDetails();
    }
  }, [fetchSkuDetails, sku, status, chats, PricingData, pricingLoading]);

  useEffect(() => {
    if (isMobile) {
      if (chat.selectedConversation && sidebar.type === "CHAT") {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    } else {
      setShowSidebar(true);
    }
  }, [chat.selectedConversation, sidebar.type, isMobile]);

  const renderSidebarContent = () => {
    switch (sidebar.type) {
      case "NEW_CHAT":
        return <NewChat />;
      case "NEW_GROUP":
        return <NewGroup />;
      default:
        return (
          <Chats
            chats={chats}
            loading={loading}
            fetchChats={fetchChats}
            updateChatOptimistically={updateChatOptimistically}
          />
        );
    }
  };

  const renderDisplayMessage = () => {
    switch (sidebar.type) {
      case "NEW_CHAT":
        return "Select trader to start a new chat!";
      case "NEW_GROUP":
        return "Select dealers & traders to create a group with!";
      default:
        return "Select a conversation or start a new one!";
    }
  };
  return (
    <StyledBox>
      <StyledStack direction="row">
        <SidebarBox showOnMobile={showSidebar}>
          {renderSidebarContent()}
        </SidebarBox>
        <ChatBox showOnMobile={!showSidebar}>
          {chat.selectedConversation && sidebar.type === "CHAT" ? (
            <Conversation onBackClick={() => setShowSidebar(true)} />
          ) : (
            <CenteredTextBox>
              <StyledTypography>{renderDisplayMessage()}</StyledTypography>
            </CenteredTextBox>
          )}
        </ChatBox>
      </StyledStack>
    </StyledBox>
  );
};

export default GeneralApp;
