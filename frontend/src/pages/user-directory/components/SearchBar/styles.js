import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton, InputAdornment } from "@mui/material";

export const StyledAutocomplete = styled(Autocomplete)(({ width, theme }) => ({
  width: width || "300px",
  background: "transparent",
  outline: "none",
  padding: "0 10px",
  borderRadius: "15px",
  color: "#fff",
  "& .MuiInputBase-root": {
    border: `1px solid ${theme.palette.background.gray}`,
    background: `${theme.palette.background.gray} !important`,
    padding: "0 10px",
  },
  "& .MuiAutocomplete-hasClearIcon": {
    display: "none",
  },
}));

export const StyledInputAdornmentStart = styled(InputAdornment)({
  color: "white",
  marginRight: "10px",
});

export const StyledInputAdornmentEnd = styled(InputAdornment)({
  color: "white",
});

export const StyledIconButton = styled(IconButton)({
  color: "white",
});

export const StyledTextField = styled(TextField)({
  input: {
    color: "#fff",
  },
  "& .MuiAutocomplete-hasClearIcon": {
    display: "none",
  },
});
