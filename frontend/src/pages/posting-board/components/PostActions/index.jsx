import React, { useState, useEffect } from "react";
import {
  MenuItem,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import useDeletePost from "../../Hooks/useDeletePost";
import useCreateSavePost from "@/pages/posting-board/Hooks/useCreateSavePost";
import Add from "../new-post";
import { StyledMenu } from "./styles";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import EditIcon from "@/components/Icons/EditIcon";
import { Difference } from "@mui/icons-material";
import { DotsThreeVertical } from "phosphor-react";

export default function PostActions({
  post,
  userId,
  userRole,
  refetchPosts,
  refetchSaved,
  refetchMyPosts,
  isSystemPost,
}) {
  const { id } = post;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditor, setOpenEditor] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Pass the isSystemPost flag if a superadmin is deleting a system post
  const { isLoading: deleting, deletePost } = useDeletePost(
    refetchPosts,
    refetchMyPosts,
    refetchSaved,
  );

  const { error, createSavePost, unsavePost } = useCreateSavePost();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      // If it's a system post being deleted by a superadmin, make a direct API call
      if (isSystemPost && userRole === "superadmin") {
        // Make the API call directly using the correct endpoint
        const response = await fetch(`/api/v1/post/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        // Refetch posts after successful deletion
        if (refetchPosts) refetchPosts();
        if (refetchMyPosts) refetchMyPosts();
        if (refetchSaved) refetchSaved();
      } else {
        // Use the hook for normal user post deletion
        deletePost(id);
      }
      handleClose();
    } catch (error) {
      setSnackbarMessage(error.message || "Failed to delete post");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (!deleting) {
      handleClose();
    }
  }, [deleting]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleEditPost = () => {
    setOpenEditor(true);
    handleClose();
  };

  const handleDuplicatePost = () => {
    setDuplicate(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const duplicatePost = {
    postType: post.postType,
    postContent: post.postContent,
    postHeader: post.postHeader,
    postImage: post.postImage,
    enableDeal: post.enableDeal,
    PostAssets: post.PostAssets,
    user: post.user,
    PostDeals: post.PostDeals,
    PostSettings: post.PostSettings,
  };

  // For system posts, superadmins can only delete but not edit or duplicate
  // Show edit options only if the user is the post owner
  const showEditOptions = userId == post.userId;

  const handleSavePost = async (postId) => {
    await createSavePost(postId);
    // Force a refetch of saved posts
    refetchSaved();
  };

  const handleUnsavePost = async (postId) => {
    await unsavePost(postId);
    // Force a refetch of saved posts
    refetchSaved();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? `post-action-${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ "&.MuiIconButton-root": { padding: "0px" } }}
      >
        <DotsThreeVertical size={20} color="#fff" />
      </IconButton>

      <StyledMenu
        anchorEl={anchorEl}
        id={`post-action-${id}`}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          className: "PaperProps",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          className="delete"
          key={`delete-post-${id}`}
          onClick={handleDeletePost}
        >
          {!deleting ? (
            <DeleteIcon />
          ) : (
            <CircularProgress className="circularBar" />
          )}
          Delete Post
        </MenuItem>

        {/* Only show edit and duplicate options for the post owner */}
        {showEditOptions && (
          <>
            <MenuItem
              className="edit"
              key={`edit-post-${id}`}
              onClick={handleEditPost}
            >
              <EditIcon />
              Edit Post
            </MenuItem>
            <MenuItem
              className="edit"
              key={`duplicate-post-${id}`}
              onClick={handleDuplicatePost}
            >
              <Difference />
              Duplicate
            </MenuItem>
          </>
        )}
      </StyledMenu>

      {openEditor && (
        <Add
          defaultOpen
          refetchPosts={refetchPosts}
          defaultData={post}
          onClose={() => setOpenEditor(false)}
          isUpdate
        />
      )}
      {duplicate && (
        <Add
          defaultOpen
          refetchPosts={refetchPosts}
          defaultData={duplicatePost}
          onClose={() => setDuplicate(false)}
          isDuplicate
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
