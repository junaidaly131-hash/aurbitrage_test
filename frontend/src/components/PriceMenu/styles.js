import { alpha, styled } from "@mui/material";

const Button = styled("div")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  background: open ? theme.palette.secondary.main : "#353535",
  color: open ? "#000" : "#fff",
  borderRadius: 6,
  padding: "7px 12px",
  height: 32,
  gap: 4,
  cursor: "pointer",
  transition: "background 0.2s",
  svg: {
    color: theme.palette.secondary.main ? "#fff" : "#fff",
  },
}));
const Label = styled("span")({
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "Outfit",
});
const Time = styled("span")(({ theme }) => ({
  fontSize: "8px",
  fontWeight: 400,
  fontFamily: "Outfit !important",
  padding: "4px",
  borderRadius: 6,
  textWrap: "nowrap",
  background: alpha("#fff", 0.1),
  "&.active": {
    background: alpha(theme.palette.background.overlay, 0.4),
    color: "#fff",
  },
}));
const IconBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  borderRadius: 6,
  background: theme.palette.background.overlay,
  padding: "3px",
  svg: {
    height: "20px",
    width: "20px",
  },
}));
const Menu = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  background: theme.palette.background.overlay,
  borderRadius: 6,
  boxShadow: "0 4px 24px #0008",
  minWidth: 128,
  zIndex: 100,
  padding: "0",
  maxWidth: 600,
  overflow: "hidden",
  width: "100%",
}));

const MenuItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  fontSize: "10px",
  fontWeight: 600,
  gap: 6,
  cursor: "pointer",
  // background: ({ active }) =>
  //   active ? theme.palette.secondary.main : "transparent",
  color: "#fff",
  transition: "background 0.2s, color 0.2s",
  textDecoration: "none",
  "&.menu-item": {
    borderTop: `1px solid ${alpha("#DADADA", 0.2)}`,
    "&:nth-child(1)": {
      borderTop: "none",
    },
  },
  "&:hover": {
    background: theme.palette.secondary.main,
    color: "#000",
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
    "&:hover": {
      background: "transparent",
      color: "#fff",
    },
  },
}));
const SubMenu = styled("div")({
  background: "#4E4E4E",
  borderRadius: 12,
  boxShadow: "0 4px 24px #0008",
  padding: "12px 32px 12px 12px",
  position: "absolute",
  minWidth: "260px",
});

const SubMenuItem = styled("div")({
  color: "#fff",
  fontSize: "8px",
  fontWeight: 500,
  textAlign: "left",
});
const Field = styled("div")(({ theme }) => ({
  height: "21px",
  borderRadius: "5px",
  fontSize: "10px",
  fontWeight: 400,
  background: theme.palette.background.overlay,
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  padding: "0 6px",
}));
const Group = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginTop: "6px",
  "&:first-of-type": {
    marginTop: 0,
  },
});

const Back = styled("div")(({ theme }) => ({
  height: "16px",
  width: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "16px",
  position: "absolute",
  right: "8px",
  top: "8px",
  svg: {
    height: "16px",
    width: "16px",
    color: "#fff",
  },
}));

const Wrapper = styled("div")({
  paddingTop: "12px",
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 100,
  width: "100%",
});

const MenuWrapper = styled("div")({
  position: "relative",
  display: "inline-block",
});

export {
  Button,
  Label,
  Time,
  IconBox,
  Menu,
  MenuItem,
  Back,
  SubMenu,
  SubMenuItem,
  Wrapper,
  MenuWrapper,
  Group,
  Field,
};
