import { styled } from "@mui/system";
import { Autocomplete, TextField } from "@mui/material";

export const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: "230px",
  backgroundColor: "#4a4a4a",
  borderRadius: "16px",
  padding: "9px 9px",
  paddingLeft: "9px",
  color: "white",
  "& .TextField": {
    color: "white",
    "& .MuiInputBase-input::placeholder": {
      color: "white",
      opacity: 1,
      paddingLeft: "50px",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiFormHelperText-root": {
      color: "white",
    },
  },
  "& .InputProp": {
    fontSize: "small",
    color: "#fff",
  },

  "& .InputLabelProps": {
    color: "#fff",
  },
}));

const SKUAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  "& .MuiAutocomplete-inputRoot": {
    width: "100%",
    fontSize: "13px",
    color: "white",
    padding: "0 16px",
    gap: 24,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#292929",
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
  },
  "& .MuiInputLabel-root": {
    color: "#696969",
    position: "relative",
    top: "0px",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
  "& .MuiIconButton-root": {
    color: "white",
  },
}));
const SKUInputField = styled(TextField)(({ theme }) => ({
  color: "white",
  "& .MuiInputLabel-root": {
    color: "#696969",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
}));
const SKUFormField = styled(TextField)(({ theme, width }) => ({
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
    backgroundColor: "#292929",
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
  },
  "& .MuiInputLabel-root": {
    color: "#696969",
  },
}));

export { SKUAutocomplete, SKUInputField, SKUFormField };
