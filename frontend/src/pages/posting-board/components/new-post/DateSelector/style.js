import {
  Box,
  Typography,
  Input,
  FormControlLabel,
  Button,
  ButtonGroup,
  Modal,
  GlobalStyles,
} from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& .h6": {
    margin: "13px 0",
    fontWeight: "300",
    fontSize: "17px",
    justifyContent: "space-between",
    width: "100%",
  },
  "& .MuiInputBase-input": {
    background: "transparent",
  },
}));

const RowContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const ColumnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "170px",
}));

const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const DateTimeInput = styled(Input)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  backgroundColor: "#191919",
  color: "#fff",
  "& input": {
    backgroundColor: "#191919",
    color: "#fff",
  },
  "&::-webkit-calendar-picker-indicator": {
    filter: "invert(1)",
    cursor: "pointer",
  },
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(1.5, 0),
  "& .MuiFormControlLabel-label": {
    color: "white",
  },
}));

// Create the global styles object without using JSX
const datePickerStyles = {
  'input[type="date"]::-webkit-calendar-picker-indicator, input[type="time"]::-webkit-calendar-picker-indicator':
    {
      filter: "invert(1)",
      cursor: "pointer",
    },
};

// Export a function that returns the GlobalStyles component
const createDatePickerGlobalStyle = () => {
  return new GlobalStyles({ styles: datePickerStyles });
};

export {
  Container,
  RowContainer,
  ColumnContainer,
  Label,
  DateTimeInput,
  CustomFormControlLabel,
  createDatePickerGlobalStyle as DatePickerGlobalStyle,
};
