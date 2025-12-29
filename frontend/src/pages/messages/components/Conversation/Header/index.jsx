import { useState } from "react";
import { Avatar, Box, Stack, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "../../StyledBadge";
import { ToggleSidebar } from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import MembersModal from "../MembersModal";
import useGetMembers from "../../../hooks/useGetMembers";
import { Dealer, HeaderBox, Status } from "./style";
import { useAuth } from "@/Context/AuthContext";
import { DotsThreeVertical, ArrowLeft } from "phosphor-react";
import Chip from "@/components/Chip";
import SearchInput from "../SearchInput";

const Header = ({ searchTerm, onSearchChange, onBackClick }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const { members, loading, error } = useGetMembers(selectedConversation?.id);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      dispatch(ToggleSidebar());
    }
  };

  return (
    <HeaderBox>
      <Stack
        alignItems={"center"}
        direction="row"
        justifyContent={"space-between"}
        className="stack"
      >
        <Stack
          onClick={isMobile ? undefined : handleBackClick}
          direction={"row"}
          justifyContent={"space-between"}
          spacing={2}
          className="stack"
        >
          <Stack direction={"row"} spacing={1.2} alignItems="center">
            {isMobile && (
              <IconButton
                onClick={handleBackClick}
                sx={{
                  color: "white",
                  padding: 0,
                  minWidth: "auto",
                }}
              >
                <ArrowLeft size={24} />
              </IconButton>
            )}
            <Box>
              {selectedConversation.chatType === "direct" ? (
                <StyledBadge
                  online={selectedConversation.online}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={selectedConversation?.name}
                    src={selectedConversation?.profileImage || ""}
                  >
                    {selectedConversation?.chatType === "group" && (
                      <GroupsIcon />
                    )}
                  </Avatar>
                </StyledBadge>
              ) : (
                <Avatar
                  alt={selectedConversation?.name}
                  src={selectedConversation?.profileImage || ""}
                >
                  {selectedConversation?.chatType === "group" && <GroupsIcon />}
                </Avatar>
              )}
            </Box>
            <Stack spacing={1} direction="row">
              <Box>
                <Dealer variant="subtitle2">
                  {selectedConversation?.id == userId &&
                  selectedConversation?.chatType === "direct"
                    ? "Me"
                    : selectedConversation?.name}
                </Dealer>
                <Status variant="caption" color="text.grey">
                  {selectedConversation.online ? "Online" : "Offline"}
                </Status>
              </Box>
              {selectedConversation?.dealer && (
                <Chip
                  rounded={true}
                  color={theme.palette.secondary.main}
                  label={selectedConversation?.dealer}
                />
              )}
            </Stack>
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <SearchInput value={searchTerm} onChange={onSearchChange} />
            <DotsThreeVertical size={20} />
            {selectedConversation?.chatType === "group" && (
              <IconButton onClick={handleModalOpen} size="small">
                <GroupsIcon sx={{ color: "white" }} fontSize="large" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Stack>
      <MembersModal
        open={isModalOpen}
        onClose={handleModalClose}
        members={members}
        loading={loading}
        error={error}
      />
    </HeaderBox>
  );
};

export default Header;
