import { Box, Button, CircularProgress, Dialog } from "@mui/material";
import { ActionButton, Footer } from "./styles";
import Content from "./Content";
import { IconBox } from "../PostReactions/styles";
import ShareIcon from "@/components/Icons/ShareIcon";
import useCreateGroup from "@/pages/messages/hooks/useCreateGroup";
import useCheckGroupExists from "@/pages/messages/hooks/useCheckGroupExists";
import { toPng } from "html-to-image";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const API_ENDPOINT = `/api/v1/message/send`;

export const PostShare = ({ post, parentRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const {
    createGroup,
    loading: creatingGroup,
    success: groupCreationSuccess,
    error,
    data: groupData,
  } = useCreateGroup();

  const {
    checkGroupExists,
    loading: checkingGroup,
    success: groupCheckingSuccess,
    data: groupCheckData,
  } = useCheckGroupExists();

  const toggleCheck = (chat) => () => {
    setChecked((prevChecked) =>
      prevChecked.length && prevChecked[0].userId === chat.userId ? [] : [chat],
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const prepareMessage = (post) => {
    const { id, postHeader } = post;
    return `<p style="font-weight:bold;font-size:1.5em">${postHeader}</p>
            <a href=/dashboard/posting-board?id=${id}> Go to Post </a>`;
  };

  const sendGroupMessage = async (message, file, groupId) => {
    const results = await sendMessage(
      groupId,
      "group",
      message,
      file,
      "",
      "img",
    );
    return results;
  };
  const handleSendMessage = async (isGroup, groupId) => {
    setIsSending(true);
    try {
      const screenshotTemp = await getPostScreenshot();
      const message = prepareMessage(post);
      const file = createScreenshotFile(screenshotTemp);

      let successful;
      if (isGroup) {
        successful = await sendGroupMessage(message, file, groupId);
      } else {
        successful = await sendMessage(
          checked[0].userId,
          checked[0].chatType || "direct",
          message,
          file,
          "",
          "img",
        );
      }

      if (!successful.success) {
        toast.error(`Failed to share post to ${checked[0].name}`, {
          position: "top-right",
          duration: 4000,
          style: { width: "250px" },
        });
      }

      setChecked([]);
      if (successful.success) {
        navigate("/dashboard/messages");
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast.error("An error occurred while sharing the post.");
    } finally {
      setIsSending(false);
    }
  };
  const handleDispatchGroupMessage = (groupId) => {
    dispatch(SetSelectedChatId(groupId));
    dispatch(
      SetSelectedConversation({
        id: groupId,
        name: groupName,
        chatType: "group",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));
    handleSendMessage(true, groupId);
  };
  useEffect(() => {
    if (groupCheckingSuccess) {
      if (groupCheckData?.groupExists) {
        // if group already exists than it will send the message in previous group
        handleDispatchGroupMessage(groupCheckData.groupId);
      } else {
        let groupDealer = [checked[0].userId];
        let groupUser = [post.userId];
        createGroup(groupDealer, groupUser, groupName);
      }
    }
  }, [groupCheckingSuccess]);

  useEffect(() => {
    if (groupCreationSuccess) {
      handleDispatchGroupMessage(groupData);
    }
  }, [groupCreationSuccess]);

  const handlePostShare = async () => {
    if (!checked.length) {
      return;
    }

    if (checked[0]?.type && checked[0]?.type == "dealer") {
      let groupDealer = [checked[0].userId];
      let groupName = `${checked[0]?.name} And ${post.user.firstName} ${post.user.lastName}`;
      setGroupName(groupName);
      checkGroupExists(groupDealer, groupName);
    } else {
      if (checked.length) {
        dispatch(SetSelectedChatId(checked[0].userId));
        dispatch(
          SetSelectedConversation({
            id: checked[0].userId,
            name: `${checked[0].firstName} ${checked[0].lastName}`,
            dealer: checked[0].dealerName,
            chatType: "direct",
          }),
        );
      }
      dispatch(UpdateSidebarType("CHAT"));
      handleSendMessage(false, 0);
    }
  };
  const getPostScreenshot = async () => {
    return await toPng(parentRef.current, {
      quality: 1,
      cacheBust: true,
      useCors: true,
    });
  };
  const createScreenshotFile = (screenshotTemp) => {
    const byteString = atob(screenshotTemp.split(",")[1]);
    const mimeString = screenshotTemp.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], `Screenshot-${Date.now()}.png`, {
      type: mimeString,
    });
  };

  const sendMessage = async (
    receiverId,
    chatType,
    message,
    messageAsset,
    replyId,
    type,
  ) => {
    try {
      const formData = new FormData();
      formData.append("receiverId", receiverId);
      formData.append("chatType", chatType);
      formData.append("message", message);
      formData.append("type", type);
      if (messageAsset) {
        formData.append("messageAsset", messageAsset);
      }
      if (replyId !== 0) {
        formData.append("replyId", replyId);
      }
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      return await response.json();
    } catch (error) {
      return error;
    }
  };

  return (
    <Box>
      <IconBox onClick={handleClickOpen}>
        <ShareIcon />
      </IconBox>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Content
          toggleCheck={toggleCheck}
          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          checked={checked}
          post={post}
        />
        <Footer>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <ActionButton
            disabled={isSending}
            variant="contained"
            color="secondary"
            onClick={handlePostShare}
          >
            Share
            {isSending ? <CircularProgress size="16px" color="primary" /> : ""}
          </ActionButton>
        </Footer>
      </Dialog>
    </Box>
  );
};
