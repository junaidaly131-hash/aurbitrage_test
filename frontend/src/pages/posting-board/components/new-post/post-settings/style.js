import { Box, FormControlLabel, Typography, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  color: "#fff",
}));
const Required = styled("span")(() => ({
  justifyContent: "flex-end",
  color: "gold",
  marginLeft: "5px",
  display: "flex",
  height: "20px",
  fontSize: "32px",
}));
const StyleDiv = styled("div")(() => ({
  display: "flex",
  width: "100%",
  ".MuiAccordion-root": {
    width: "100%",
  },
}));

const SettingsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "340px",
  gap: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1.5),
    maxWidth: "100%",
  },
}));

const SettingTitle = styled(Typography)({
  fontWeight: 600,
  color: "#fff",
});

const OptionsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "auto",
  maxHeight: "260px",
  "& .MuiInputBase-root": {
    color: "#fff",
    background: theme.palette.background.overlay,
    height: 40,

    "& svg": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.background.overlay}`,
    },
  },
  "& .MuiRadio-root": {
    color: "#fff",
  },
  "& .MuiFormLabel-root": {
    color: "#fff",
    "&:Mui-focused": {
      color: "#fff",
    },
  },
}));

const FlexCenter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.background.dark3}`,
}));

const FormControler = styled(FormControlLabel)({
  margin: 0,
});

const Deals = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

const PostProfileWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
export {
  StyledBox,
  Required,
  StyleDiv,
  SettingsWrapper,
  SettingTitle,
  OptionsWrapper,
  FlexCenter,
  FormControler,
  Deals,
  PostProfileWrapper,
};
