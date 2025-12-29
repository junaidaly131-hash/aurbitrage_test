import { alpha, styled } from "@mui/system";
import { TableCell, Button, Box, Typography } from "@mui/material";
import { WarningCircle } from "phosphor-react";

export const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "98%",
  color: theme.typography.color.primary,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4),
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

const Tab = styled(Button)(({ theme, isSelected, danger }) => ({
  background: isSelected
    ? danger
      ? "#fff"
      : theme.palette.secondary.main
    : danger
      ? theme.palette.danger.dark
      : "#212223",
  borderRadius: "10px",
  padding: "6px 18px !important",
  fontSize: "18px",
  fontFamily: "Outfit",
  height: "44px",
  textTransform: "capitalize",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
  border: "none !important",
  color: isSelected ? "black" : "#fff",
  minWidth: "fit-content",
  gap: "10px",
  "&:hover": {
    backgroundColor: danger ? "#fff" : theme.palette.secondary.main,
    color: "#000",
    border: "none",
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "10px 32px",
  position: "sticky",
  top: 0,
  backgroundColor: theme.palette.background.overlay,
  zIndex: 10,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
}));

const Left = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "24px",
  minWidth: "50%",
}));

const Right = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "24px",
}));
const TitleTypography = styled(Typography)(({ theme }) => ({
  lineBreak: "strict",
  minWidth: "fit-content",
}));
const Filter = styled(Button)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  height: "40px",
  alignItems: "center",
  textTransform: "capitalize",
  padding: "0px 12px",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "16px",
  fontFamily: "Outfit !important",
  color: "#fff",
  background: "#696969",
  minWidth: "fit-content",
}));
const Warning = styled(WarningCircle)(({ theme }) => ({
  color: theme.palette.danger.main,
}));

export { Tab, Left, Right, Header, TitleTypography, Filter, Warning };
