import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import useUpdatePricingEmail from "../Hooks/useUpdatePricingEmail";
import { useAuth } from "@/Context/AuthContext";
import { useState, useEffect } from "react";
import {
  SaveBtn,
  SectionWrapper,
  SKUFormField,
  StyledHeading,
} from "../styles";
import { EmailContainer } from "./styles";
import placeholder from "@/assets/images/settings/email-integration.png";
const EmailIntegration = () => {
  const { storageType } = useAuth();
  const dealerPricingEmail = storageType.getItem("dealerPricingEmail");
  const [pricingEmail, setPricingEmail] = useState(dealerPricingEmail);
  const [isEdit, setIsEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const { loading, updateEmail } = useUpdatePricingEmail();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const handleCopy = () => {
    navigator.clipboard.writeText(pricingEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleUpdatePricingEmail = () => {
    storageType.setItem("dealerPricingEmail", pricingEmail);
    updateEmail(pricingEmail);
  };
  useEffect(() => {
    if (loading == "success") {
      setSnackbarMessage("Pricing Email updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else if (loading == "failed") {
      setSnackbarMessage("Error updating pricing Email.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [loading]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <EmailContainer>
      {!isEdit && dealerPricingEmail ? (
        <SectionWrapper align="center">
          <StyledHeading align="center">Email Integration</StyledHeading>
          <Typography variant="body2" align="center">
            Forward your pricesheets to custompricing@aurbitrage.com with the
            email address you entered below to view them in the Aurbitrage
            pricing dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <SKUFormField
                value={pricingEmail}
                placeholder="Enter email address"
                onChange={(e) => setPricingEmail(e.target.value)}
                readOnly={true}
              />

              <Tooltip title={copied ? "Copied!" : "Copy email"} arrow>
                <IconButton
                  onClick={handleCopy}
                  size="small"
                  sx={{ color: "#fff" }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Edit"} arrow>
                <IconButton
                  onClick={handleEdit}
                  size="small"
                  sx={{ color: "#fff" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </SectionWrapper>
      ) : (
        <SectionWrapper>
          <StyledHeading align="center">Email Integration</StyledHeading>
          <Typography variant="body2" align="center">
            Forward your pricesheets to custompricing@aurbitrage.com with the
            email address you entered below to view them in the Aurbitrage
            pricing dashboard
          </Typography>
          <Box sx={{ width: "100%", position: "relative" }}>
            <SKUFormField
              value={pricingEmail}
              placeholder="Enter email address"
              onChange={(e) => setPricingEmail(e.target.value)}
            />
          </Box>
          <SaveBtn
            onClick={handleUpdatePricingEmail}
            variant="contained"
            disabled={
              pricingEmail?.trim() === dealerPricingEmail ||
              loading === "loading"
            }
          >
            {loading === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Integrate"
            )}
          </SaveBtn>
          {dealerPricingEmail && (
            <SaveBtn variant="outlined" onClick={() => setIsEdit(false)}>
              Close
            </SaveBtn>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </SectionWrapper>
      )}
      <img src={placeholder} alt="Email Integration" />
    </EmailContainer>
  );
};
export default EmailIntegration;
