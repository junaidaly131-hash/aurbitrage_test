import { FormControl, MenuItem, Select, styled } from "@mui/material";
const StyledDiv = styled("div")(() => ({
  borderRadius: "2px",
  color: "#fff",
  width: "356px",
  marginBottom: "12px",
  "& .css-19ndgf5-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0px",
  },
  "& .css-sz6iw5-MuiFormControl-root": {
    backgroundColor: "#292929",
    boxShadow: "none",
    borderRadius: "9px",
    padding: "12px",
    height: "42px",
  },
  "& .css-19ndgf5-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-19ndgf5-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-19ndgf5-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
    {
      marginTop: "4px",
      color: "white",
    },
  "& .css-130upmt-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root ": {
    width: "100%",
  },
  ".MuiSelect-select": {
    maxHeight: "240px !important",
    overflow: "auto",
    ".MuiPopover-paper": {
      maxHeight: "240px !important",
      overflow: "auto",
    },
  },
}));
const StyledDropdown = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#1c1c1e",
  borderRadius: "10px",
  color: "#fff",
  width: "100%",
}));

const StyledIconBox = styled("span")(() => ({
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  color: "#fff",
}));

const DropdownLabel = styled("p")(() => ({
  color: "#ffffff",
  marginTop: "0px",
  marginBottom: "6px",
  fontSize: "9px",
  fontFamily: "Outfit",
}));
const DropdownSelect = styled(Select)(() => ({
  color: "#fff",
  width: "100%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "& .MuiSvgIcon-root": {
    color: "#fff",
    fontFamily: "Outfit",
  },
}));
const Item = styled(MenuItem)({
  color: "#fff",
});

const Required = styled("span")(() => ({
  color: "red",
  fontFamily: "Outfit",
}));

const Error = styled("p")(() => ({
  color: "red",
  margin: "0px",
  fontFamily: "Outfit",
}));

export {
  StyledDiv,
  StyledDropdown,
  StyledIconBox,
  DropdownLabel,
  DropdownSelect,
  Item,
  Required,
  Error,
};
