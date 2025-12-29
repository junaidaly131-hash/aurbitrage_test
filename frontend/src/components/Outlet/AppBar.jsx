import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

// const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerWidth }) => ({
  height: "64px",
  paddingTop: "0 !important",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(Boolean(open) && {
    width: `calc(100% - ${open ? drawerWidth : "0"}px)`,
    marginLeft: `${open ? drawerWidth : "0"}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
    height: "110px",
  },
}));

export default AppBar;
