import {
  Button,
  Box,
  styled,
  Typography,
  TextField,
  alpha,
  MenuItem,
  InputLabel,
  Divider,
  IconButton,
  InputBase,
} from "@mui/material";

const IntegrationContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Connect = styled(Button)(({ theme, danger }) => ({
  height: "44px",
  padding: theme.spacing(0, 4),
  width: "auto",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 2),
    width: "100%",
  },
}));

const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(3),
  alignItems: "flex-end",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  ".MuiAutocomplete-root": {
    width: "100% !important",
    maxWidth: "100% !important",
  },
  ".MuiInputBase-root": {
    backgroundColor: `${theme.palette.background.overlay} !important`,
    height: "44px",
    width: "100% !important",
    maxWidth: "100% !important",
  },
  "> div": {
    width: "100%",
    shrink: 1,
  },
  "> div:last-of-type !first-of-type": {
    width: "150px",
  },
}));

const Title = styled(Typography)({
  color: "#fff",
  fontSize: "36px",
  fontWeight: "600",
  fontFamily: "Outfit",
  marginBottom: "12px",
});

const Description = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "regular",
  color: theme.palette.background.grey,
}));
const List = styled("ul")({});
const ListItem = styled("li")({
  listStyleType: "disc",
  fontSize: "16px",
  fontWeight: "400",
});

const Connection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const ConnectionContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "40px 0px",
});

const Heading = styled(Typography)({
  color: "#fff",
  fontSize: "18px",
  fontWeight: "600",
  fontFamily: "Outfit",
});
const Paragraph = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "Outfit",
  marginTop: "8px",
});

const Input = styled(InputBase)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.background.overlay,
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "14px",
  fontWeight: "400",
  height: "44px",
}));

const Label = styled(InputLabel)({
  color: "#fff",
  marginBottom: "8px",
  fontSize: "14px",
});

const Item = styled(MenuItem)({
  color: "#fff",
  "&:hover": {
    backgroundColor: "#333333",
  },
});
const Break = styled(Divider)({
  color: "#fff",
  borderColor: "#fff",
});

const Icon = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "8px",
  gap: "4px",
});

const ToggleIcon = styled(IconButton)({
  color: "#fff",
});
const SearchWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  ".MuiInputBase-root": {
    backgroundColor: theme.palette.background.overlay,
    height: "44px",
    width: "100%",
  },
  ".MuiAutocomplete-root": {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const EmailContainer = styled(Box)(({ theme }) => ({
  maxWidth: "100%",
  width: "500px",
  display: "flex",
  margin: "0 auto",
  flexDirection: "column",
  gap: theme.spacing(2),
  img: {
    width: "458px",
    maxWidth: "100%",
    margin: "0 auto",
  },
}));
export {
  Title,
  IntegrationContainer,
  Connect,
  Description,
  ListItem,
  List,
  Connection,
  Heading,
  Paragraph,
  Input,
  Row,
  Item,
  Label,
  Break,
  ConnectionContainer,
  Icon,
  ToggleIcon,
  SearchWrapper,
  EmailContainer,
};
