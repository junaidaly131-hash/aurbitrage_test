import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    color: "#fff",
  },
  border: "none",
  alignItems: "center",
  cursor: "pointer",
  textAlign: "left !important",

  "& span": {
    display: "inline-block",
  },
  "& .sort": {
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
  },
}));
