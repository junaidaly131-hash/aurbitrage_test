import styled from "@emotion/styled";
import { Badge, Box, Tooltip, Typography } from "@mui/material";

const ReactorsBox = styled(Box)(({ theme, userId, reactor }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 0",
  cursor: reactor.reactorId == userId ? "pointer" : "default",
  fontSize: "1rem",
  "& .reaction": {
    marginLeft: "5px",
  },
}));

const ReactionsBox = styled(Box)(({ chatType, el }) => ({
  position: "absolute",
  top: el.incoming && chatType === "group" ? 13 : -15,
  right: el.incoming ? -20 : "unset",
  left: !el.incoming ? -20 : "unset",
  display: "flex",
  gap: 0.5,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "10px",
  padding: "2px 5px",
  zIndex: 1,
  cursor: "pointer",
  "& .reactions": {
    fontSize: "15px",
    display: "inline-flex",
    alignItems: "center",
  },
  "& .reactionCount": {
    fontSize: "10px",
    marginLeft: "2px",
    verticalAlign: "sub",
  },
}));

const ReactName = styled(Typography)(({ theme }) => ({
  color: "#fff",
}));
const ReactTooltip = styled(Tooltip)(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.palette.background.overlay,
    padding: theme.spacing(1.5),
    borderRadius: "6px",
    boxShadow: "0px 0px 5px 0px #0000000D",
  },
}));
const ReactBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));
const ReactBoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export {
  ReactName,
  ReactorsBox,
  ReactionsBox,
  ReactTooltip,
  ReactBox,
  ReactBoxWrapper,
};
