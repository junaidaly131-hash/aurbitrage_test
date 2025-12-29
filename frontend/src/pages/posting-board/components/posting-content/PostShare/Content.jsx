import { useState, useEffect } from "react";
import {
  Header,
  Icon,
  Input,
  InputWrapper,
  Selection,
  Title,
  User,
} from "./styles";
import { IconButton, Tooltip } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import NewChat from "./NewChat";
import GroupsIcon from "@mui/icons-material/Groups";
import MembersModal from "@/pages/messages/components/Conversation/MembersModal";
const Content = ({
  checked = [],
  groupMembers,
  setGroupMembers,
  toggleCheck,
  post = {},
}) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const clearSearch = () => {
    setSearch("");
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header component="div">
        <Title>
          <span>Send to</span>
        </Title>
        <InputWrapper>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Icon>
            <Search />
          </Icon>
          {Boolean(search?.length) && (
            <Icon className="right" onClick={clearSearch}>
              <Close />
            </Icon>
          )}
        </InputWrapper>
        {Boolean(checked?.length) && (
          <Selection>
            {checked.map((user) => {
              return (
                <>
                  <User key={user?.id} onClick={toggleCheck(user)}>
                    {user?.name} <Close />
                  </User>
                  {user?.type && user?.type == "dealer" && (
                    <Tooltip title={"See Members"}>
                      <IconButton onClick={handleModalOpen}>
                        <GroupsIcon sx={{ color: "white" }} fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              );
            })}
          </Selection>
        )}
      </Header>
      <NewChat
        toggleCheck={toggleCheck}
        checked={checked}
        search={search}
        setGroupMembers={setGroupMembers}
        compare={["userId"]}
        post={post}
      />
      <MembersModal
        open={isModalOpen}
        onClose={handleModalClose}
        members={groupMembers}
      />
    </>
  );
};

export default Content;
