import { Alert, Snackbar } from "@mui/material";

const Toast = ({ hideAlert, showAlert = {} }) => {
  return (
    <Snackbar
      open={showAlert.show}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={hideAlert}
    >
      <Alert
        onClose={hideAlert}
        severity={showAlert.error ? "error" : "success"}
        variant="filled"
      >
        {showAlert.error ? showAlert.errorMessage : "Post Created"}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
