import { Box, Button, styled, Typography } from "@mui/material";

const Wrapper = styled(Box)(({ theme: { spacing, palette } }) => ({
  padding: spacing(3),
  background: palette.background.paper,
  borderRadius: spacing(1.5),
}));
const Content = styled(Box)(({ theme: { palette } }) => ({
  padding: "16px",
  background: palette.neutral[100],
  marginTop: "12px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
}));
const Tabs = styled(Box)(({ theme: { palette } }) => ({
  padding: "12px",
  background: palette.background.gray,
  gap: "24px",
  display: "flex",
  borderRadius: "20px",
}));
const Tab = styled(Button)(({ theme: { palette }, active = "false" }) => ({
  padding: "12px 18px",
  fontFamily: "Outfit",
  fontSize: "18px",
  borderRadius: "12px",
  textDecoration: "none",
  background:
    active === "true" ? palette.secondary.main : palette.background.overlay,
  color: active === "true" ? "#000" : "#fff",
  textTransform: "none",
  lineHeight: "20px",
  "&:hover": {
    background: palette.secondary.main,
    color: "#000",
  },
}));
const TabContainer = styled(Box)({
  height: "auto",
  maxHeight: "440px",
  overflowX: "hidden",
  overflowY: "scroll",
  paddingRight: "16px",
});
const Description = styled(Typography)({
  fontSize: "20px",
  fontFamily: "Outfit",
  color: "#fff",
});
const StyledHeader = styled(Box)(({ theme: { palette, spacing }, bg }) => ({
  background: bg ? `url(${bg})` : palette.background.gray,
  height: "180px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: spacing(1.5),
  position: "relative",
  marginBottom: "14px",
}));
const DealerInfoWrapper = styled(Box)(({ theme }) => ({}));
const SocialIcon = styled("img")(({ theme: { palette } }) => ({
  height: "24px",
  width: "24px",
}));
const SocialLinks = styled(Box)(
  ({ theme: { palette }, gap = "18px", align }) => ({
    display: "flex",
    gap: gap,
    justifyContent: align,
  }),
);
const SocialLink = styled("a")(({ theme: { palette } }) => ({
  height: "24px",
  width: "24px",
  cursor: "pointer",
  hover: {},
}));
const Error = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  textAlign: "center",
}));
const RefreshBtn = styled(Button)({
  padding: "6px 30px",
  // width:"20%",
  background: "rgba(219, 164, 45, 0.5)",
  color: "white",
  "&:hover": {
    background: "rgba(219, 164, 45, 0.5)",
  },
});
const ErrorWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "center",
});
export {
  Wrapper,
  Content,
  Tabs,
  Tab,
  TabContainer,
  Description,
  SocialIcon,
  SocialLinks,
  SocialLink,
  StyledHeader,
  DealerInfoWrapper,
  Error,
  ErrorWrapper,
  RefreshBtn,
};
