import { Box, MenuItem, Select, styled, Typography } from "@mui/material";
import { fontSize, fontWeight } from "@mui/system";

const Wrapper = styled(Box)(({ theme }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "center",
}));
const Label = styled(Typography)({
  fontSize: "18px",
  color: "#696974",
});
const StyledSelect = styled(Select)(({ theme }) => ({
  color: "#fff",
  svg: {
    color: "#fff",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "0",
    boxShadow: "none",
  },
  "&.Mui-focused:hover": {
    boxShadow: "none",
  },
  "& .MuiSelect-select": {
    fontSize: "18px",
    fontWeight: 600,
    padding: "0 8px",
    alignItems: "center",
    display: "flex",
  },
  "&.MuiSelect-outlined, &.MuiSelect-standard": {},
}));
const Item = styled(MenuItem)({
  color: "#fff",
});

export { Wrapper, Label, StyledSelect, Item };
