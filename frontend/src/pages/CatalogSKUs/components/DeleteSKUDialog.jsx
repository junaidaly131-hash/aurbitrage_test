import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddButton } from "../styles";
import useDeleteAurbitrageSKU from "../hooks/useDeleteAurbitrageSKU";
import { useState } from "react";

const DeleteSKUDialog = ({ open, onClose, skuId, onSuccess }) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const deleteHook = useDeleteAurbitrageSKU();

  const handleDelete = async () => {
    if (!skuId) {
      setErrorMessage("No SKU ID provided");
      setShowError(true);
      return;
    }

    try {
      const result = await deleteHook.deleteSKU(skuId);

      if (result.success) {
        onSuccess?.();
        onClose();
      } else {
        setErrorMessage(result.error);
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete SKU");
      setShowError(true);
    }
  };

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
          <AddButton onClick={onClose}>Cancel</AddButton>
          <AddButton
            danger
            onClick={handleDelete}
            disabled={deleteHook.loading === "loading"}
          >
            {deleteHook.loading === "loading" ? (
              <CircularProgress size={24} />
            ) : (
              "Delete"
            )}
          </AddButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showError}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setShowError(false)}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteSKUDialog;
