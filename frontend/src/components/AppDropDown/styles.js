import { styled, Menu, MenuItem, alpha, Typography } from "@mui/material";

const DropdownMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPopover-paper": {
    maxHeight: "70vh",
    backgroundColor: "#353535 !important",
    color: "#fff",
    minWidth: "6em",
    borderRadius: "6px",
    overflow: "hidden",
    "& .MuiList-root": {
      padding: "0 !important",
    },
    "& .MuiMenuItem-root": {
      paddingRight: "1em",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));
const DropdownItem = styled(MenuItem)(({ theme, active }) => ({
  padding: "6px 16px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "400",
  borderTop: `1px solid ${alpha("#dadada", 0.2)}`,
  backgroundColor: active ? theme.palette.secondary.main : "transparent",
  color: active ? "#000" : "#fff",
  "&:first-of-type": {
    borderTop: "none",
  },
  "&:hover": {
    background: `${theme.palette.secondary.main} !important`,
    color: "#000",
  },
}));
const Wrapper = styled("div")(({ theme }) => ({
  display: "inline-block",
  position: "relative",
  "& .dropdown-button": {
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#fff",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    height: "28px",
    padding: "0 18px",
    background: "#212121",
    whiteSpace: "nowrap",
  },
  "& .dropdown-icon": {
    marginLeft: "10px",
    width: "20px",
    height: "20px",
    background: theme.palette.background.overlay,
    borderRadius: "4px",
  },
}));
const Label = styled(Typography)({
  fontSize: "inherit",
});

export { DropdownMenu, DropdownItem, Wrapper, Label };
