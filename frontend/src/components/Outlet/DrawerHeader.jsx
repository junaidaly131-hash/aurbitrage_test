import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1, 0),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  minHeight: "64px !important",
  [theme.breakpoints.down("md")]: {
    minHeight: "110px !important",
  },
}));

export default DrawerHeader;
