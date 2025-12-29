import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, InputLabel, styled } from "@mui/material";
import { transform } from "lodash";
import PhoneInputWithCountrySelect from "react-phone-number-input";
const Stylediv = styled("form")(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  background: "#1D1D1D",
  borderRadius: "12px",
  boxShadow: "24px",
  padding: "20px",
  color: "white",
  paddingTop: "0px",
}));

const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginTop: "12px",
}));
const PersonHeading = styled("h5")(() => ({
  color: "#ffffff",
  width: "100%",
  marginTop: "24px",
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "400",
  fontFamily: "Outfit",
}));
const AddPerson = styled(Button)(() => ({
  marginTop: "10px",
  height: "36px",
  border: "none",
  borderRadius: "12px",
  width: "192px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "900",
  fontFamily: "Outfit !important",
}));
const ProfileIcon = styled(PhotoCamera)({
  position: "absolute",
  transform: "scale(1) translate(-50%, -50%)",
  top: "50%",
  left: "50%",
});
const Profile = styled(Box)({
  borderRadius: "50%",
  height: "64px",
  width: "64px",
  position: "relative",
  margin: "24px auto",
});
const Picture = styled(Avatar)({
  height: "64px",
  width: "64px",
});
const PhoneInputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "356px",
});
const Label = styled(InputLabel)({
  color: "white",
  fontSize: "9px",
  fontWeight: "400",
  fontFamily: "Outfit",
  marginBottom: "6px",
});
const PhoneNumberInput = styled(PhoneInputWithCountrySelect)(
  ({ theme: { palette } }) => ({
    backgroundColor: palette.background.overlay,
    height: "42px",
    borderRadius: "9px",
    padding: "0 12px",
    "& .PhoneInputCountryIcon": {
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      fontSize: "20px",
    },
    "& .PhoneInputInput": {
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      fontSize: "16px",
    },
  }),
);
export {
  Stylediv,
  Wrapper,
  PersonHeading,
  AddPerson,
  Profile,
  Picture,
  ProfileIcon,
  PhoneInputWrapper,
  Label,
  PhoneNumberInput,
};
