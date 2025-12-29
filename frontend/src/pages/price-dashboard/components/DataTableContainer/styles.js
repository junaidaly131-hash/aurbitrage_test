import { Box } from "@mui/material";
import { styled } from "@mui/system";
export const TableWrapper = styled(Box)({
  overflowY: "scroll",
  height: "79vh",
  maxWidth: "calc(100vw - 76px)",
});

export const TableContainer = styled(TableWrapper)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
});
