import { styled } from "@mui/system";
import { Box, Card, Button } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  "& .innerDiv": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  "& h4": {
    color: "#fff",
    textAlign: "center",
    margin: "0px",
    fontWeight: "700",
  },
  "& p": {
    textAlign: "center",
  },
}));
export const StyledCard = styled(Card)(() => ({
  backgroundColor: "transparent",
  "& .login-form-content": {
    textAlign: "center",
    color: "#fff",
  },
  "& .login-logo": {
    height: "64px",
    cursor: "pointer",
  },
  "& h3": {
    marginBottom: "10px",
    color: "#fff",
  },
  "& .login-para": {
    color: "#8a8a8a",
  },
  "& .login-label": {
    marginLeft: "10px",
    marginBottom: "3px",
  },
  "& .login-remember": {
    marginLeft: "5px",
    color: "#fff",
  },

  "& .login-input": {
    color: "#fff",
    background: "transparent",
    padding: "12px",
    outline: "none",
    border: "2px solid #595959",
    borderRadius: "20px",
  },
}));
export const StyledButton = styled(Button)(() => ({
  marginTop: 20,
  background: "#DBA42D",
  borderRadius: "30px",
  padding: "10px",
  "&:hover": {
    backgroundColor: "#DBA42D",
  },
}));
