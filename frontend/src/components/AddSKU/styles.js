import {
  styled,
  TextField,
  Box,
  Autocomplete,
  Modal,
  Grid,
  Tab,
  Button,
} from "@mui/material";

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
    color: theme.palette.background.card,
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
    color: "#fff",
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

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "500px",
});
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
    color: theme.palette.background.card,
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
    color: theme.palette.background.card,
  },
  "& .Mui-disabled": {
    color: "#b0b0b0 !important",
    WebkitTextFillColor: "#b0b0b0 !important", // Chrome/Safari
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

const SKUTableCell = styled(Grid)(({ theme }) => ({
  color: "#fff",

  ".MuiPopper-root .MuiAutocomplete-listbox, .MuiList-root .MuiMenuItem-root": {
    borderRadius: 10,
    color: "white",
  },
  ".MuiFormLabel-root.MuiInputLabel-root": {
    color: theme.palette.background.card,
  },
}));
const AddButton = styled(Button)(({ theme, danger }) => ({
  fontWeight: "600",
  height: "48px",
  fontSize: "13px",
  borderRadius: 10,
  backgroundColor: danger
    ? theme.palette.danger.main
    : theme.palette.secondary.main,
  color: danger ? "#fff" : "#000",
  "&:hover": {
    backgroundColor: danger ? "#fff" : theme.palette.secondary.main,
    color: "#000",
    border: "none",
  },
}));

export {
  AddButton,
  SKUTableCell,
  ActionButtonContainer,
  SKUFormField,
  SKUModalContainer,
  SKUAutocomplete,
  SKUSelect,
  StyledModal,
};
