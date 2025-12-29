import { alpha, styled } from "@mui/system";
import {
  Box,
  Drawer,
  Toolbar,
  Avatar,
  ListItemButton,
  Button,
  Typography,
  ListItemText,
  IconButton,
  ListItem,
  List,
  ListItemIcon,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { FavOutlinedIcon } from "@/pages/price-dashboard/components/DataTable/styles";

export const StyledToolbar = styled(Toolbar)(({ theme, fullWidth }) => ({
  padding: fullWidth ? "0px !important" : "0 12px 6px 12px !important",
  width: fullWidth ? "100%" : "calc(100%)",
  minHeight: fullWidth ? "44px !important" : "64px !important",
  [theme.breakpoints.down("md")]: {
    minHeight: fullWidth ? "44px !important" : "66px !important",
    padding: fullWidth ? "0px !important" : "0 12px 0px 12px !important",
  },
}));
export const MarqueeContainer = styled("div")(() => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  maxWidth: "calc(100% - 94px)",
}));
export const HeadContainer = styled("div")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderRadius: "6px",
  gap: theme.spacing(1),
  background: theme.palette.background.overlay,
  padding: "0 12px",
}));

export const MarqueeContent = styled("div")(({ theme }) => ({
  display: "flex",
  width: "fit-content",
  gap: theme.spacing(1.5),
  transform: "translateX(0)",
  "&.marquee": {
    animation: "marquee 25s linear infinite",
  },
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
}));

export const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "nowrap",
  background: theme.palette.background.overlay,
  borderRadius: "6px",
  maxHeight: "44px",
  height: "44px",
  gap: theme.spacing(1.5),
  [theme.breakpoints.up("lg")]: {
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.up("xl")]: {
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down("md")]: {
    borderRadius: "0px",
    height: "44px",
  },
}));
export const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontWeight: 500,
  fontSize: "14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "calc(25% - 30px )",
  minWidth: "fit-content",
  whiteSpace: "nowrap",

  "&.static": {
    maxWidth: "70px",
  },
  [theme.breakpoints.down("xl")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "10px",
  },
}));
export const SpotPricesWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "calc(100%)",
  },
}));
export const StyledInnerDiv = styled("div")(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  gap: "4px",
  alignItems: "center",
  fontFamily: "Outfit, sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  "& .right": {
    justifySelf: "right",
  },
  "&.stack": {
    flexDirection: "column",
    gap: "0px",
  },
}));
export const Value = styled("span")({
  alignItems: "center",
  justifyContent: "center",
  display: "inline-flex",
  gap: "4px",
  fontSize: "12px",
  fontWeight: 500,
});
export const FavIcon = styled(FavOutlinedIcon)(() => ({}));

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(
  ({
    theme: { transitions, spacing, breakpoints, palette },
    open,
    drawerWidth,
  }) => ({
    flexGrow: 1,
    background: "#000",
    width: open ? `calc(100% - ${drawerWidth}px)` : "",
    height: "100vh",
    padding: spacing(0, 1.5, 2, 1.5),
    transition: transitions.create("margin", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: transitions.create("margin", {
        easing: transitions.easing.easeOut,
        duration: transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    [breakpoints.down("md")]: {
      padding: spacing(0),
      width: "100%",
      marginLeft: 0,
    },
  }),
);
export const StyledDrawer = styled(Drawer)(({ theme, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    padding: "0",
    width: drawerWidth,
    boxSizing: "border-box",
    background: "#191919",
    overflowX: "hidden",
    zIndex: "99",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      zIndex: 1300,
    },
  },
  "& .MuiDivider-root": {
    display: "none",
  },
}));
export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowY: "none",
}));
export const SiderbarHeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  gap: theme.spacing(2),
  "& .sidebar-header-items": {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
}));
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "contain",
}));
export const StyledLogo = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "contain",
}));
export const AvatarOuterBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "0",
  bottom: "0",
}));
export const AvatarInnerBox = styled(Box)(({ theme }) => ({
  width: "15px",
  height: "15px",
  background: "#07c572",
  borderRadius: "50%",
  border: "3px solid #fff",
  boxSizing: "border-box",
}));
export const LogoImg = styled("img")({
  width: "156px",
  // maxWidth: "100%",
});
export const HeaderIconsBox = styled(Box)(({ bgColor }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  background: bgColor ? bgColor : "#696969",
  borderRadius: "12px",
  marginLeft: "20px",
  width: "46px",
  height: "46px",
  padding: "6px",
  cursor: "pointer",
  "& img": {
    width: "17px",
    height: "17px",
  },
}));
const StyledIconButton = styled(IconButton)({
  // marginLeft: "24px",
});
export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1, 4.5),
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  "& .MuiTypography-body1": {
    fontSize: "16px",
  },
  svg: {
    color: "#fff",
    height: "28px",
    width: "28px",
  },
  "&.active": {
    background: alpha("#fff", 0.05),
    svg: {
      color: "#fff",
    },
  },
  "&.sub-route": {
    paddingLeft: "48px",
    svg: {
      color: "#fff",
      height: "24px",
      width: "24px",
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
    },
  },
}));
const LogoutBtnWrapper = styled("div")({
  position: "sticky",
  bottom: 0,
  right: 0,
  left: 0,
  background: "#191919",
  paddingBottom: "24px",
});
const LogOutBtn = styled(Button)(({ theme: { palette } }) => ({
  color: "white",
  background: "#EA3A3D",
  borderRadius: "8px",
  marginRight: "13px",
  minWidth: "45px",
  height: "45px",
  padding: "6px",
  cursor: "pointer",
  "&:hover": {
    background: "#EA3A3D",
  },
  "& img": {
    width: "17px",
    height: "17px",
  },
}));
const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(3),
  gap: theme.spacing(1.5),
  cursor: "pointer",
  color: "#fff",
  padding: theme.spacing(0, 4.5),
}));
const LogOutText = styled(Typography)({
  fontSize: "16px",
  color: "#ffffff",
  fontWeight: "500",
});
const StyledListText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "16px",
    fontWeight: 500,
  },
});
const StyledText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "18px",
  fontFamily: "Outfit, sans-serif",
  fontWeight: "600",
  color: "#DBA42D",
});
const StyledUserText = styled(Typography)({
  fontSize: "12px",
  lineHeight: "12px",
  fontFamily: "Inter, sans-serif",
  fontWeight: "400",
  color: "#919191",
  fontStyle: "italic",
  marginTop: "4px",
});
const NotificationCounter = styled("span")({
  position: "absolute",
  top: "-3px",
  right: "-3px",
  background: "#DBA42D",
  minWidth: "16px",
  height: "16px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "600",
  padding: "0px 2px",
  fontFamily: "Outfit",
});
const Seprator = styled("div")({
  background: "#C0C0C0",
  height: "1px",
  opacity: "25%",
  maxWidth: "calc(100% - 48px)",
  margin: "0 auto",
});
const StyledWrapperv2 = styled("div")(({ theme }) => ({
  marginTop: "24px",
  marginBottom: "24px",
  [theme.breakpoints.down("md")]: {
    marginTop: "12px",
    marginBottom: "12px",
  },
}));
const DrawerListContainer = styled(List)({
  padding: "0",
  marginBottom: "0px",
  height: "calc(100%)",
});
const BackToMenu = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: "500",
  height: "40px",
  width: "calc(100% - 48px)",
  background: "#404040",
  borderRadius: "6px",
  padding: "0px 20px",
  cursor: "pointer",
  color: "#fff",
  margin: theme.spacing(1.5, 3, 3),
  "& svg": {
    color: theme.palette.danger.main,
  },
}));
const ExploreProductsContainer = styled("div")({
  margin: "0",
});
const ArrowDown = styled(KeyboardArrowDown)(({ theme, rotate }) => ({
  color: `${theme.palette.secondary.main} !important`,
  marginLeft: "12px",
  transition: "0.2s all ease",
}));
const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
const MenuIcon = styled(ListItemIcon)({
  marginRight: "12px",
  minWidth: "auto",
  "&.sub-item": {
    marginRight: "20px",
  },
});
const Item = styled(ListItem)({});
const Content = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "8px",
  height: "calc(100% - 64px)",
  [theme.breakpoints.down("md")]: {
    height: "calc(100% - 110px)",
  },
}));
export {
  LogoutBtnWrapper,
  LogOutBtn,
  ContentWrapper,
  LogOutText,
  StyledListText,
  StyledText,
  StyledUserText,
  NotificationCounter,
  StyledIconButton,
  Seprator,
  StyledWrapperv2,
  DrawerListContainer,
  BackToMenu,
  ExploreProductsContainer,
  ArrowDown,
  FlexBox,
  MenuIcon,
  Item,
  Content,
};
