import { Modal, Box, Typography, Button, Fade, useTheme } from "@mui/material";

const DisclaimerModal = ({ open, onClose }) => {
  const theme = useTheme();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: theme.palette.primary, fontWeight: "bold", mb: 2 }}
          >
            DISCLAIMER
          </Typography>
          <Typography sx={{ color: "white", mb: 4 }}>
            All pricing you see on the dashboard is displayed for indication
            only and should always be verified with the dealer before being
            acted upon. We do our best to ensure the pricing is accurate,
            however there can be technical issues or changing market conditions
            that may affect the price you see. Always confirm pricing with the
            dealer and do not assume the price you see on the dashboard is
            correct.
          </Typography>
          <Button variant="contained" color="primary" onClick={onClose}>
            I acknowledge
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DisclaimerModal;
