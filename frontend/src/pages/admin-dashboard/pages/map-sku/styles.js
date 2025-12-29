import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Stack, TableRow, TableCell, Button } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  height: "100%",
  alignItems: "center",
  " tr": {
    margin: "0px auto !important",
  },
}));

export const StyledDivSkuBtn = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "7px",
}));

export const StyledRepublishButton = styled(Button)(({ theme }) => ({
  ml: 2,
  backgroundColor: "#292929",
  borderRadius: "12px",
  border: "none",
  padding: "9px 9px",
  width: "170px",
  fontSize: "14px",
  color: "#fff",
  fontWeight: "600",
  "&:hover": {
    cursor: "pointer",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

export const StyledTableRowSku = styled(TableRow)(({ theme }) => ({
  width: "100%",
  color: "#fff",
  background: "#696969",
}));

export const StyledSku = styled("div")(({ theme }) => ({
  display: "grid",
  justifyContent: "flex-end",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",
  paddingBottom: "0px",
  paddingTop: "0px",
  borderRadius: "0px !important",
  height: "50px !important",
  alignItems: "center",
  "&.lastCell": {
    display: "grid",
    justifyContent: "flex-end",
  },
  "&:first-of-type": {
    display: "grid",
    textAlign: "left",
  },
}));

export const StyledButton = styled(Button)(({ theme, isSelected }) => ({
  background: isSelected ? "#dba42d" : theme.palette.background.overlay,
  padding: "7px 7px",
  borderRadius: "10px",
  width: "150px",
  margin: "0 12px",
  fontSize: "13px",
  textTransform: "capitalize",

  color: isSelected ? "black" : "#fff",
  "&:hover": { backgroundColor: "#DBA42D" },
}));
