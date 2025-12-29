import { IconButton, Menu, styled } from "@mui/material";

const StyledMenu = styled(Menu)(({ theme }) => ({
  color: "#fff",
  "& .PaperProps": {
    overflow: "visible",
    borderRadius: "12px",
    marginTop: "22px",
    "& .MuiList-root": {
      background: "#191919",
      borderRadius: "12px",
      // height: "110px",
      padding: "12px 24px",
      width: "188px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
  },
  "& .MuiMenuItem-root": {
    padding: "0px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    height: "38px",
    fontSize: "18px",
    fontFamily: "Outfit",
    svg: {
      display: "flex",
      height: "32px",
      width: "32px",
      shrink: 0,
    },
  },

  "& .delete": {
    color: "#EA3A3D",
  },
  "& .view": {
    color: "#fff",
  },
  "& .circularBar": {
    height: "1em",
    width: "1em",
  },
}));
const Icon = styled(IconButton)({
  color: "#fff",
});

export { StyledMenu, Icon };
