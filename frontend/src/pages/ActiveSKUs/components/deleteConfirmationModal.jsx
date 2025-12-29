import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DeleteButton } from "./styles";
const DeleteConfirmationModal = ({ open, onClose, handleDelete }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="delete-dialog-title"
        PaperProps={{
          sx: {
            backgroundColor: "#292929",
            color: "white",
          },
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: "white" }}>
          Delete SKU
        </DialogTitle>
        <DialogContent sx={{ color: "white" }}>
          Are you sure you want to delete this SKU? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <DeleteButton onClick={onClose}>Cancel</DeleteButton>
          <DeleteButton danger onClick={handleDelete}>
            Delete
          </DeleteButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteConfirmationModal;
