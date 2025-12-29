import React, { useEffect, useState } from "react";
import { Avatar, Badge, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  StyledTableCell,
  StyledIconButton,
  Profile,
  User,
  UserName,
  DealerName,
} from "./styles";
import { formatPhoneNumber } from "@/lib";
import { useSocketContext } from "@/Context/SocketContext";

const UserRow = ({ index, name, email, phone, dealer, profileImage, id }) => {
  const [copied, setCopied] = useState(false);
  const [online, setOnline] = React.useState(false);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on(`USER/${id}/ONLINE`, (data) => {
        setOnline(data.online);
      });

      return () => socket.removeAllListeners(`USER/${id}/ONLINE`);
    }
  }, [id, socket]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <StyledTableCell index={index}>
        <Profile>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            color={online ? "success" : "secondary"}
            variant="dot"
            badgeContent={" "}
          >
            <Avatar src={profileImage}>{name.charAt(0)}</Avatar>
          </Badge>
          <User>
            <UserName>{name}</UserName>
            <DealerName>{dealer}</DealerName>
          </User>
        </Profile>
      </StyledTableCell>
      <StyledTableCell index={index}>
        {email}
        <Tooltip title={copied ? "Copied!" : "Copy email"} arrow>
          <StyledIconButton onClick={handleCopy} size="small">
            <ContentCopyIcon fontSize="small" />
          </StyledIconButton>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell index={index}>
        {formatPhoneNumber(phone)}
      </StyledTableCell>
    </>
  );
};

export default UserRow;
