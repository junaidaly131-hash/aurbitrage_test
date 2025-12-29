import { styled, Menu, Typography, alpha } from "@mui/material";

const DropdownMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPopover-paper": {
    backgroundColor: "#1b1b1b !important",
    color: "#fff",
    borderRadius: "12px",
    overflow: "visible",
    marginTop: "4px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
    border: `1px solid ${alpha("#fff", 0.08)}`,
    "& .MuiList-root": {
      padding: "0 !important",
    },
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

export { DropdownMenu, Wrapper, Label };
