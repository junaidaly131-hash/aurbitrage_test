import { Box, styled } from "@mui/material";
const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: "250px",
  margin: "16px 0",
  backgroundColor: "#1a1a1a",
  borderRadius: "6px",
  padding: "16px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  overflow: "hidden",
  transition: "opacity 0.3s ease-in-out",
  top: 0,
  left: 0,
  width: "calc(100% - 12px)",
  zIndex: 1,
  opacity: 1,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 32px)",
    margin: "16px auto",
  },
}));
const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
});
const Profile = styled(Box)({
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  backgroundColor: "#333",
  marginRight: "12px",
});
const Title = styled(Box)({
  width: "120px",
  height: "14px",
  backgroundColor: "#333",
  borderRadius: "4px",
});
const Tag = styled(Box)({
  width: "80px",
  height: "10px",
  backgroundColor: "#444",
  borderRadius: "4px",
  marginTop: "6px",
});
const Media = styled(Box)({
  width: "70%",
  height: "20px",
  backgroundColor: "#333",
  borderRadius: "4px",
  marginBottom: "16px",
});
const Description = styled(Box)({
  width: "90%",
  height: "12px",
  backgroundColor: "#333",
  borderRadius: "4px",
  marginBottom: "8px",
});
const Navigation = styled(Box)({
  width: "85%",
  height: "12px",
  backgroundColor: "#333",
  borderRadius: "4px",
  marginBottom: "8px",
});
const ChatBox = styled(Box)({
  width: "75%",
  height: "12px",
  backgroundColor: "#333",
  borderRadius: "4px",
  marginBottom: "8px",
});
const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
  animation: "shimmer 2s infinite",
  "@global": {
    "keyframes shimmer": {
      "0%": {
        transform: "translateX(-100%)",
      },
      "100%": {
        transform: "translateX(100%)",
      },
    },
  },
});
export {
  Wrapper,
  FlexBox,
  Profile,
  Title,
  Tag,
  Media,
  Description,
  Navigation,
  ChatBox,
  Overlay,
};
