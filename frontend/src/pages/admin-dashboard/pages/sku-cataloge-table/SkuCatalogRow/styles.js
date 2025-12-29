// src/styles/SKUCatalogeRowStyles.js
import { styled } from "@mui/system";
import { TableCell } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ align }) => ({
  backgroundColor: "#292929",
  border: "none",
  color: "white",
  padding: "auto 5px",
  textAlign: align ? align : "left",
}));

export const EditIcon = styled("div")(() => ({
  cursor: "pointer",
  color: "white",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
}));
