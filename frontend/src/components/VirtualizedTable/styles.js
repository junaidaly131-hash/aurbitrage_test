import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";

const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "separate",
  fontFamily: "Roboto",
  fontWeight: "800",
  fontSize: "12px",
  width: "100%",
  borderSpacing: "0",
  "& td": {
    borderRadius: "0 !important",
  },
  "& tbody tr:nth-of-type(odd) td": {
    backgroundColor: "#212223",
    padding: "8px 12px",
    height: "50px",
  },
  "& tbody tr:nth-of-type(even) td": {
    padding: "8px 12px",
    height: "50px",
    backgroundColor: theme.palette.background.overlay,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "& td": {
    borderRadius: "0 !important",
  },
}));

export { StyledTable, StyledTableRow };
