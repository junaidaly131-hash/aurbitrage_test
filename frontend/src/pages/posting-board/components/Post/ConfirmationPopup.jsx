import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";
import useConfirmDeal from "../../Hooks/useConfirmDeal";
import useUpdateCreditStatus from "../../Hooks/useUpdateCreditStatus";

const WideDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "700px",
    maxWidth: "none",
  },
}));

const ConfirmationModal = ({
  open,
  onClose,
  postType,
  onConfirm,
  postId,
  dealerName,
  postDealerName,
  refetchPosts,
  spotType,
  findSpotPrice,
  metals,
}) => {
  const { isLoading, error, confirmDeal } = useConfirmDeal();
  const {
    isLoading: creditIsLoading,
    error: creditError,
    updateCreditStatus,
  } = useUpdateCreditStatus();

  const [step, setStep] = useState(1);
  const [dealSuccess, setDealSuccess] = useState(null);

  const handleConfirm = () => {
    setStep(2);
  };

  const handleFinalConfirm = async (publicCredit) => {
    try {
      const response = await confirmDeal(postId, refetchPosts, publicCredit);
      setDealSuccess(response.success);
    } catch (error) {
      setDealSuccess(false);
    } finally {
      setStep(3);
    }
  };

  const getConfirmationMessage = () => {
    if (postType === "SELL") {
      return `You are confirming that ${dealerName} is selling this deal to ${postDealerName} based on the current spot price.`;
    } else if (postType === "BUY") {
      return `You are confirming that ${dealerName} is purchasing this deal from ${postDealerName} based on the current spot price.`;
    }
  };

  return (
    <WideDialog open={open} onClose={onClose}>
      {step === 1 && (
        <>
          <DialogTitle>Confirm {postType}</DialogTitle>
          <DialogContent>
            <DialogContentText>{getConfirmationMessage()}</DialogContentText>

            {postType === "BUY" && (
              <DialogContentText
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                {metals?.map((metal) => (
                  <div key={metal}>{findSpotPrice(metal, spotType)}</div>
                ))}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </>
      )}
      {step === 2 && (
        <>
          <DialogTitle>Congratulations on the deal!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Would you like to be publicly credited?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleFinalConfirm(false)}
              color="primary"
              disabled={isLoading}
            >
              No
              {isLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Button>
            <Button
              onClick={() => handleFinalConfirm(true)}
              color="primary"
              autoFocus
              disabled={isLoading}
            >
              Yes
              {isLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Button>
          </DialogActions>
        </>
      )}
      {step === 3 && (
        <>
          <DialogTitle>Deal Status</DialogTitle>
          <DialogContent>
            {dealSuccess ? (
              <DialogContentText>
                The deal was successfully confirmed.
              </DialogContentText>
            ) : (
              <DialogContentText>
                There was an error confirming the deal. Please try again later.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </WideDialog>
  );
};

export default ConfirmationModal;
