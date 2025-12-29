import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddChat from "@/assets/icons/AddChat.svg";
import { UpdateSidebarType } from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import { CircularProgress } from "@mui/material";
import useGetUsers from "../../hooks/useGetUsers";
import Fuse from "fuse.js";
import {
  AddChatButton,
  ChatWrapperStyled,
  Container,
  Loader,
  RowContainerStyled,
  SearchContainerStyled,
} from "./styles";
import ChatAddIcon from "@/components/Icons/ChatAddIcon";

const NewChat = () => {
  const { users, loading } = useGetUsers();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

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
    return new Fuse(users, fuseOptions);
  }, [users]);

  const filterUsers = () => {
    return search ? fuse.search(search).map((result) => result.item) : users;
  };

  return (
    <Container>
      <ChatWrapperStyled spacing={1.5}>
        <RowContainerStyled>
          <Tooltip title="Message a user" arrow>
            <AddChatButton onClick={() => dispatch(UpdateSidebarType("CHAT"))}>
              <ChatAddIcon /> <span>All Chats</span>
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
              placeholder="Search Users"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
        </SearchContainerStyled>

        <SearchContainerStyled>
          <Stack spacing={"6px"}>
            {loading ? (
              <Loader>
                <CircularProgress sx={{ color: "#DBA42D" }} />
              </Loader>
            ) : (
              filterUsers().map((el) => {
                return (
                  <Box
                    key={`new-chat-${el.userId}`}
                    onClick={() => {
                      dispatch(UpdateSidebarType("CHAT"));
                    }}
                  >
                    <ChatElement {...el} chatType="direct" />
                  </Box>
                );
              })
            )}
          </Stack>
        </SearchContainerStyled>
      </ChatWrapperStyled>
    </Container>
  );
};

export default NewChat;
