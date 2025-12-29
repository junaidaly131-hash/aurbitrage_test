import { Button, InputLabel, styled, Typography } from "@mui/material";
import { Avatar, Box } from "@mui/material";
import ReactQuill from "react-quill";
import PhoneInput from "react-phone-number-input";

const Stylediv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "40px",
  justifyContent: "space-between",
  [theme.breakpoints.down(810)]: {
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "10px",
  },
}));

const AboutWrapper = styled("div")(({ theme }) => ({
  width: "774px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const CompanyHeading = styled("h5")(() => ({
  color: "#ffffff",
  width: "100%",
  marginTop: "24px",
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "400",
  fontFamily: "Outfit",
}));

const CompanyPara = styled(ReactQuill)(({ theme }) => {
  return {
    color: "#ffffff",
    width: "100%",
    marginTop: "24px",
    marginBottom: "24px",
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "300",
    fontFamily: "Outfit",
  };
});
const ProfilePicWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  marginBottom: "30px",
}));
const SelectLogo = styled("button")(() => ({
  background: "#C2C2C2",
  height: "30px",
  border: "none",
  borderRadius: "6px",
  width: "162px",
  cursor: "pointer",
  color: "black",
  fontSize: "12px",
  fontWeight: "400",
  fontFamily: "Outfit !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
}));
const Profile = styled(Box)({
  borderRadius: "50%",
  height: "126px",
  width: "125px",
  position: "relative",
  margin: "24px auto",
});
const Picture = styled(Avatar)({
  height: "126px",
  width: "126px",
  border: "2px solid white",
});
const Error = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  textAlign: "center",
  marginTop: "20px",
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
const PhoneNumberInput = styled(PhoneInput)(({ theme: { palette } }) => ({
  backgroundColor: palette.background.overlay,
  height: "42px",
  borderRadius: "9px",
  padding: "0 12px",
  "& input": {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
  },
  "& .phone-input, & .PhoneInputCountryIcon": {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "20px",
  },
}));
const Label = styled(InputLabel)({
  color: "white",
  fontSize: "9px",
  fontWeight: "400",
  fontFamily: "Outfit",
  marginBottom: "6px",
});
const PhoneInputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "356px",
});

export {
  Stylediv,
  AboutWrapper,
  CompanyHeading,
  CompanyPara,
  Profile,
  Picture,
  SelectLogo,
  ProfilePicWrapper,
  Error,
  RefreshBtn,
  ErrorWrapper,
  PhoneNumberInput,
  Label,
  PhoneInputWrapper,
};
