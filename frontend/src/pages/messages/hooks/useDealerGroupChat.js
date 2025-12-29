import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCheckGroupExists from "./useCheckGroupExists";
import useCreateGroup from "./useCreateGroup";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import { useAuth } from "@/Context/AuthContext";

const useDealerGroupChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const {
    checkGroupExists,
    success: groupCheckingSuccess,
    data: groupCheckData,
  } = useCheckGroupExists();
  const {
    createGroup,
    success: groupCreationSuccess,
    data: groupData,
  } = useCreateGroup();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDealerInfo, setCurrentDealerInfo] = useState(null);

  const navigateToGroupChat = (
    groupId,
    groupName,
    aurbitrageSkuId,
    dealerName,
    type,
    index,
  ) => {
    dispatch(SetSelectedChatId(groupId));
    dispatch(
      SetSelectedConversation({
        id: groupId,
        name: groupName,
        chatType: "group",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));

    // Navigate to messages with SKU information
    const queryParams = new URLSearchParams({
      arbitrageSku: aurbitrageSkuId,
      skuDealerName: dealerName,
      trade: type,
      index: index,
    });

    const url = `/dashboard/messages?${queryParams.toString()}`;
    navigate(url, { replace: true });
  };

  const findDealerIdByName = async (dealerName) => {
    try {
      const response = await fetch(`/api/v1/message/dealers`, {
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        // Find dealer by name in the dealers array
        const dealer = result.data.find(
          (d) => d.type === "dealer" && d.name === dealerName,
        );
        return dealer ? dealer.userId : null;
      }
      return null;
    } catch (error) {
      console.error("Error finding dealer by name:", error);
      return null;
    }
  };

  const findOrCreateDealerGroup = async (
    dealerId,
    dealerName,
    aurbitrageSkuId,
    type,
    index,
  ) => {
    if (!dealerName) {
      console.error("Missing dealer name");
      return;
    }

    setIsProcessing(true);
    setCurrentDealerInfo({
      dealerId,
      dealerName,
      aurbitrageSkuId,
      type,
      index,
    });

    // If dealerId is not provided, try to find it by name
    let finalDealerId = dealerId;
    if (!finalDealerId) {
      finalDealerId = await findDealerIdByName(dealerName);

      if (!finalDealerId) {
        // Fallback to direct chat
        dispatch(
          SetSelectedConversation({
            dealer: dealerName,
            chatType: "direct",
          }),
        );
        dispatch(UpdateSidebarType("CHAT"));
        navigate(
          `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=${dealerName}&&trade=${type}&&index=${index}`,
        );
        setIsProcessing(false);
        return;
      }
    }
    checkGroupExists(finalDealerId, `${dealerName} Group`);
  };

  // Handle group existence check
  useEffect(() => {
    if (
      groupCheckingSuccess &&
      isProcessing &&
      currentDealerInfo &&
      groupCheckData
    ) {
      const { dealerName, aurbitrageSkuId, type, index } = currentDealerInfo;

      if (groupCheckData.groupExists) {
        // Navigate to existing group
        navigateToGroupChat(
          groupCheckData.groupId,
          `${dealerName} Group`,
          aurbitrageSkuId,
          dealerName,
          type,
          index,
        );
        setIsProcessing(false);
      } else {
        // Create new group - we need to get the dealerId from the check response or find it again
        const groupName = `${dealerName} Group`;
        // For group creation, we need the dealerId - let's find it again
        findDealerIdByName(dealerName).then((dealerId) => {
          if (dealerId) {
            createGroup([dealerId], [userId], groupName);
          } else {
            // Fallback to direct chat
            dispatch(
              SetSelectedConversation({
                dealer: dealerName,
                chatType: "direct",
              }),
            );
            dispatch(UpdateSidebarType("CHAT"));
            navigate(
              `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=${dealerName}&&trade=${type}&&index=${index}`,
            );
            setIsProcessing(false);
          }
        });
      }
    }
  }, [groupCheckingSuccess, groupCheckData]);

  // Handle group creation
  useEffect(() => {
    if (
      groupCreationSuccess &&
      isProcessing &&
      currentDealerInfo &&
      groupData
    ) {
      const { dealerName, aurbitrageSkuId, type, index } = currentDealerInfo;

      // Navigate to newly created group
      navigateToGroupChat(
        groupData,
        `${dealerName} Group`,
        aurbitrageSkuId,
        dealerName,
        type,
        index,
      );
      setIsProcessing(false);
    }
  }, [groupCreationSuccess, groupData]);

  return {
    findOrCreateDealerGroup,
    isProcessing,
  };
};

export default useDealerGroupChat;
