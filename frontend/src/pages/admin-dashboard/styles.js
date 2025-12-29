import { styled } from "@mui/system";
import { TableCell, Button, Box } from "@mui/material";

export const StyledDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100vh - 110px)",
  color: theme.typography.color.primary,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4),
  gap: 24,
  flexDirection: "column",
  display: "flex",
  textAlign: "center",
  overflowY: "scroll",
  "& .dashboardHeader": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.gray,
    zIndex: 10,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
  },

  "& .label": {
    height: "32px",
    display: "flex",
    padding: "0 12px",
    backgroundColor: "#C0C0C0",
    borderRadius: "5px",
    fontWeight: 600,
    alignItems: "center",
  },
}));

export const StyledHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
}));

export const StyledHeading = styled("h2")(({ theme }) => ({
  fontSize: "2em",
  margin: "5px",
}));

export const StyledFetchinData = styled("h2")(({ theme }) => ({
  width: "70vw",
  margin: "30vh auto",
}));
export const StyledFailed = styled("h2")(({ theme }) => ({
  width: "100%",
  margin: "30vh auto",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  background: "#fff",
  textTransform: "capitalize",
  padding: "9px 20px",
  borderRadius: "10px",
  color: "#000",
  fontWeight: "700",
  "&:hover": { background: "#DBA42D" },
  cursor: "pointer",
  marginTop: "-5px",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.overlay,
  padding: "11px 10px",
  borderRadius: "15px",
  margin: "0 12px",
  color: "#fff",
}));

export const OptionButton = styled(Button)(({ theme, isSelected }) => ({
  background: isSelected ? "#dba42d" : theme.palette.background.overlay,
  padding: "11px 10px",
  borderRadius: "15px",
  width: "150px",
  margin: "0 12px",
  fontSize: "13px",
  textTransform: "capitalize",

  color: isSelected ? "black" : "#fff",
  "&:hover": { backgroundColor: "#DBA42D" },
}));

export const StyledTableCellTime = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",
  display: "grid",
  paddingBottom: "0px",

  justifyContent: "flex-end",
}));

export const StyledSortableTableCell = styled(TableCell)(
  ({ theme, label }) => ({
    "&.MuiTableCell-head": { color: "#fff" },
    border: "none",
    width: label == "SKU" ? "auto" : "200px",
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
    borderRadius: "0px !important",
    height: "50px !important",
    cursor: "pointer",
    lineHeight: "50px",
    "& span": {
      display: "inline-block",
    },
    "& .sort": {
      paddingRight: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
    },
  }),
);
