import { styled, Button, TableCell, TableRow } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchFilterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  background: theme.palette.background.overlay,
  padding: "12px 32px",
  borderRadius: "12px",
}));
const FilterButton = styled(Button)(({ theme }) => ({
  padding: "0 16px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "unset",
  borderRadius: "12px",
  background: "#696969",
  color: "#fff",
  gap: "16px",
  "&:hover": {
    background: "#696969",
  },
}));
const Clear = styled(ClearIcon)({
  color: "#D80027",
  fontWeight: "bold",
});

const Row = styled(TableRow)(({ theme }) => ({
  width: "100%",
  color: "#fff",
  background: "#696969",
}));

const Cell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",
  paddingBottom: "0px",
  paddingTop: "0px",
  borderRadius: "0px !important",
  height: "50px !important",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
  "&:nth-child(1)": {
    textAlign: "left !important",
  },
  "&:last-of-type": {
    textAlign: "right",
  },
  "&.lastCell": {
    display: "grid",
    justifyContent: "flex-end",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  color: "#fff",

  "&.Mui-disabled": {
    background: "#696969",
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const DeleteButton = styled(Button)(({ theme, danger }) => ({
  fontWeight: "600",
  height: "48px",
  fontSize: "13px",
  borderRadius: 10,
  backgroundColor: danger
    ? theme.palette.danger.main
    : theme.palette.secondary.main,
  color: danger ? "#fff" : "#000",
  "&:hover": {
    backgroundColor: danger ? "#fff" : theme.palette.secondary.main,
    color: "#000",
    border: "none",
  },
}));

export {
  Clear,
  FilterButton,
  SearchFilterWrapper,
  ActionButton,
  Cell,
  Row,
  DeleteButton,
};
