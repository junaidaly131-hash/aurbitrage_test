import { Alert, CircularProgress, Snackbar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { Dots, Item, StyledMenu } from "./styles";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import EditIcon from "@/components/Icons/EditIcon";
import { useNavigate, useParams } from "react-router-dom";
import useGetDealer from "@/pages/Dealer/Hooks/useGetDealer";
import toast from "react-hot-toast";
export const Actions = () => {
  const { deleting } = {};
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(null);
  const { data, getUser } = useGetDealer();
  const open = Boolean(anchorEl);
  useEffect(() => {
    getUser(id);
  }, [id, getUser]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleDeletePost = () => {};
  const handleEditPost = () => {
    if (!data) {
      toast.error("Network error. Please try again.");
      return;
    }
    if (data?.phone && data?.dealerAddress) {
      navigate(`update`);
    } else {
      navigate(`edit`);
    }
  };
  return (
    <>
      <Dots
        onClick={handleClick}
        aria-controls={open ? `dealer-actions` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon />
      </Dots>

      <StyledMenu
        anchorEl={anchorEl}
        id={`dealer-actions`}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Item
          className="delete"
          key={`delete-action`}
          onClick={handleDeletePost}
        >
          {!deleting ? (
            <DeleteIcon />
          ) : (
            <CircularProgress className="circularBar" />
          )}
          Delete Profile
        </Item>
        <Item className="edit" key={`edit-post`} onClick={handleEditPost}>
          <EditIcon />
          Edit Profile
        </Item>
      </StyledMenu>
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
          Alert message
        </Alert>
      </Snackbar>
    </>
  );
};
