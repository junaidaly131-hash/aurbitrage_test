import styled from "@emotion/styled";
import { alpha, Box, IconButton, TextField } from "@mui/material";

const FooterBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  "& .stack": {
    width: "100%",
    borderRadius: "50px",
    overflow: "hidden",
  },
  "& .send": {
    height: 36,
    width: 47,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 6,
  },
  "& .innerStack": {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const PickerBox = styled(Box)(({ openPicker }) => ({
  display: openPicker ? "inline" : "none",
  zIndex: 10,
  position: "fixed",
  bottom: 150,
  right: 100,
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: `1px solid ${theme.palette.background.grey}`,
    background: "transparent",
    borderRadius: "48px",
    "&.Mui-focused": {
      border: `1px solid ${theme.palette.background.grey}`,
      background: "transparent",
      borderRadius: "48px",
    },
    "&:hover": {
      border: `1px solid ${theme.palette.background.grey}`,
      background: "transparent",
      borderRadius: "48px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "0px 16px",
    color: "white",
    fontSize: "14px",
    borderRadius: "48px",
  },
}));
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  zIndex: "99",
  position: "relative",
}));
const AttachmentBtn = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${alpha("#000", 0.1)}`,
  height: "36px",
  width: "36px",
  background: theme.palette.background.overlay,
}));
const SendBtn = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.main}`,
  height: "36px !important",
  width: "48px !important",
  background: theme.palette.secondary.main,
  borderRadius: "99px",
  color: "#fff !important",
  "&:hover": {
    background: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.light}`,
  },
  "&:active": {
    background: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.light}`,
  },
}));

export { FooterBox, PickerBox, StyledInput, Wrapper, AttachmentBtn, SendBtn };
