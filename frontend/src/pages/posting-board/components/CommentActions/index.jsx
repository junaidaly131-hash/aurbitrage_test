/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import useDeleteComment from "../../Hooks/useDeleteComment";
import { useAuth } from "@/Context/AuthContext";

export default function CommentActions({
  comment,
  removeComment,
  editComment,
}) {
  const { id } = comment;
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading: deleting, deleteComment } = useDeleteComment();
  const { userId } = useAuth();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DeleteComment = () => {
    deleteComment(id, removeComment);
    handleClose();
  };

  useEffect(() => {
    if (!deleting) {
      handleClose();
    }
  }, [deleting]);

  const EditPost = () => {
    if (editComment) {
      editComment();
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? `post-action-${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id={`post-action-${id}`}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {}
        <MenuItem onClick={EditPost}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={DeleteComment}>
          <ListItemIcon>
            {!deleting ? (
              <Delete fontSize="small" />
            ) : (
              <CircularProgress
                style={{
                  height: "1em",
                  width: "1em",
                }}
              />
            )}
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
