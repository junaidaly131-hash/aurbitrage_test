import { Grid, Button, styled, Box, Typography } from "@mui/material";
const Wrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.dark,
  borderRadius: "20px",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  height: "auto",
  minHeight: "100%",
  padding: "0px",
  gap: theme.spacing(1.5),
}));
const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(1.5, 3),
  gap: theme.spacing(1.5),
  background: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2.5, 3, 1, 3),
  },
}));
const SearchboxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: theme.spacing(1.5),
}));
const Search = styled(Box)(({ theme: { palette } }) => ({
  padding: "0px",
  paddingBottom: 1,
  width: "100%",
  flexShrink: 1,
  minWidth: "250px",
  color: "#fff",
  fontWeight: "500",
  ".MuiAutocomplete-root": {
    background: `${palette.background.paper} !important`,
    padding: "0 !important",
    borderRadius: "6px !important",
    border: `0 !important`,
  },
  "& .MuiInputBase-root": {
    padding: "0 12px !important",
    borderRadius: "6px !important",
    background: `${palette.background.paper} !important`,
    border: `1px solid ${palette.background.dark3} !important`,
    "&:hover": {
      borderColor: `${palette.background.dark3} !important`,
    },
    "&.Mui-focused": {
      borderColor: `${palette.background.dark3} !important`,
    },
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px !important",
    background: `${palette.background.paper} !important`,
    height: "32px !important",
    padding: "0 16px",
    color: "white",
    zIndex: "1000",
    fontSize: "14px",
    border: "none",
    outline: "none",
    display: "block",
    "&::placeholder": {
      color: palette.background.card,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0 !important",
  },
}));
const CenterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  "&:nth-of-type(2)": {
    flex: "1 1 auto",
    justifyContent: "center",
  },
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
  overflow: "hidden",
  justifyContent: "center",
  height: "calc(100vh - 76px)",
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 110px)",
  },
}));
const PostCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.background.grey,
  margin: 0,
  whiteSpace: "nowrap",
  textAlign: "left",
}));

const PostingBoardWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "calc(100vh - 168px)",
  // overflow: "hidden",
  padding: 0,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  // maxHeight: "75vh"
}));

const StyledButton = styled(Button)(({ postTypeFilter, type }) => ({
  background: postTypeFilter.includes(type) ? "#DBA42D" : "grey",
  padding: "11px 10px",
  borderRadius: "6px",
  margin: "0 6px",
  color: "#fff",
  "&:hover": { backgroundColor: "#DBA42D" },
}));

const Centered = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  color: "#fff",
  marginTop: theme.spacing(1.5),
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  width: "100%",
  // background: theme.palette.background.paper,
}));

const FiltersWrapper = styled(Box)(({ theme }) => ({
  display: "unset",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const Filters = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    zIndex: "99999",
    borderRadius: theme.spacing(0.75),
    overflow: "hidden",
    marginTop: theme.spacing(6),
    boxShadow: "0 0 8px 1px rgba(255,255,255, 0.1)",
  },
}));

const AddPostBtn = styled(Box)(({ theme }) => ({
  display: "unset",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeaderButtons = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    width: "100%",
    gap: theme.spacing(1.5),
  },
  button: {
    width: "100%",
  },
}));
const FiltersMobile = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const Filter = styled(Button)(({ theme }) => ({
  gap: theme.spacing(1.5),
}));

export {
  StyledGrid,
  StyledButton,
  Wrapper,
  Header,
  Search,
  CenterBox,
  PostCount,
  ContentWrapper,
  Centered,
  PostingBoardWrapper,
  SearchboxWrapper,
  FiltersWrapper,
  AddPostBtn,
  Filters,
  HeaderButtons,
  Filter,
  FiltersMobile,
};
