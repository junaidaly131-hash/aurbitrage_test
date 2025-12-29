import { Avatar, Box, Grid, styled, Typography, Button } from "@mui/material";
import { palette } from "@mui/system";

const Wrapper = styled(Grid)(({ header }) => ({
  background: "#191919",
  borderRadius: "20px",
  width: "100%",
  margin: "0px auto",
  overflow: "hidden",
  position: "relative",
  padding: "24px",
  height: `calc(100vh - ${48 + 64}px)`,
}));
const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
});
const TitleBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});
const Title = styled(Typography)({
  fontFamily: "Outfit",
  fontWeight: 600,
  fontSize: "24px",
  color: "#fff",
});
const NotificationsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  maxHeight: "calc(100vh - 200px)",
  overflow: "auto",
  paddingRight: "20px",
});
const Setting = styled(Box)({
  display: "flex",
  gap: "12px",
  color: "#fff",
  alignItems: "center",
  fontSize: "18px",
});
const Error = styled(Box)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  padding: "40px",
}));
const NotFound = styled(Box)({
  textAlign: "center",
  padding: "20px 0",
  color: "#fff",
  fontSize: "18px",
});

const BulkActionsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  background: "#212223",
  borderRadius: "12px",
  marginBottom: "12px",
  gap: "12px",
});

const BulkActionsLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const BulkActionsRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const SelectionInfo = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
  fontFamily: "Outfit",
});

const ActionButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontSize: "12px",
  padding: "6px 12px",
  minWidth: "auto",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
}));

const SelectAllButton = styled(Button)(({ theme }) => ({
  color: "#92929D",
  fontSize: "12px",
  padding: "6px 12px",
  minWidth: "auto",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
}));

export {
  Wrapper,
  Header,
  Title,
  TitleBar,
  NotificationsWrapper,
  Setting,
  Error,
  NotFound,
  BulkActionsContainer,
  BulkActionsLeft,
  BulkActionsRight,
  SelectionInfo,
  ActionButton,
  SelectAllButton,
};
