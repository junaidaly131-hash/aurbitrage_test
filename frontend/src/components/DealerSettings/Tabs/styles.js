import { Box, Button, styled } from "@mui/material";

const TabsWrapper = styled(Box)(({ theme: { spacing, palette } }) => ({
  padding: spacing(1.5),
  background: palette.background.gray,
  borderRadius: "20px",
  display: "flex",
  gap: "12px",
  flexWrap: "Wrap",
}));
const Tab = styled(Button)(({ theme: { palette }, active }) => ({
  background: active ? palette.secondary.main : palette.background.overlay,
  color: active ? "#000" : "#fff",
  borderRadius: "12px",
  height: "44px",
  fontFamily: "Outfit",
  fontWeight: "400",
  fontSize: "18px",
  textTransform: "unset",
  "&:hover": {
    background: palette.secondary.main,
    color: "#000",
  },
}));

export { TabsWrapper, Tab };
