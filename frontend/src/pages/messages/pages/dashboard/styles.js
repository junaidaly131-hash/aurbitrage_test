import { ArrowBack } from "@mui/icons-material";
import {
  styled,
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  InputBase,
  alpha,
  ButtonBase,
} from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 82px)",
  borderRadius: "6px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.dark,
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 110px)",
  },
}));
const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100%",
  gap: theme.spacing(0.5),
}));
const SidebarBox = styled(Box)(({ theme, showOnMobile }) => ({
  height: "100%",
  flexGrow: 1,
  width: "328px",
  borderRadius: "6px",
  gap: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1.5, 0, 0),
  [theme.breakpoints.down("md")]: {
    width: "100%",
    display: showOnMobile ? "block" : "none",
  },
}));
const ChatBox = styled(Box)(({ theme, showOnMobile }) => ({
  height: "100%",
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
  width: "calc(100% - 320px)",
  borderRadius: "6px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    display: showOnMobile ? "block" : "none",
  },
}));
const CenteredTextBox = styled(Box)({
  textAlign: "center",
  marginTop: "30%",
});
const StyledTypography = styled(Typography)({
  color: "white",
});
const FilterChatsButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "6px",
  border: `1px solid ${theme.palette.background.overlay}`,
  borderRadius: "5px",
  color: theme.palette.background.grey,
  fontSize: "12px",
  letterSpacing: "0px",
  fontWeight: "500",
  fontFamily: "Outfit",
  textTransform: "none",
  "&.active": {
    background: theme.palette.background.overlay,
  },
}));

const Container = styled(Box)({
  height: "100%",
  backgroundColor: "inherit",
});
const ChatWrapperStyled = styled(Stack)(({ theme: { spacing } }) => ({
  height: "100%",
}));
const RowContainerStyled = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(0.5),
  padding: theme.spacing(0, 1.5),
}));
const AddChatButton = styled(ButtonBase)(({ theme: { spacing, palette } }) => ({
  height: "36px",
  width: "50%",
  borderRadius: "6px",
  background: palette.background.overlay,
  color: "white",
  gap: spacing(1.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "500",
  fontFamily: "Outfit",
  "&:hover": {
    background: palette.background.overlay,
  },
}));
const SearchContainerStyled = styled(Stack)(({ theme }) => ({
  width: "100%",
  color: "#818284",
  padding: theme.spacing(0, 1.5),
}));
const ScrollableContainerStyled = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  height: "100%",
  padding: theme.spacing(0, 1.5),
  "&::-webkit-scrollbar": {
    width: "3px !important",
  },
  "&::-webkit-scrollbar-track": {},
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.gray,
    borderRadius: "3px",
    border: "2px solid transparent",
  },
  "&::-webkit-scrollbar-track-piece": {
    background: theme.palette.background.overlay,
  },
}));
const Loader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  marginTop: "10px",
});
const SelectionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  gap: theme.spacing(1.5),
  width: "100%",
  paddingTop: theme.spacing(1.5),
}));
const ModalStyled = styled(Modal)(({ theme: { palette } }) => ({}));
const BoxStyled = styled(Box)(({ theme: { palette, spacing } }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 376,
  background: palette.background.dark2,
  boxShadow: 24,
  padding: spacing(3),
  borderRadius: spacing(2),
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: "white",
}));
const SpacedTypo = styled(TypographyStyled)(({ theme: { spacing } }) => ({
  color: "white",
  textAlign: "center",
}));
const InputBaseStyled = styled(InputBase)(({ theme: { palette } }) => ({
  color: "white",
  background: "white",
  backgroundColor: alpha(palette.background.default, 1),
  borderRadius: 6,
  padding: "0px 20px",
  border: "1px solid #fff",
  margin: "12px 0px",
  width: "100%",
}));
const StackStyled = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  direction: "row",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: "space-between",
}));
const List = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  maxHeight: "500px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.secondary.main,
    borderRadius: "10px",
    border: "2px solid transparent",
  },
  "&::-webkit-scrollbar-track-piece": {
    background: theme.palette.background.overlay,
  },
}));
const ConfirmationButton = styled(Button)(({ theme }) => ({
  width: "200px",
  padding: theme.spacing(0, 3),
}));
const CancelButton = styled(Button)(({ theme }) => ({
  width: "90px",
  padding: theme.spacing(0, 3),
}));
const PointerNone = styled(Box)({
  pointerEvents: "none",
});
const WhiteText = styled(Typography)({
  color: "white",
  marginLeft: "1em",
});
const BackIcon = styled(ArrowBack)({
  color: "#fff",
});
const CreateGroupBtn = styled(Button)({
  width: "100%",
});
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 0, 0),
}));

export {
  StyledTypography,
  CenteredTextBox,
  ChatBox,
  SidebarBox,
  StyledStack,
  StyledBox,
  FilterChatsButton,
  Container,
  ChatWrapperStyled,
  RowContainerStyled,
  AddChatButton,
  SearchContainerStyled,
  ScrollableContainerStyled,
  Loader,
  SelectionWrapper,
  StackStyled,
  InputBaseStyled,
  TypographyStyled,
  BoxStyled,
  ModalStyled,
  SpacedTypo,
  List,
  PointerNone,
  WhiteText,
  BackIcon,
  Wrapper,
  CreateGroupBtn,
  ConfirmationButton,
  CancelButton,
};
