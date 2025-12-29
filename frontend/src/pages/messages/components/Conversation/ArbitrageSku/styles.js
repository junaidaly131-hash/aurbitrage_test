import { Clear } from "@mui/icons-material";
import { Box, Typography, alpha, styled } from "@mui/material";
const Wrapper = styled(Box)(({ theme, isOwnMessage, isAttachment }) => ({
  background: isAttachment
    ? "transparent"
    : isOwnMessage
      ? theme.palette.background.dark3
      : theme.palette.background.dark4,
  borderRadius: 12,
  padding: "6px",
  width: "100%",
  maxWidth: "360px",
  position: "relative",
  cursor: "pointer",
  border: `1px solid ${isAttachment ? "transparent" : theme.palette.background.dark3}`,
}));
const SKUTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "18px",
  display: "inline-block",
}));
const Order = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 400,
  color: "#fff",
  lineHeight: "18px",
  display: "inline-block",
}));
const Metal = styled(Typography)(() => ({
  fontFamily: "Outfit",
  fontSize: 12,
  fontWeight: 500,
  color: "#fff",
  lineHeight: "12px",
  textAlign: "left",
  marginTop: 0,
  display: "inline-block",
}));
const SKUInfo = styled(Box)(() => ({
  display: "inline-flex",
  gap: 12,
  alignItems: "center",
  color: "#fff",
  flexShrink: 0,
}));
const Td = styled(Box)(() => ({}));
const SKUPrice = styled(Box)(({ theme }) => ({
  height: "18px",
  borderRadius: "3px",
  padding: "0 12px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  fontWeight: 400,
  border: `1px solid ${theme.palette.background.dark3}`,
  color: "#fff",
  "span:last-of-type": {
    fontSize: "8px",
    background: alpha(theme.palette.secondary.main, 0.1),
    borderRadius: "6px",
    padding: "0 3px",
    height: "10px",
    marginLeft: "4px",
    position: "relative",
    lineHeight: "8px",
    paddingLeft: "11px",
    "&:before": {
      content: '""',
      position: "absolute",
      width: "5px",
      borderRadius: "50%",
      height: "5px",
      left: "3px",
      top: "50%",
      transform: "translateY(-50%)",
      background: alpha(theme.palette.secondary.main, 0.8),
    },
  },
}));
const MetalPrice = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  fontWeight: 400,
  height: "18px",
  color: "#fff",
  background: theme.palette.background.paper,
  borderRadius: "3px",
  padding: "0  12px",
  textTransform: "capitalize",
}));
const PriceBox = styled(Box)(() => ({
  height: "18px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexShrink: 0,
}));
const Row = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  flexDirection: "column",
}));
const CloseIcon = styled(Clear)({
  position: "absolute",
  right: 4,
  top: "4",
  cursor: "pointer",
  height: "16px",
});

export {
  Wrapper,
  SKUTitle,
  SKUInfo,
  Order,
  Metal,
  Td,
  SKUPrice,
  MetalPrice,
  PriceBox,
  Row,
  CloseIcon,
};
