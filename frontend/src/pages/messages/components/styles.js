import { styled, Box, alpha, Typography, Checkbox } from "@mui/material";

const ChatEle = styled(Box)(({ theme, isSelected }) => ({
  width: "100%",
  cursor: "pointer",
  backgroundColor: isSelected
    ? alpha(theme.palette.secondary.main, 0.1)
    : theme.palette.background.overlay,
  color: "white",
  padding: `12px 8px`,
  borderRadius: 16,
}));

const ChatUser = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "2px 12px",
}));
const DealerName = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "500",
  height: "18px",
  padding: theme.spacing(0, 1),
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  shrink: 0,
  minWidth: "fit-content",
  borderRadius: "50px",
  backgroundColor: alpha("#fff", 0.1),
  color: "#fff",
}));
const Unread = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  borderRadius: "50px",
  padding: theme.spacing(0, 1),
  fontWeight: 500,
  height: "18px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  shrink: 0,
  minWidth: "fit-content",
}));
const Empty = styled(Typography)(({ theme }) => ({
  height: "18px",
}));
const Time = styled(Typography)(({ theme }) => ({
  color: theme.palette.background.grey,
}));
const Message = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "160px",
}));
const StyledCheckBox = styled(Checkbox)(({ theme, checked }) => ({
  color: checked
    ? theme.palette.secondary.main
    : theme.palette.background.dark2,

  "& .MuiSvgIcon-root": {
    borderRadius: "5px",
    background: checked
      ? theme.palette.background.grey
      : theme.palette.background.dark2,
    path: {
      color: checked
        ? theme.palette.background.grey
        : theme.palette.background.dark2,
    },
  },
  "&.Mui-checked": {
    // color: theme.palette.secondary.main,
    "& .MuiSvgIcon-root": {
      background: theme.palette.background.grey,
      path: {
        color: theme.palette.secondary.main,
      },
    },
  },
}));

export {
  ChatEle,
  ChatUser,
  DealerName,
  Unread,
  Time,
  Empty,
  Message,
  StyledCheckBox,
};
