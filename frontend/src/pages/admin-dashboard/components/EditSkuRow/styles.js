import { styled } from "@mui/system";
import { TableCell, Button, TextField } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#292929",
  color: "#fff",
  border: "none",
  padding: "6px",

  "&.first": {
    verticalAlign: "top",
    paddingTop: "20px",
  },
  "&.center": {
    textAlign: "center",
    verticalAlign: "top",
    paddingTop: "20px",
  },
  "&.dateCell": {
    verticalAlign: "top",
    paddingTop: "20px",
    textAlign: "right",
  },
  "&.buttonsCell": {
    position: "relative",
    padding: "0px",
  },
  "&.width": {
    width: "120px",
  },
  "& .data-source-icon": {
    cursor: "pointer",
    marginLeft: "1em",
  },
  "& .cancelIcon": {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#cf142b",
    cursor: "pointer",
  },
}));

export const StyledButtonsDiv = styled("div")(({ theme }) => ({
  minWidth: "max-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledSaveButtons = styled(Button)(({ theme }) => ({
  color: "white",
  "&.Mui-disabled": {
    color: "rgba(255, 255, 255, 0.7)",
  },

  "& .saveIconColor": {
    color: "#1ad598",
  },
}));

export const StyledTextField = styled(TextField)(({ width }) => ({
  width: width,
  color: "white",
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "#696969",
  },
}));
