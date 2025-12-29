import { Stack, Box } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import { CircularProgress } from "@mui/material";
import useGetChats from "../../hooks/useGetChats";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import { useAuth } from "@/Context/AuthContext";
import Fuse from "fuse.js";
import {
  Container,
  ChatWrapperStyled,
  FilterChatsButton,
  AddChatButton,
  RowContainerStyled,
  SearchContainerStyled,
  ScrollableContainerStyled,
  Loader,
} from "./styles";
import { useSearchParams } from "react-router-dom";
import { useSocketContext } from "@/Context/SocketContext";
import ChatAddIcon from "@/components/Icons/ChatAddIcon";

const Chats = () => {
  const { chats, loading, fetchChats, updateChatOptimistically } =
    useGetChats();
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const [URLSearchParams] = useSearchParams();
  const id = URLSearchParams.get("id");

  const [search, setSearch] = useState("");
  const [chatFilter, setChatFilter] = useState("all");
  const { dealerId } = useAuth();

  const [lastSocketUpdate, setLastSocketUpdate] = useState(Date.now());
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    if (socket) {
      const handleUpdateChats = () => {
        setLastSocketUpdate(Date.now());
        setIsUsingFallback(false);
        fetchChats();
      };

      const handleReceiveMessage = () => {
        setLastSocketUpdate(Date.now());
        setIsUsingFallback(false);
        fetchChats();
      };

      socket.on("UPDATE_CHATS", handleUpdateChats);
      socket.on("RECEIVE_MESSAGE", handleReceiveMessage);

      return () => {
        socket.off("UPDATE_CHATS", handleUpdateChats);
        socket.off("RECEIVE_MESSAGE", handleReceiveMessage);
      };
    }
  }, [socket, fetchChats]);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
      keys: ["name"],
    };
    return new Fuse(chats, fuseOptions);
  }, [chats]);

  const chatTypeFilter = (chat) => {
    switch (chatFilter) {
      case "all":
        return true;
      case "team":
        return chat.dealerId == dealerId;
      case "group":
        return chat?.chatType === "group";
      case "dm":
        return chat?.chatType === "direct";
      default:
        return true;
    }
  };

  const filterChats = () => {
    const filteredChats = search
      ? fuse.search(search).map((result) => result.item)
      : chats;
    return filteredChats.filter(chatTypeFilter);
  };

  const user = filterChats().find((i) => i.userId === parseInt(id));

  useEffect(() => {
    if (id && user) {
      dispatch(SetSelectedChatId(user.userId));
      dispatch(
        SetSelectedConversation({
          id: user.userId,
          name: user.name,
          dealer: user.dealerName,
          chatType: user.chatType,
          profileImage: user.profileImage,
          type: user.type,
          msgId: user.messageId,
          msg: user.msg,
        }),
      );
    }
  }, [id, dispatch, user, chats]);

  useEffect(() => {
    const fallbackInterval = setInterval(() => {
      const timeSinceLastSocketUpdate = Date.now() - lastSocketUpdate;
      const thirtySeconds = 30 * 1000; // 30 seconds in milliseconds

      if (timeSinceLastSocketUpdate > thirtySeconds) {
        setIsUsingFallback(true);
        fetchChats();
      }
    }, 30000);

    return () => clearInterval(fallbackInterval);
  }, [lastSocketUpdate, fetchChats]);

  return (
    <Container>
      <ChatWrapperStyled spacing={1.5}>
        <RowContainerStyled>
          <Tooltip title="Message a user" arrow>
            <AddChatButton
              onClick={() => dispatch(UpdateSidebarType("NEW_CHAT"))}
            >
              <ChatAddIcon /> <span>New Chat</span>
            </AddChatButton>
          </Tooltip>
          <Tooltip title="Message a group" arrow>
            <AddChatButton
              onClick={() => dispatch(UpdateSidebarType("NEW_GROUP"))}
            >
              <ChatAddIcon /> <span>New Group</span>
            </AddChatButton>
          </Tooltip>
        </RowContainerStyled>
        <SearchContainerStyled>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search message"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
        </SearchContainerStyled>
        <RowContainerStyled>
          <FilterChatsButton
            onClick={() => setChatFilter("all")}
            className={chatFilter === "all" ? "active" : ""}
          >
            All Messages
          </FilterChatsButton>

          <FilterChatsButton
            onClick={() => setChatFilter("group")}
            className={chatFilter === "group" ? "active" : ""}
          >
            Groups
          </FilterChatsButton>
          <FilterChatsButton
            onClick={() => setChatFilter("dm")}
            className={chatFilter === "dm" ? "active" : ""}
          >
            DMs
          </FilterChatsButton>
          <FilterChatsButton
            onClick={() => setChatFilter("team")}
            className={chatFilter === "team" ? "active" : ""}
          >
            My Team
          </FilterChatsButton>
        </RowContainerStyled>

        <ScrollableContainerStyled>
          <Stack spacing={"6px"}>
            {loading && chats.length === 0 ? (
              <Loader>
                <CircularProgress sx={{ color: "#DBA42D" }} />
              </Loader>
            ) : (
              filterChats().map((el) => (
                <ChatElement
                  key={`chat-${el.userId}-${el.chatType}`}
                  {...el}
                  fetchChats={fetchChats}
                  updateChatOptimistically={updateChatOptimistically}
                />
              ))
            )}
          </Stack>
        </ScrollableContainerStyled>
      </ChatWrapperStyled>
    </Container>
  );
};

export default Chats;
