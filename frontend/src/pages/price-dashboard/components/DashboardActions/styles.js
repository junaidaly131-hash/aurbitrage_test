import {
  Box,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
  Popper,
  styled,
  TextField,
  Typography,
  Button,
  Chip,
  alpha,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";

export const DashActions = styled(Grid)({
  alignItems: "center",
  background: "#292929",
  borderRadius: "1px",
  padding: "8px 24px",
  gap: "24px",
  width: "100%",
  display: "flex",
  height: "fit-content",
  "& .gap": {
    gap: "24px",
  },
});
export const GridSpace = styled(Grid)({
  padding: "10px 26px",
});

export const FlexXCenter = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const FilterLabel = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: 0,
  color: "white",
  svg: {
    cursor: "pointer",
    height: "40px",
    width: "40px",
  },
});
export const FlexCenter = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const FiltersWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const FlexCenterGap = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "24px",
  overflowX: "auto",
  whiteSpace: "nowrap",
  paddingBottom: "6px",

  "&::-webkit-scrollbar": {
    height: "3px",
  },

  "&::-webkit-scrollbar-track": {
    background: "#212121",
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dba42d",
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#c8a42d",
  },
});

export const FlexBetweenGap = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: "32px",
  maxWidth: "calc(100% - 115px)",
  "&.w-full": {
    maxWidth: "100%",
  },
});
export const StyledClearIcon = styled(ClearIcon)({
  color: "#D80027",
  fontWeight: "bold",
});
export const SearchBox = styled(Box)(({ theme }) => ({
  width: "211px",
}));
export const Count = styled("p")({
  flex: "0 1 auto",
  marginRight: "5px",
  color: "#1AD598",
  fontWeight: "400",
  fontSize: "12px",
  margin: "0",
  fontFamily: "Inter",
  fontStyle: "italic",
});
export const Label = styled("p")(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: "400",
  fontSize: "10px",
  margin: "0",
  marginRight: "6px",
}));
export const StyledPopper = styled(Popper)({
  width: "320px",
  backgroundColor: "red",
});
export const StyledList = styled(List)({
  backgroundColor: "#000",
  color: "#fff",
  "&::-webkit-scrollbar": {
    width: "9px",
  },

  /* Scrollbar Handle (thumb) */
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: " #dba42d" /* color of the scrollbar thumb */,
    borderRadius: " 5px" /* roundness of the scrollbar thumb */,
  },

  /* Optional: Scrollbar Track */
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#292929" /* color of the scrollbar track */,
  },
  "& .MuiListItem-root": {
    color: "#fff",
  },
});
export const StyledTextField = styled(TextField)({
  background: "#212223",
  outline: "none",
  border: "none",
  borderRadius: "15px",
  color: "#fff",
  "& .MuiInputBase-input": {
    color: "#fff",
    "&::placeholder": {
      color: "#fff",
      fontWeight: "600",
      fontSize: "13px",
      opacity: 1,
    },

    "&::-ms-input-placeholder": {
      color: "#fff",
      fontWeight: "600",
      fontSize: "13px",
      opacity: 1,
    },
  },
  "& .MuiOutlinedInput-root": {
    paddingTop: "2px !important",
    paddingBottom: "2px !important",
    paddingRight: "10px !important",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
});
export const IconBarIcon = styled(SearchIcon)({
  color: "white",
  marginRight: "10px",
});
export const ClearButton = styled(IconButton)({ color: "white" });
export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPopover-paper": {
    maxHeight: "70vh",
    backgroundColor: "#353535 !important",
    color: "#fff",
    minWidth: "6em",
    borderRadius: "6px",
    overflow: "hidden",
    "& .MuiList-root": {
      padding: "0 !important",
    },
    "& .MuiMenuItem-root": {
      paddingRight: "1em",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));
export const StyledLi = styled(MenuItem)(({ theme }) => ({
  padding: "6px 16px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "400",
  borderTop: `1px solid ${alpha("#dadada", 0.2)}`,
  "&:first-of-type": {
    borderTop: "none",
  },
  "&:hover": {
    background: `${theme.palette.secondary.main} !important`,
    color: "#000",
  },
}));
export const StyledDiv = styled("div")(({ theme }) => ({
  display: "inline-block",
  position: "relative",
  "& .priceButton": {
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#fff",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    height: "28px",
    padding: "0 18px",
    background: "#212121",
    whiteSpace: "nowrap",
  },
  "& .dropdownIcon": {
    marginLeft: "10px",
    width: "20px",
    height: "20px",
    background: theme.palette.background.overlay,
    borderRadius: "4px",
  },
}));
export const Typo = styled(Typography)({
  fontSize: "inherit",
});
export const StyledButton = styled(Button)({
  flex: "1 0 auto",
  minWidth: "0",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "6px 18px",
  gap: "6px",
  background: "#212121",
  borderRadius: "12px",
  fontSize: "12px",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    background: "#292929",
  },
});
export const StyledClose = styled(Close)({
  color: "white",
  cursor: "pointer",
});

export const Container = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  height: "fit-content",
});

export const ChipParentBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
export const StyledChip = styled(Chip)({
  padding: 2,
  background: "#292929",
  borderRadius: "50px",
  width: "64%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .chip-text": {
    color: "white",
    textAlign: "center",
  },
});

export const OptionBox = styled(Box)(({ color = "#DBA42D" }) => ({
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "underline",
  color: color,
}));
