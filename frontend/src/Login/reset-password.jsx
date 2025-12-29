import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import MainLogo from "../assets/images/logo.svg";
import { useLocation } from "react-router-dom";
import useResetPassword from "./hooks/useResetPassword";
import useCheckToken from "./hooks/useCheckToken";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const { message, loading, isReset, resetPassword, updateMessage } =
    useResetPassword();
  const {
    message: tokenMessage,
    loading: tokenLoading,
    isValid,
    checkToken,
  } = useCheckToken();

  const location = useLocation();
  const [token, setToken] = useState("");
  useEffect(() => {
    const urlToken = new URLSearchParams(location.search).get("token");
    setToken(urlToken);
    if (urlToken) {
      checkToken(urlToken);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      updateMessage("Password and confirm password do not match");
      return;
    }
    if (password.length < 6) {
      updateMessage("Password must be at least 6 characters long");
      return;
    }
    resetPassword(token, password);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={MainLogo}
          alt="Logo"
          style={{ width: "150px", height: "150px" }}
        />
      </Box>
      {!isValid ? (
        <>
          <h3>You have already reset your password</h3>
        </>
      ) : (
        <>
          {isReset ? (
            <>
              <h3> Your Password has been Reset. Please Login Again. </h3>

              <p style={{ color: "#fff" }}>
                <a style={{ color: "#fff" }} href="/login">
                  Click Here{" "}
                </a>
                To Login
              </p>
            </>
          ) : (
            <>
              <h1>Reset Password</h1>
              <form onSubmit={handleSubmit} style={{ width: "450px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#fff",
                    marginTop: "20px",
                  }}
                >
                  <label style={{ marginLeft: "10px", marginBottom: "3px" }}>
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      color: "#fff",
                      background: "transparent",
                      padding: "12px",
                      outline: "none",
                      border: "2px solid #595959",
                      borderRadius: "20px",
                    }}
                    type="password"
                    placeholder="Enter your new password"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#fff",
                    marginTop: "20px",
                  }}
                >
                  <label style={{ marginLeft: "10px", marginBottom: "3px" }}>
                    Confirm Password
                  </label>
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      color: "#fff",
                      background: "transparent",
                      padding: "12px",
                      outline: "none",
                      border: "2px solid #595959",
                      borderRadius: "20px",
                    }}
                    type="password"
                    placeholder="Confirm your new password"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#fff",
                    marginTop: "20px",
                  }}
                >
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
                  >
                    {loading ? (
                      <CircularProgress size={22} />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </Box>
              </form>
              {message && <p style={{ color: "#fff" }}>{message}</p>}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ResetPassword;
