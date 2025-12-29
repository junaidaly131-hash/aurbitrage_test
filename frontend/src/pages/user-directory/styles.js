// UserDirectory.styles.js
import { styled } from "@mui/system";
import { Grid, Container, Stack, TableRow, TableCell } from "@mui/material";

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  background: "#191919",
  borderRadius: "6px",
  padding: "20px",
  width: "100%",
  margin: "0px auto",
  height: "98%",
  overflowY: "auto",
  position: "relative",
  maxWidth: "xl",
}));

export const StyledHeading = styled("h2")(({ theme }) => ({
  fontSize: "2em",
  margin: "5px",
}));

export const StyledUserCount = styled("p")(({ theme }) => ({
  flex: "0 1 auto",
  margin: "0 !important",
  marginRight: "5px",
  color: "#1AD598",
  fontWeight: "400",
}));

export const StyledDivider = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  borderTop: "solid #5F5F5F 1px",
  paddingTop: "5px",
}));

export const StyledCircularProgressContainer = styled(Container)(
  ({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }),
);

export const StyledVirtualizedTableStack = styled(Stack)(({ theme }) => ({
  height: "100%",
  alignItems: "center",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  color: "#fff",
  background: "#696969",
  borderRadius: "6px",
  "& th:nth-of-type(1)": {
    borderTopLeftRadius: "0px",
  },
  "& th:nth-of-type(2)": {
    borderTopRightRadius: "0px",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",
  textAlign: "left !important",
}));
