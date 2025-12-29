import {
  Stack,
  TableCell,
  Button,
  Box,
  Typography,
  TableRow,
  styled,
} from "@mui/material";
import { Paper, Card } from "@mui/material";

const StyledStack = styled(Stack)(({ theme }) => ({
  height: "100%",
  alignItems: "center",
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  "&:first-of-type": {
    textAlign: "left !important",
  },
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",

  "&.Dealer": {
    width: "25%",
  },
  "&.User": {
    width: "12.5%",
  },
}));

const MapTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#292929",
  padding: "auto 12px",
  color: "#fff",
  border: "none",
  width: "12.5%",
  textAlign: "center",
  "&:first-of-type": {
    textAlign: "left",
  },

  "& .ModalIcon": {
    cursor: "pointer",
    marginLeft: "1em",
  },
}));

const ActionButton = styled(Button)(({ theme, userType }) => ({
  width: 120,
  height: 34,
  padding: "0 16px",
  borderRadius: "6px",
  textTransform: "unset",
  "&.disable": {
    background: "#4b1818",
    "&:hover": { background: "#4b1818" },
  },

  "&.active": {
    background: "#328d62",
    "&:hover": { background: theme.palette.success.main },
  },

  "&.pending-active": {
    background: "#328d62",
    marginBottom: userType == "dealer" ? "0em" : "1em",
    marginRight: userType == "dealer" ? "1em" : "0em",
  },
  "&.pending-reject": {
    background: "#4b1818",
  },

  "& .icon-red-color": {
    color: theme.palette.danger.light,
  },
  "& .icon-green-color": {
    color: theme.palette.success.light,
  },
}));

const ContributorButton = styled(Button)(({ theme }) => ({
  width: 70,
  height: 30,

  "&.contributor-yes": {
    background: "#d09e2f",
    "&:hover": { background: "#d09e2f" },
  },

  "&.contributor-no": {
    background: "#d09e2f",
    opacity: 0.6,
    "&:hover": { opacity: 0.8 },
  },
}));

const Tab = styled(Button)(({ theme, isSelected }) => ({
  background: isSelected ? theme.palette.secondary.main : "#212223",
  borderRadius: "6px",
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
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: "#000",
    border: "none",
  },
}));

const ModalContainer = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
});

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  margin: "auto",
  padding: "20px",
  borderRadius: "6px",
  boxShadow: 24,
  maxHeight: "80vh",
  overflowY: "auto",
}));

const CustomCard = styled(Card)(({ theme }) => ({
  marginBottom: "10px",
  backgroundColor: "#f5f5f5",
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  lineBreak: "strict",
  minWidth: "fit-content",
}));

const Row = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#696969",
  width: "100%",
  color: "#fff",
  "& th:nth-of-type(1)": {
    borderRadius: "0px",
  },
  "& th:last-of-type": {
    borderRadius: "0px",
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
  borderRadius: "6px",
}));

const Left = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "24px",
  width: "calc(100% - 130px)",
}));

const Right = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "130px",
}));

const P = styled("p")(({ theme }) => ({
  color: "#fff",
}));

export {
  Header,
  StyledStack,
  HeaderTableCell,
  MapTableCell,
  ActionButton,
  ContributorButton,
  Tab,
  ModalContainer,
  CustomPaper,
  CustomCard,
  TitleTypography,
  Left,
  Right,
  Row,
  P,
};
