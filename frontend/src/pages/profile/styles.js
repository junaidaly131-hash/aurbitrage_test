import { Box, Button, IconButton, styled } from "@mui/material";

const StyledContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.dark,
  borderRadius: "6px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  paddingBottom: "10px",
  padding: theme.spacing(3),
  gap: "24px",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5),
  },
}));
const StyledWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "6px",
  width: "100%",
  padding: "12px 24px",
  display: "flex",
  alignItems: "center",
  color: "#fff",
  height: "58px",
  gap: "12px",
  [theme.breakpoints.down("md")]: {
    background: theme.palette.background.dark,
    height: "calc(100vh - 144px)",
  },
  " h3": {
    margin: "0 0 0 10px !important",
  },
}));
const TabBtn = styled(Button)(({ theme, variant }) => ({
  textTransform: "capitalize",
  border: `1px solid ${variant === "outlined" && theme.palette.background.dark3}`,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: theme.spacing(1.5, 1.75),
    borderRadius: "6px",
    height: "48px",
    color: "#fff",
  },
}));
const ContentContainer = styled(Box)({
  borderRadius: "6px",
  height: "calc(100vh - 192px)",
  overflow: "auto",
});
const MobileHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0 12px 12px",
  color: "#fff",
  gap: "12px",
});
const BackBtn = styled(IconButton)({
  color: "#fff",
  padding: 0,
});

export {
  StyledContainer,
  StyledWrapper,
  TabBtn,
  ContentContainer,
  MobileHeader,
  BackBtn,
};
