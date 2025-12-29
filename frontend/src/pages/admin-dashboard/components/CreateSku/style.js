import { styled } from "@mui/system";
import { TableRow, TableCell, Box, TextField } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#202020",
  width: "100%",
  border: "black",
  position: "relative",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#fff",

  "&.SkuTableCellAdmin": {
    display: "flex",
    justifyContent: "flex-start",
    height: "122px",
    verticalAlign: "top",
    paddingTop: "15px",
    alignItems: "left",
  },
  "&.SkuTableCell": {
    verticalAlign: "top",
    paddingTop: "15px",
  },
  "&.TableCellField": {
    verticalAlign: "top",
    paddingTop: "10px",
  },
  "&.StyledTableCell": {
    paddingTop: "5px",
  },
  "&.buttonCell": {
    padding: "0px",
  },
  "&.DealerTableCell": {
    verticalAlign: "top",
    paddingTop: "20px",
  },
  "&.DateTableCell": {
    width: "6em",
    color: "white",
    verticalAlign: "top",
  },

  "& .dealerSkuAutoComplete": {
    width: "150px",
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
  },
  "& .dealerAutoComplete": {
    width: "auto",
    maxWidth: "140px",
    minWidth: "130px",
    backgroundColor: "#4a4a4a",
    borderRadius: "16px",
    padding: "9px 9px",
    paddingLeft: "9px",
    color: "white",
    "& .MuiInputBase-root": {
      color: "white",
    },
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
