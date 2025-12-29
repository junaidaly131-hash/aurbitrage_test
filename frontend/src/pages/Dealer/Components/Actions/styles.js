import { Box, IconButton, Menu, MenuItem, styled } from "@mui/material";

const StyledMenu = styled(Menu)(({ theme }) => ({
  color: "#fff",
  ".MuiPopover-paper": {
    padding: "4px 0px",
  },
}));
const Dots = styled(IconButton)(({ theme: { palette } }) => ({
  color: palette.secondary.main,
  padding: 0,
  height: "24px",
}));
const Item = styled(MenuItem)(({}) => ({
  color: "#fff",
  gap: "8px",
  svg: {
    height: "24px",
    width: "24px",
  },
}));

export { StyledMenu, Dots, Item };
