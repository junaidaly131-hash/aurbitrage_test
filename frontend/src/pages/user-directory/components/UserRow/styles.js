import { Box, styled, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({ theme, index }) => ({
  backgroundColor: index % 2 === 0 ? "#292929" : "#1f1f1f",
  color: "#fff",
  border: "none",
  padding: "10px",
  textAlign: "left !important",
}));

const StyledIconButton = styled(IconButton)({
  marginLeft: "5px",
  color: "#fff",
});
const Profile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "& .MuiBadge-dot": {
    width: 10,
    height: 10,
    border: `1px solid ${theme.palette.background.card}`,
  },
  "& .MuiBadge-root": {
    border: `2px solid ${theme.palette.background.card}`,
    borderRadius: "50%",
  },
}));
const User = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0",
});
const UserName = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 !important",
});
const DealerName = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  margin: "0 !important",
});

export {
  Profile,
  StyledIconButton,
  StyledTableCell,
  UserName,
  User,
  DealerName,
};
