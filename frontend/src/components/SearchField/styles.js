import { styled, Autocomplete, TextField } from "@mui/material";
const Search = styled(Autocomplete)(({ theme, maxWidth }) => ({
  width: "100%",
  maxWidth: maxWidth || "300px",
  "& .MuiAutocomplete-inputRoot": {
    width: "100%",
    fontSize: "13px",
    color: "white",
    padding: "0 16px",
    gap: 20,
    height: 36,
    borderRadius: 12,
    backgroundColor: "transparent",
    "&:before": {
      borderBottom: "0",
      display: "none",
    },
    "&:after": {
      borderBottom: "0",
      display: "none",
    },
  },
  "& .MuiInputBase-root": {
    marginTop: "0px",
    input: {
      backgroundColor: "transparent",
    },
    "input::-webkit-input-placeholder": {
      color: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#696969",
    position: "relative",
    top: "0px",
    marginTop: "0px",
    transform: "translate(0, 0) scale(1)",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
  "& .MuiIconButton-root": {
    color: "white",
  },
}));
const Input = styled(TextField)(({ theme, width }) => ({
  width: "100%",
  color: "white",
  "&:hover": {
    border: "0",
    "& .MuiInput-underline:before": {
      border: "0",
    },
    "& .MuiInput-underline:after": {
      border: "0",
    },
  },
  "&.MuiFormControl-root": {
    display: "flex",
  },
  "& .MuiInput-root": {
    backgroundColor: "transparent",
    borderRadius: "10px",
    height: "40px",
    width: "100%",
    padding: "0 16px",
    marginTop: "0px",
  },
  "& .MuiFormLabel-root": {
    transform: "translate(0, 0) scale(1)",
    position: "relative",
    fontSize: "13px",
  },
  "& .MuiInput-underline:before": {
    border: "0",
  },
  "& .MuiInput-underline:after": {
    border: "0",
  },
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "transparent",
  },
  "& .MuiInputLabel-root": {
    color: "#696969",
  },
}));

export { Search, Input };
