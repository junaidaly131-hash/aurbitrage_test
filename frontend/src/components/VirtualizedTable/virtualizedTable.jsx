import React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { StyledTable, StyledTableRow } from "./styles";

const TableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <StyledTable
      {...props}
      style={{
        borderCollapse: "separate",
        fontFamily: "Roboto",
        fontWeight: "800",
        fontSize: "12px",
        width: "100%",
        borderSpacing: "0",
      }}
    />
  ),
  TableHead: TableHead,
  TableRow: (props) => (
    <StyledTableRow
      {...props}
      sx={{
        "& td:first-child": {
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        },
        "& td:last-child": {
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        },
      }}
    />
  ),
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// Add display names to the forwardRef components
TableComponents.Scroller.displayName = "Scroller";
TableComponents.TableBody.displayName = "TableBodyWrapper";

const VirtualizedTable = (props) => {
  return <TableVirtuoso {...props} components={TableComponents} />;
};

export default VirtualizedTable;
