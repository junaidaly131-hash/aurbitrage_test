import { Box, Stack } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import React, { useState, useRef, useEffect } from "react";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import { CircularProgress } from "@mui/material";
import useGetDealers from "../../hooks/useGetDealers";
import useCreateGroup from "../../hooks/useCreateGroup";
import Fuse from "fuse.js";
import {
  BoxStyled,
  CancelButton,
  ChatWrapperStyled,
  ConfirmationButton,
  Container,
  CreateGroupBtn,
  InputBaseStyled,
  List,
  Loader,
  ModalStyled,
  PointerNone,
  ScrollableContainerStyled,
  SearchContainerStyled,
  SelectionWrapper,
  SpacedTypo,
  StackStyled,
  Wrapper,
} from "./styles";
import Chip from "@/components/Chip";

const NewGroup = () => {
  const {
    createGroup,
    loading: creatingGroup,
    success,
    error,
    data: id,
  } = useCreateGroup();
  const { dealers, loading } = useGetDealers();
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [dealerUsers, setDealerUsers] = useState([]);
  const dispatch = useDispatch();
  const [groupError, setGroupError] = useState(null);
  const inputRef = useRef(null);

  React.useEffect(() => {
    setGroupError(error);
  }, [error]);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
      keys: ["name", "dealerName"],
    };
    return new Fuse(dealers, fuseOptions);
  }, [dealers]);

  const filterMembers = () => {
    const result = search
      ? fuse.search(search).map((result) => result.item)
      : dealers;
    return result;
  };

  const handleOpen = (member) => {
    let users = [];
    if (selectedMembers.some((m) => m.userId === member.userId)) {
      handleRemoveMember(member);
    } else if (member.type === "dealer") {
      users = dealers.filter((dealer) => dealer.dealerName === member.name);
      setDealerUsers((prevUsers) => [...prevUsers, ...users]);
      setSelectedMembers((p) => [
        ...p.filter(
          (s) => !(member.type === "dealer" && s.dealerName === member.name),
        ),
        member,
      ]);
    } else {
      setSelectedMembers((p) => [
        member,
        ...p.filter((s) => s.userId !== member.userId),
      ]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setGroupName("");
    setGroupError(null);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current && inputRef.current.querySelector("input")) {
          inputRef.current.querySelector("input").focus();
        }
      }, 100);
    }
  }, [open]);

  const handleConfirm = () => {
    const groupUsers = selectedMembers
      .filter((m) => m.type === "user")
      .map((i) => i.userId);
    const groupDealers = selectedMembers
      .filter((m) => m.type === "dealer")
      .map((i) => i.userId);
    createGroup(groupDealers, groupUsers, groupName);
  };

  const handleRemoveMember = (m) => {
    setSelectedMembers((p) => p.filter((pm) => pm.name !== m.name));
    if (m.type === "dealer") {
      setDealerUsers((prevUsers) =>
        prevUsers.filter((user) => user.dealerName !== m.name),
      );
    }
  };

  React.useEffect(() => {
    if (success) {
      dispatch(UpdateSidebarType("CHAT"));
      dispatch(SetSelectedChatId(id));
      dispatch(
        SetSelectedConversation({ id, name: groupName, chatType: "group" }),
      );
      handleClose();
    }
  }, [dispatch, success, groupName, id]);

  return (
    <Container>
      <ChatWrapperStyled spacing={1.5}>
        <SearchContainerStyled>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Members"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
          <Wrapper>
            <CreateGroupBtn
              key={`create group`}
              variant="contained"
              size="xs"
              onClick={() => {
                const membersLength = selectedMembers.length;
                const name =
                  groupName ||
                  `${
                    membersLength === 1
                      ? selectedMembers[0].name
                      : membersLength === 2
                        ? `${selectedMembers[0].name} and ${selectedMembers[1].name}`
                        : `${selectedMembers[0].name}, ${selectedMembers[1].name} and others`
                  }`;
                setGroupName(name);
                setOpen(true);
              }}
            >
              Create Group
            </CreateGroupBtn>
            <CreateGroupBtn
              key={`create group`}
              variant="outlined"
              onClick={() => {
                dispatch(UpdateSidebarType("CHAT"));
              }}
            >
              Cancel
            </CreateGroupBtn>
          </Wrapper>
          {selectedMembers && selectedMembers.length > 0 && (
            <SelectionWrapper>
              {selectedMembers.map((m) => (
                <Chip
                  key={`selected-group-member-${m.name}`}
                  label={m.name}
                  variant="outlined"
                  onDelete={() => handleRemoveMember(m)}
                />
              ))}
            </SelectionWrapper>
          )}
        </SearchContainerStyled>

        <ScrollableContainerStyled>
          <Stack spacing={"6px"}>
            {loading ? (
              <Loader>
                <CircularProgress sx={{ color: "#DBA42D" }} />
              </Loader>
            ) : (
              filterMembers().map((el) => {
                return (
                  <Box
                    key={`new-group-${el.name}-${el.userId}`}
                    onClick={() => handleOpen(el)}
                  >
                    <PointerNone>
                      <ChatElement
                        {...el}
                        chatType={el.type === "dealer" ? "group" : "direct"}
                        isCheckBox={true}
                        checked={selectedMembers.some(
                          (m) => m.userId === el.userId,
                        )}
                      />
                    </PointerNone>
                  </Box>
                );
              })
            )}
          </Stack>
        </ScrollableContainerStyled>
      </ChatWrapperStyled>
      <ModalStyled
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyled>
          {!groupError ? (
            <>
              <SpacedTypo id="modal-modal-description">
                Are you sure you want to create a new group with the following
                Members?
              </SpacedTypo>
              <InputBaseStyled
                ref={inputRef}
                placeholder="Enter Group Name"
                inputProps={{ "aria-label": "group-name" }}
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <List>
                {selectedMembers.map((member) => {
                  return (
                    <Box
                      key={`members-confirm-${member.userId}-${member.name}`}
                      onClick={() => handleRemoveMember(member)}
                    >
                      <PointerNone>
                        <ChatElement
                          {...member}
                          chatType={
                            member.type === "dealer" ? "group" : "direct"
                          }
                          isCheckBox={true}
                          checked={selectedMembers.some(
                            (m) => m.userId === member.userId,
                          )}
                        />
                      </PointerNone>
                    </Box>
                  );
                })}
              </List>
            </>
          ) : (
            <SpacedTypo id="modal-modal-description">
              Failed to create group
            </SpacedTypo>
          )}
          <StackStyled>
            {!creatingGroup ? (
              <>
                {groupError ? (
                  <CancelButton variant="outlined" onClick={handleClose}>
                    Ok
                  </CancelButton>
                ) : (
                  <>
                    <ConfirmationButton
                      variant="contained"
                      color="primary"
                      onClick={handleConfirm}
                    >
                      Yes, Create Group
                    </ConfirmationButton>
                    <CancelButton variant="outlined" onClick={handleClose}>
                      Cancel
                    </CancelButton>
                  </>
                )}
              </>
            ) : (
              <Loader>
                <CircularProgress sx={{ color: "#DBA42D" }} />
              </Loader>
            )}
          </StackStyled>
        </BoxStyled>
      </ModalStyled>
    </Container>
  );
};

export default NewGroup;
