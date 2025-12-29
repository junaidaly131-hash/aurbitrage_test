import { padding, styled } from "@mui/system";
import { TableCell, Box } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  maxWidth: "90%",
  minWidth: "500px",
  maxHeight: "80vh",
  overflowY: "auto",

  "& .CloseButtonStyle": {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#999999",
  },
  "& .SaveButtonStyle": {
    position: "absolute",
    top: "10px",
    right: "50px",
    color: "#1E90FF",
  },
  "& .TitleStyle": {
    textAlign: "center",
    marginBottom: "20px",
    color: "white",
    fontSize: "24px",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  background: "#292929",
  border: "none",
  "&.ButtonsCell": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    background: "#292929",
    border: "none",
  },
  "& .SaveIcon": {
    paddingTop: "25px",
    marginBottom: "20px",
    cursor: "pointer",
    color: "#1ad598",
  },
  "& .CircularBar": {
    height: "1.5em",
    width: "1.5em",
    marginBottom: "10px",
    marginInline: "auto",
  },
  "& .CancelIcon": {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#cf142b",
    cursor: "pointer",
  },
}));
