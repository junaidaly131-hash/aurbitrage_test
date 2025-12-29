import { color, styled } from "@mui/system";
import { Box } from "@mui/material";

export const FormStyledBox = styled(Box)(({ theme }) => ({
  ".PhoneInput": {
    background: "#E9CF95",
    padding: "0 10px",
    borderRadius: "10px",
  },
  ".leftIcon": {
    width: "30px",
    position: "absolute",
    top: "12px",
    left: "10px",
  },
  ".rightIcon": {
    width: "30px",
    position: "absolute",
    top: "12px",
    right: "10px",
  },
  ".commonInputStyle": {
    background: "#E9CF95",
    border: "none",
    padding: "16px 50px",
    outline: "none",
    borderRadius: "10px",
    width: "100%",
    fontSize: "17px",
  },
  ".errorMessage": {
    color: "red",
  },
  input: {
    background: "#E9CF95",
    border: "none",
    padding: "16px 0 16px 5px",
    outline: "none",
    borderRadius: "10px",
    width: "100%",
    fontSize: "17px",
  },
}));
