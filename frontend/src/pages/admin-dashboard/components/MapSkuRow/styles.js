import { IconButton, TableCell, Button, Divider, styled } from "@mui/material";

const StyledTableCell = styled(TableCell)(() => ({
  backgroundColor: "#292929",
  color: "#fff",
  border: "none",
  padding: "6px",
  "&.left": {
    textAlign: "left",
  },
  "&.center": {
    textAlign: "center",
  },
  "&.right": {
    textAlign: "right",
  },
  "&.end": {
    textAlign: "end",
  },
  "& .edit-icon": {
    cursor: "pointer",
    color: "white",
    width: "50px",
  },
  "& .data-source-icon": {
    color: "white",
    padding: "2px",
    position: "relative",
    top: "6px",
    left: "6px",
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  padding: 0,
  color: "white",
  marginLeft: 8,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: "4px 8px",
  fontSize: "0.75rem",
  borderColor: theme.palette.secondary.main,
  color: theme.palette.secondary.main,
  "&:hover": {
    borderColor: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.dark,
  },
  "& .MuiButton-startIcon": {
    marginRight: "4px",
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginY: "4px",
  backgroundColor: theme.palette.secondary.main,
  marginX: "-1px",
  width: "calc(100% + 25px)",
}));

export { StyledIconButton, StyledTableCell, StyledButton, StyledDivider };
