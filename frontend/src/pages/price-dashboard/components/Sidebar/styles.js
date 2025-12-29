import { Box, Button, styled } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

export const SidebarTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  cursor: "pointer",
  "&.sidebar-title": {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
export const StyledSidebarTitle = styled(SidebarTitle)(({ clr, active }) => ({
  borderRadius: "2px",
  minHeight: "45px",
  borderLeft: !active ? `4px solid ${clr}` : "",
  borderBottom: active ? `4px solid ${clr}` : "",
}));
export const Name = styled(Box)({
  fontWeight: "bold",
  flexGrow: 1,
});
export const SidebarItem = styled(Box)(({ theme }) => ({
  width: "100%",
  color: "#fff",
}));
export const SidebarHeading = styled(Box)(({ theme }) => ({
  margin: "24px 0",
  minHeight: "38px",
  height: "38px",
  fontWeight: "400",
  fontFamily: "Outfit",
  color: "#fff",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 3),
}));
export const ResetButton = styled(Box)({
  marginLeft: "10px",
});
export const ScrollY = styled(Box)(({ theme }) => ({
  overflowY: "scroll",
  height: "calc(100vh - 412px)",
  marginRight: "4px",
  padding: theme.spacing(0, 3),
}));
export const StyledButton = styled(Button)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px 10px",
  gap: "6px",
  background: "#4B1818",
  borderRadius: "12px",
  color: "white",
  textTransform: "none",
  "&:hover": {
    background: "#3A1212",
  },
});
export const StyledClearIcon = styled(ClearIcon)({ color: "#D80027" });
export const NodeTitle = styled(Box)(({ theme, clr }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: theme.spacing(1),
  borderRadius: "2px",
  borderLeft: `4px solid ${clr}`,
  minHeight: "45px",
  cursor: "pointer",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));
export const RemoveIcon = styled(RemoveRoundedIcon)(({ clr }) => ({
  color: clr,
  fontWeight: "bold",
}));
export const AddIcon = styled(AddRoundedIcon)(({ clr }) => ({
  color: clr,
  fontWeight: "bold",
}));
const ListLoader = styled(Box)({
  margin: "10px auto",
  display: "flex",
  justifyContent: "center",
});
export { ListLoader };
