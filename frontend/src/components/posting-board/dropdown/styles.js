import { styled, Box } from "@mui/material";

const DropdownWrapper = styled(Box)(({ theme }) => ({
  color: "#fff",
  position: "relative",
}));

const DropdownTrigger = styled(Box)(({ theme, newpost }) => ({
  cursor: "pointer",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  width: "100%",
  background: newpost ? "#4E4E4E" : "",
  padding: newpost ? "10px 10px" : "",
  borderRadius: newpost ? "10px" : "",
  margin: "0px",
}));

const CaretIconWrapper = styled("span")(({ theme }) => ({
  marginLeft: "5px",
  background: "#696969",
  borderRadius: "6px",
  padding: "5px 7px",
}));

const DropdownContainer = styled(Box)(({ theme }) => ({
  background: "#4E4E4E",
  marginTop: theme.spacing(1),
  borderRadius: "12px",
  position: "absolute",
  zIndex: "99",
  color: "#fff",
  width: "90%",
  minWidth: "160px",
}));

const OptionItem = styled(Box)(({ theme, isSelected }) => ({
  cursor: "pointer",
  margin: "10px 0",
  fontSize: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: isSelected ? "#191919" : "",
  padding: "10px 15px",
  "&:hover": {
    backgroundColor: "#191919",
  },
}));

const TickImage = styled("img")(({ theme }) => ({
  width: "20px",
}));

export {
  DropdownWrapper,
  DropdownTrigger,
  CaretIconWrapper,
  DropdownContainer,
  OptionItem,
  TickImage,
};
