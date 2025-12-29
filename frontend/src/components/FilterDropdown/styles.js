import { styled, Menu, Typography, MenuItem, alpha } from "@mui/material";


const DropdownMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPopover-paper": {
    maxHeight: "40vh",
    backgroundColor: "#353535 !important",
    color: "#fff",
    minWidth: "10em",
    borderRadius: "6px",
    overflow: "auto",
    marginTop: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
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
  padding: "8px 14px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "400",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: active ? theme.palette.secondary.main : "#292929",
  color: active ? "#000" : "#fff",
  transition: "all 0.15s ease",
  "&:first-of-type": {
    borderTop: "none",
  },
  "&:hover": {
    background: active ? theme.palette.secondary.main : "#292929",
    color: active ? "#000" : "#fff",
  },
  "&.Mui-disabled": {
    opacity: 0.5,
    color: "#999",
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
    transition: "all 0.2s ease",
    "&:hover": {
      background: "#2a2a2a",
    },
    "&.active": {
      background: theme.palette.primary.main,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  "& .dropdown-icon": {
    marginLeft: "10px",
    width: "15px",
    height: "15px",
    background: "#ffffff",
    borderRadius: "100%",
  },
}));

const Label = styled(Typography)({
  fontSize: "inherit",
  fontWeight: "inherit",
});

const SearchContainer = styled("div")(({ theme }) => ({
  padding: "8px 12px",
  backgroundColor: "#292929",
  borderBottom: `1px solid ${alpha("#dadada", 0.2)}`,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: alpha("#dadada", 0.2),
    },
    "&:hover fieldset": {
      borderColor: alpha("#dadada", 0.4),
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

export { DropdownMenu, DropdownItem, Wrapper, Label, SearchContainer };
