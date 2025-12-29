import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { AddButton } from "./styles";
import useRemoveSkuPrice from "@/pages/admin-dashboard/hooks/removeSkuPrice";
import useDeleteAurbitrageSKU from "./hooks/useDeleteAurbitrageSKU";
import { useState } from "react";
import AppSnackbar from "../commom/AppSnackBar";

const DeleteConfirmationModal = ({
  open,
  onClose,
  skuId,
  onSuccess,
  isAurbitrageSku,
  sourceTable,
}) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteHook = useDeleteAurbitrageSKU();
  const { removeSkuPrice } = useRemoveSkuPrice();

  const handleDelete = async () => {
    if (!skuId) {
      setErrorMessage("No SKU ID provided");
      setShowError(true);
      return;
    }

    setLoading(true); // start loading
    try {
      let result;

      if (isAurbitrageSku) {
        result = await deleteHook.deleteSKU(skuId);
      } else {
        result = await removeSkuPrice(skuId, sourceTable);
      }

      if (result.success) {
        onSuccess?.();
        onClose();
      } else {
        setErrorMessage(result.error || "Failed to delete SKU");
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete SKU");
      setShowError(true);
    } finally {
      setLoading(false); // stop loading
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
          <AddButton onClick={onClose} disabled={loading}>
            Cancel
          </AddButton>
          <AddButton danger onClick={handleDelete} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </AddButton>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
        severity="error"
      />
    </>
  );
};

export default DeleteConfirmationModal;
