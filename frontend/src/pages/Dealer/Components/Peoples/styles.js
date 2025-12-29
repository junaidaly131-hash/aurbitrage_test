import { styled, Box, Avatar, Button, Typography } from "@mui/material";

const Table = styled("table")(({ theme: { palette } }) => ({
  borderCollapse: "separate",
  borderSpacing: "0 12px",

  tr: {
    padding: "0 12px",
  },
  th: {
    padding: "10px",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Outfit",
    fontSize: "16px",
    fontWeight: 400,
  },
  td: {
    borderRadius: "0",
    fontFamily: "Outfit",
    color: "#fff",
    fontWeight: 500,
    fontSize: "14px",
    padding: "12px",
    position: "relative",

    background: palette.background.overlay,
    "&:first-child": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      paddingLeft: "24px",
    },
    "&:last-child": {
      paddingRight: "24px",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      textAlign: "right",
    },
  },
}));

const User = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "start",
});
const Profile = styled(Avatar)({
  height: "36px",
  width: "36px",
  border: "1px solid #fff",
});
const SendBtn = styled(Button)(({ theme: { palette } }) => ({
  height: "36px",
  width: "120px",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  fontSize: "12px",
  fontWeight: "600",
  fontFamily: "Outfit",
  display: "inline-flex",
  gap: "6px",
  textTransform: "unset",
  borderRadius: "12px",
  "&:hover": {
    background: palette.secondary.main,
  },
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.4)",
  },
}));
const ContactCard = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0px",
  zIndex: "999",
  paddingTop: "65px",
}));
const ContactWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: "rgba(266, 303, 266, 0.1)",
  backdropFilter: "blur(18px)",
  borderRadius: "12px",
  padding: "12px 24px",
  gap: "12px",
}));
const ContactCardContainer = styled(Box)(({ theme }) => ({}));
const ContactHeading = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "500",
  fontFamily: "Outfit",
  textAlign: "center",
}));
const Contact = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  fontFamily: "Outfit",
  fontSize: "16px",
  fontWeight: "400",
  ".icon": {
    height: "24px",
  },
}));
const Go = styled(Box)(() => ({
  display: "flex",
  gap: "16px",
  alignItems: "center",
}));
const Designation = styled(Typography)(() => ({
  margin: "0px",
  fontStyle: "italic",
  fontSize: "12px",
  fontFamily: "Poppins",
  color: "#fff",
  letterSpacing: "1px",
  textAlign: "left",
}));
const Name = styled(Typography)(() => ({
  fontSize: "14px",
  fontFamily: "Outfit",
  color: "#fff",
  textAlign: "left",
}));
const Error = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  fontSize: "18px",
}));
const RefreshBtn = styled(Button)({
  padding: "6px 30px",
  // width:"20%",
  background: "rgba(219, 164, 45, 0.5)",
  color: "white",
  "&:hover": {
    background: "rgba(219, 164, 45, 0.5)",
  },
});
const ErrorWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "center",
});
export {
  Table,
  User,
  Profile,
  SendBtn,
  ContactCard,
  ContactWrapper,
  ContactCardContainer,
  ContactHeading,
  Contact,
  Go,
  Designation,
  Error,
  Name,
  RefreshBtn,
  ErrorWrapper,
};
