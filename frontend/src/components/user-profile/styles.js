import {
  Box,
  styled,
  Avatar,
  TextField,
  InputBase,
  IconButton,
  Button,
  Typography,
  alpha,
} from "@mui/material";
const Stylediv = styled("form")(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "24px",
  padding: "0",
  color: "white",
  overflow: "auto",
  paddingBottom: "6px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(2.5),
  },
}));
const InputLabel = styled("label")(() => ({
  color: "#ffffff",
  marginTop: "0px",
  marginBottom: "6px",
  fontSize: "14px",
  fontFamily: "Outfit",
  marginLeft: "5px",
}));
const SectionWrapper = styled(Box)(({ theme, align }) => ({
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.paper,
  borderRadius: "12px",
  padding: theme.spacing(3),
  alignItems: align || "unset",
  gap: theme.spacing(3),
  ".MuiAutocomplete-root": {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 1.5),
    gap: theme.spacing(1.5),
  },
}));
const Wrapper = styled(Box)(({ theme, direction, width }) => ({
  display: "flex",
  flexDirection: direction === "column" ? "column" : "row",
  gap: direction === "column" ? theme.spacing(3) : theme.spacing(5),
  width: width || "100%",
  alignItems: direction === "column" ? "flex-start" : "flex-end",
  margin: "0",
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1.5),
    flexDirection: "column",
    width: "100%",
  },
}));

const SubmitBtn = styled("button")(() => ({
  background: "#dba42d",
  height: "35px",
  border: "none",
  borderRadius: "12px",
  width: "192px",
  cursor: "pointer",
  color: "black",
  fontSize: "12px",
  fontWeight: "900",
  fontFamily: "Outfit !important",
}));
const Profile = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  height: "80px",
  width: "80px",
  position: "relative",
  display: "flex",
  gap: theme.spacing(2),
}));
const Picture = styled(Avatar)({
  height: "80px",
  width: "80px",
  borderRadius: "8px",
  border: "1px solid #fff",
});
const ProfilePicWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "end",
  justifyContent: "flex-start",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    marginBottom: theme.spacing(1.5),
  },
}));
const SelectLogo = styled(Button)(() => ({
  height: "30px",
  padding: "6px",
  border: "none",
  borderRadius: "6px",
  width: "fit-content",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "400",
  minWidth: "fit-content",
}));
const StyledHeading = styled("h5")(({ theme, align }) => ({
  color: "#ffffff",
  width: "100%",
  textAlign: align || "left",
  fontSize: "24px",
  fontWeight: "400",
  margin: "0",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
}));
const Seprator = styled("div")({
  background: "#C0C0C0",
  height: "1px",
  opacity: "25%",
  width: "80%",
  margin: "40px auto",
});
const InputWrapper = styled("div")({
  width: "100%",
});
const SaveBtn = styled(Button)(({ theme, password }) => ({
  height: "44px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white",
  display: "flex",
  minWidth: "max-content",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 4),
  border: `1px solid ${theme.palette.background.dark3}`,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 1),
    width: "100%",
    shrink: 1,
  },
}));
const SKUFormField = styled(InputBase)(({ theme, width }) => ({
  width: "100%",
  color: "white",
  backgroundColor: theme.palette.background.overlay,
  height: "44px",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "14px",
  fontWeight: "400",
}));
const FormWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));
const ActionButtons = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
}));
const InvitedUsersWrapper = styled("div")(({ theme, hidden }) => ({
  display: hidden === "md" ? "flex" : "none",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  background: theme.palette.background.dark,
  [theme.breakpoints.down("md")]: {
    display: hidden === "md" ? "none" : "flex",
  },
}));
const User = styled("div")(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  background: theme.palette.background.dark2,
  padding: theme.spacing(1.25, 1.5),
  " > div:last-of-type !first-of-type": {
    maxWidth: "40px",
  },
  "&:nth-child(2n-1)": {
    background: theme.palette.background.dark,
  },
}));
const UserProfile = styled("div")(({ theme }) => ({
  textAlign: "left",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
  "& span:nth-child(1)": {
    textTransform: "capitalize",
  },
}));
const InvitedUsersTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: "0",
  borderRadius: 0,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  "& th,& td": {
    textAlign: "left !important",
    borderRadius: 0,
    padding: "10px 24px !important",
  },
  "& tr td:last-of-type": {
    width: "100px",
  },
  "& tr td:nth-child(1)": {
    textTransform: "capitalize",
  },
  "& th": {
    background: theme.palette.background.paper,
    fontWeight: "600",
  },
  "& tbody tr td": {
    background: theme.palette.background.dark2,
  },
  "& tbody tr:nth-of-type(odd) td": {
    background: theme.palette.background.dark,
  },
}));
const UserName = styled("p")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
}));
const DealerName = styled("p")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
  margin: "0",
}));
const Status = styled(Typography)(({ theme, color }) => ({
  color:
    color === "joined"
      ? alpha(theme.palette.success.dark, 0.81)
      : color === "pending"
        ? alpha(theme.palette.warning.dark, 0.81)
        : alpha(theme.palette.danger.dark, 0.81),
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));
export {
  InputLabel,
  Stylediv,
  SelectLogo,
  SubmitBtn,
  Wrapper,
  Profile,
  Picture,
  ProfilePicWrapper,
  StyledHeading,
  Seprator,
  InputWrapper,
  SaveBtn,
  SKUFormField,
  SectionWrapper,
  FormWrapper,
  ActionButtons,
  InvitedUsersWrapper,
  User,
  UserProfile,
  UserName,
  DealerName,
  Status,
  InvitedUsersTable,
};
