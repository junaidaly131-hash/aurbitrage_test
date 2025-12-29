import { styled } from "@mui/system";
import { Stack, TableCell, TableRow } from "@mui/material";

const StyledStack = styled(Stack)(({ theme }) => ({
  height: "100%",
  alignItems: "center",

  "&.TableRow": {
    backgroundColor: "#191919",
    width: "100%",
    color: "#fff",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme, createSKURelation }) => ({
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",
  "&.FirstCell": {
    display: "grid",
    justifyContent: "flex-start",
  },
  "&.PriceCell": {
    width: "120px",
  },
  "&.LastCell": {
    display: "grid",
    justifyContent: createSKURelation ? "center" : "flex-end",
  },
}));

const Row = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#696969",
  "&:hover": {},
}));

export { StyledTableCell, StyledStack, Row };
