import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import useForgotPassword from "./hooks/useForgotPassword";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, message, isSubmitted, forgotPassword } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <div>
      {isSubmitted ? (
        <h3>
          We have sent reset link to your email. You have one hour before this
          link expires.
        </h3>
      ) : (
        <div>
          <h3>Enter Your Email</h3>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
                marginTop: "20px",
              }}
            >
              <label style={{ marginLeft: "10px", marginBottom: "3px" }}>
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  color: "#fff",
                  background: "transparent",
                  padding: "12px",
                  outline: "none",
                  border: "2px solid #595959",
                  borderRadius: "20px",
                }}
                type="email"
                placeholder="Enter your email"
              />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: 20,
                  background: "#DBA42D",
                  borderRadius: "30px",
                  padding: "10px",
                }}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <>
                    <CircularProgress size={22} />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
        </div>
      )}
      {message && <p style={{ color: "#fff" }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
