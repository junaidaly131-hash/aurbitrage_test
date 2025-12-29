import { MenuItem } from "@mui/material";
import { StyledMenu } from "./styles";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { MoreHoriz } from "@mui/icons-material";
import { EyeSlash } from "phosphor-react";
import { Icon } from "./styles";

export const Actions = ({
  id,
  onUpdate,
  read,
  onDelete,
  anchorEl,
  onOpen,
  onClose,
}) => {
  const open = Boolean(anchorEl);

  return (
    <>
      <Icon
        onClick={onOpen}
        aria-controls={open ? `notification-${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreHoriz />
      </Icon>

      <StyledMenu
        anchorEl={anchorEl}
        id={`notification-${id}`}
        open={open}
        onClose={onClose}
        PaperProps={{
          elevation: 0,
          className: "PaperProps",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          className="view"
          key={`view-notification-${id}`}
          onClick={onUpdate}
        >
          <EyeSlash />
          Mark as {read ? "unread" : "read"}
        </MenuItem>
        <MenuItem
          className="delete"
          key={`delete-notification-${id}`}
          onClick={onDelete}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </>
  );
};
