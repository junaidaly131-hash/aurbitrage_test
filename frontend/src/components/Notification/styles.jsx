import {
  Avatar,
  Box,
  styled,
  Typography,
  Checkbox,
  IconButton,
} from "@mui/material";

const Card = styled(Box)(({ theme: { palette }, unread, selected }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 16px 12px 24px",
  borderRadius: "15px",
  overflow: "hidden",
  background: selected
    ? "rgba(255, 255, 255, 0.1)"
    : unread === "true"
      ? palette.background.gray
      : "#212223",
  width: "100%",
  cursor: "pointer",
  flexShrink: "0",
  transition: "all 0.2s ease-in-out",
  border: selected
    ? `2px solid ${palette.secondary.main}`
    : "2px solid transparent",
}));

const Content = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "32px",
  flex: 1,
  minWidth: 0,
});

const NotifictionActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexShrink: 0,
});

const Active = styled(Box)(({ theme: { palette } }) => ({
  height: "14px",
  width: "14px",
  borderRadius: "50%",
  background: palette.secondary.main,
}));

const Info = styled(Box)({
  position: "relative",
});

const Profile = styled(Avatar)({
  height: "56px",
  width: "56px",
});

const Icon = styled(Box)(({ theme: { palette } }) => ({
  background: palette.secondary.main,
  borderRadius: "50%",
  height: "32px",
  width: "32px",
  position: "absolute",
  bottom: "-4px",
  right: "-8px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  svg: {
    height: "18px",
    width: "18px",
  },
}));

const Description = styled(Typography)({
  color: "#fff",
  fontFamily: "Outfit",
  fontSize: "15px",
});

const TimeDescription = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Date = styled(Typography)({
  fontFamily: "Roboto",
  fontWeight: "400",
  fontSize: "14px",
  color: "#92929D",
});

const CheckboxContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "24px",
  marginRight: "8px",
});

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#92929D",
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  padding: "2px",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
}));

const QuickActionsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginRight: "8px",
});

const QuickActionButton = styled(IconButton)(({ theme, color }) => ({
  color: color === "error" ? "#EA3A3D" : "#92929D",
  padding: "4px",
  minWidth: "28px",
  height: "28px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  "&:disabled": {
    color: "#666",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

export {
  Card,
  Content,
  NotifictionActions,
  Active,
  Info,
  Profile,
  Icon,
  Description,
  TimeDescription,
  Date,
  CheckboxContainer,
  StyledCheckbox,
  QuickActionsContainer,
  QuickActionButton,
};
