import React, { createContext, useContext, useState, useEffect } from "react";
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

const DealerGroupChatContext = createContext();

export const useDealerGroupChatContext = () => {
  const context = useContext(DealerGroupChatContext);
  if (!context) {
    throw new Error(
      "useDealerGroupChatContext must be used within a DealerGroupChatProvider",
    );
  }
  return context;
};

export const DealerGroupChatProvider = ({ children }) => {
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
    navigate(
      `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=${dealerName}&&trade=${type}`,
    );
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
  ) => {
    if (!dealerName) {
      console.error("Missing dealer name");
      return;
    }

    setIsProcessing(true);
    setCurrentDealerInfo({ dealerId, dealerName, aurbitrageSkuId, type });

    // If dealerId is not provided, try to find it by name
    let finalDealerId = dealerId;
    if (!finalDealerId) {
      finalDealerId = await findDealerIdByName(dealerName);

      if (!finalDealerId) {
        console.error("Could not find dealer ID for:", dealerName);
        // Fallback to direct chat
        dispatch(
          SetSelectedConversation({
            dealer: dealerName,
            chatType: "direct",
          }),
        );
        dispatch(UpdateSidebarType("CHAT"));
        navigate(
          `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=${dealerName}&&trade=${type}`,
        );
        setIsProcessing(false);
        return;
      }
    }

    // Check if group exists
    checkGroupExists(finalDealerId, `${dealerName} Group`);
  };

  // Handle group existence check
  useEffect(() => {
    if (groupCheckingSuccess && isProcessing && currentDealerInfo) {
      const { dealerName, aurbitrageSkuId, type } = currentDealerInfo;

      if (groupCheckData?.groupExists) {
        // Navigate to existing group
        navigateToGroupChat(
          groupCheckData.groupId,
          `${dealerName} Group`,
          aurbitrageSkuId,
          dealerName,
          type,
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
              `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=${dealerName}&&trade=${type}`,
            );
            setIsProcessing(false);
          }
        });
      }
    }
  }, [groupCheckingSuccess, groupCheckData, isProcessing, currentDealerInfo]);

  // Handle group creation
  useEffect(() => {
    if (groupCreationSuccess && isProcessing && currentDealerInfo) {
      const { dealerName, aurbitrageSkuId, type } = currentDealerInfo;

      // Navigate to newly created group
      navigateToGroupChat(
        groupData,
        `${dealerName} Group`,
        aurbitrageSkuId,
        dealerName,
        type,
      );
      setIsProcessing(false);
    }
  }, [groupCreationSuccess, groupData, isProcessing, currentDealerInfo]);

  const value = {
    findOrCreateDealerGroup,
    isProcessing,
  };

  return (
    <DealerGroupChatContext.Provider value={value}>
      {children}
    </DealerGroupChatContext.Provider>
  );
};
