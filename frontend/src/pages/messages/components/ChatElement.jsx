import { Avatar, Badge, Box, Checkbox, Stack, Typography } from "@mui/material";
import StyledBadge from "./StyledBadge";
import { useDispatch } from "react-redux";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSelectedConversationOnlineStatus,
} from "@/redux/slices/app";
import { formatTime } from "../utils";
import { useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import ImageIcon from "@mui/icons-material/Image";
import { useSocketContext } from "@/Context/SocketContext";
import React from "react";
import { useClearSkuParams } from "../utils/clearSkuParams";
import {
  ChatEle,
  ChatUser,
  DealerName,
  Empty,
  Message,
  StyledCheckBox,
  Time,
  Unread,
} from "./styles";
import CheckBox from "@/components/CheckBox";

//single chat element
const ChatElement = ({
  userId: id,
  name,
  msg,
  msgId,
  time,
  unread,
  dealerName,
  chatType,
  type,
  profileImage,
  updateChatOptimistically,
  isCheckBox = false,
  checked,
}) => {
  if (checked) {
    console.log({ checked });
  }
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const clearSkuParams = useClearSkuParams();
  const [online, setOnline] = React.useState(false);

  const selectedChatId = useSelector((state) => state.app.chat.selectedChatId);
  const selectedChatType = useSelector(
    (state) => state.app.chat.selectedConversation?.chatType,
  );
  React.useEffect(() => {
    if (socket && chatType === "direct") {
      socket.emit("JOIN_ROOM", `USER/${id}`);
    }
  }, [id, socket, chatType]);

  React.useEffect(() => {
    if (socket && chatType === "direct") {
      socket.on(`USER/${id}/ONLINE`, (data) => {
        setOnline(data.online);
        if (selectedChatId === id && chatType === selectedChatType) {
          dispatch(UpdateSelectedConversationOnlineStatus(data.online));
        }
      });

      return () => socket.removeAllListeners(`USER/${id}/ONLINE`);
    }
  }, [id, socket, selectedChatId, chatType, selectedChatType, dispatch]);

  const handleRemoveId = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("id");
    clearSkuParams();
  };

  const handleChatClick = () => {
    let img;
    dispatch(SetSelectedChatId(id));
    dispatch(
      SetSelectedConversation({
        id,
        name,
        dealer: dealerName,
        chatType,
        profileImage,
        type,
        online,
        msgId,
        msg,
        img,
        updateChatOptimistically,
      }),
    );
    handleRemoveId();
  };

  return (
    <ChatEle
      isSelected={selectedChatId === id && chatType === selectedChatType}
      onClick={handleChatClick}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={"100%"}
      >
        <Stack direction="row" alignItems="center" spacing={"10px"}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ width: 35, height: 35 }}
              src={profileImage || undefined}
            >
              {!profileImage && chatType === "group" && <GroupsIcon />}
            </Avatar>
          </StyledBadge>
          <Stack spacing={0.3}>
            <ChatUser>
              <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
                {name}
              </Typography>
              {dealerName && <DealerName>{dealerName}</DealerName>}
            </ChatUser>

            {!isCheckBox && (
              <Message variant="h4">
                {type === "img" ? (
                  <ImageIcon />
                ) : (
                  <Message
                    component="span"
                    variant="h4"
                    dangerouslySetInnerHTML={{ __html: msg }}
                  />
                )}
              </Message>
            )}
          </Stack>
        </Stack>
        <Stack
          spacing={"2px"}
          alignItems={isCheckBox ? "start" : "end"}
          height={"100%"}
          sx={{ marginLeft: "8px", minWidth: "30px" }}
        >
          {isCheckBox ? (
            <CheckBox checked={checked} onClick={(e) => e.stopPropagation()} />
          ) : (
            <>
              {(unread && unread !== "0" && (
                <Unread variant="h4">{unread}</Unread>
              )) || <Empty />}
              <Time variant="body2">{time && formatTime(time)}</Time>
            </>
          )}
        </Stack>
      </Stack>
    </ChatEle>
  );
};

export default ChatElement;
