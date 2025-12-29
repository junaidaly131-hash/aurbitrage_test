import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = ({ inviteUser }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ padding: "20px", color: "#000" }}>
      <div>
        <Box
          sx={{
            background: "#000",
            width: "50px",
            height: "7px",
            borderRadius: "20px",
          }}
        ></Box>
        <h4 style={{ color: "#000", margin: "10px 0" }}>
          Thank you for registering!
        </h4>
        {inviteUser ? (
          <>
            <p>Your application is now complete. You can login now.</p>
            <Button
              onClick={handleLoginClick}
              variant="contained"
              sx={{
                color: "#fff",
                background: "#000",
              }}
            >
              Go to Login
            </Button>
          </>
        ) : (
          <>
            <p>
              Your application is now complete and pending approval. We will
              reach out to you shortly with the next steps, thank you.
            </p>
          </>
        )}
      </div>
    </Box>
  );
};

export default RegistrationSuccess;
