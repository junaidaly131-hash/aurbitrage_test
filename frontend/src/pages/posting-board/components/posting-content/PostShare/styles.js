import {
  styled,
  Box,
  IconButton,
  ListItemIcon,
  ListItemButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  ListItemText,
  ListItem,
  Button,
} from "@mui/material";

const Wrapper = styled(DialogContent)({
  color: "#fff",
  width: "300px",
  height: "300px",
  maxHeight: "300px",
  padding: "12px 0 0",
});
const Input = styled("input")(({ theme: { palette } }) => ({
  padding: "8px 12px",
  width: "100%",
  paddingLeft: "36px",
  borderRadius: "8px",
  background: palette.neutral.main,
  border: "0",
  outline: "none",
  fontSize: "14px",
  color: "#fff",
  "::placeholder": {
    color: "#fff",
  },
}));
const InputWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  margin: "4px 0",
});
const Icon = styled(IconButton)({
  position: "absolute",
  left: "0px",
  color: "#fff",
  "&.right": {
    left: "unset",
    right: 0,
  },
});
const CheckIcon = styled(ListItemIcon)({
  minWidth: "max-content",
  ".MuiCheckbox-root": {
    padding: "0px 12px 0",
    color: "#fff",
  },
});
const Center = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  padding: "24px",
});
const ListButton = styled(ListItemButton)({
  padding: "6px",
});
const Header = styled(DialogTitle)(({ theme: { palette } }) => ({
  background: palette.background.paper,
  padding: "12px 16px 8px",
  color: palette.secondary.main,
  borderBottom: `1px solid ${palette.background.overlay}`,
}));
const Footer = styled(DialogActions)(({ theme: { palette } }) => ({
  background: palette.background.paper,
  borderTop: `1px solid ${palette.background.overlay}`,
  padding: "8px 16px 12px",
}));
const Label = styled(ListItemText)(({ theme: { palette } }) => ({
  span: {
    color: "#fff",
    fontSize: "14px",
    margin: 0,
  },
  p: {
    color: palette.secondary.main,
    fontSize: "12px",
    textTransform: "capitalize",
  },
}));
const Li = styled(ListItem)(({ theme: { palette } }) => ({
  padding: "4px 12px 8px",
  borderBottom: `1px solid ${palette.background.overlay}`,
  "&.border-b": {
    borderBottom: `1px solid ${palette.secondary.main}`,
  },
  "&:last-of-type": {
    border: 0,
  },
}));
const Title = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  paddingBottom: "4px",
});

const Selection = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  gap: "8px",
  overflow: "auto",
  maxWidth: "268px",
  width: "268px",
  padding: "4px 0",
  "&::-webkit-scrollbar": {
    height: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: palette.secondary.main,
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
}));
const User = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  gap: "4px",
  borderRadius: "4px",
  fontSize: "10px",
  alignItems: "center",
  padding: "0 4px 0 4px",
  whiteSpace: "nowrap",
  background: palette.background.gray,
  cursor: "pointer",
  svg: {
    width: "16px",
  },
}));

export const ActionButton = styled(Button)(({ theme: { palette } }) => ({
  display: "flex",
  gap: "4px",
  alignItems: "center",
  padding: "4px 8px !important",
  "&.Mui-disabled": {
    background: palette.secondary.main,
    color: "#000",
  },
}));

export {
  Wrapper,
  Input,
  InputWrapper,
  Icon,
  CheckIcon,
  Center,
  ListButton,
  Header,
  Footer,
  Label,
  Li,
  Title,
  Selection,
  User,
};
