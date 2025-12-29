import {
  styled,
  Button,
  TextField,
  TableCell,
  TableRow,
  Box,
  Autocomplete,
  Modal,
  Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchFilterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  background: theme.palette.background.overlay,
  padding: "12px 32px",
  borderRadius: "12px",
}));
const FilterButton = styled(Button)(({ theme }) => ({
  padding: "0 16px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "unset",
  borderRadius: "12px",
  background: "#696969",
  color: "#fff",
  gap: "16px",
  "&:hover": {
    background: "#696969",
  },
}));
const Clear = styled(ClearIcon)({
  color: "#D80027",
  fontWeight: "bold",
});

// POPUP

const SKUTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#202020",
  width: "100%",
  border: "black",
  position: "relative",
}));

const SKUTableCell = styled(Grid)(({ theme }) => ({
  color: "#fff",

  ".MuiPopper-root .MuiAutocomplete-listbox, .MuiList-root .MuiMenuItem-root": {
    borderRadius: 10,
    color: "white",
  },
}));

const ActionButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",

  "& .buttonStyle": {
    "&.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
  "& .cancelIcon": {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#cf142b",
    cursor: "pointer",
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

const SKUModalContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#121212",
  border: "2px solid #333",
  borderRadius: "8px",
  padding: "20px",
  width: "90%",
  maxWidth: "600px",
  maxHeight: "90%",
  overflow: "auto",
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

const SKUInputField = styled(TextField)(({ theme }) => ({
  color: "white",
  "& .MuiInputLabel-root": {
    color: "#696969",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
}));

const SKUSelect = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    width: "100%",
    fontSize: "13px",
    color: "white",
    padding: "0 16px",
    gap: 24,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#292929",
    marginTop: "0px",
    "&:before": {
      borderBottom: "0",
      display: "none",
    },
    "&:after": {
      borderBottom: "0",
      display: "none",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#696969",
    position: "relative",
    fontSize: "13px",
    transform: "translate(0, 0) scale(1)",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
  "& .MuiMenu-paper": {
    backgroundColor: "#292929",
    color: "white",
  },
  "& .MuiMenuItem-root": {
    color: "white",
  },
}));

export const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "500px",
});

export const AutocompletePaper = styled("div")({
  textAlign: "left",
  backgroundColor: "#000",
  color: "#fff",
});

export const DealerTextField = styled(TextField)({
  color: "white",
  "& .MuiInputBase-input::placeholder": {
    color: "white",
    opacity: 1,
    paddingLeft: "30px",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
});

export {
  SearchFilterWrapper,
  FilterButton,
  Clear,
  SKUTableRow,
  SKUTableCell,
  ActionButtonContainer,
  SKUFormField,
  SKUModalContainer,
  SKUAutocomplete,
  SKUInputField,
  SKUSelect,
};
