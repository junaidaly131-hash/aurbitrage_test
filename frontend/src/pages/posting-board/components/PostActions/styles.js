import { Menu, styled } from "@mui/material";

const StyledMenu = styled(Menu)(({ theme }) => ({
  color: "#fff",
  "& .PaperProps": {
    overflow: "visible",
    borderRadius: theme.spacing(1),
    marginTop: "22px",
    "& .MuiList-root": {
      background: theme.palette.background.overlay,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1, 0),
      width: "148px",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(0),
    },
  },
  "& .MuiMenuItem-root": {
    padding: theme.spacing(0, 1.5),
    display: "flex",
    alignItems: "center",
    gap: "12px",
    height: "38px",
    fontSize: "12px",
    svg: {
      display: "flex",
      height: "20px",
      width: "20px",
      shrink: 0,
    },
  },

  "& .delete": {
    color: "#EA3A3D",
  },
  "& .edit": {
    color: "#fff",
  },
  "& .circularBar": {
    height: "1em",
    width: "1em",
  },
}));

export { StyledMenu };
