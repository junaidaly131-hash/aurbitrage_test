import { Box, styled, Avatar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
const Stylediv = styled("form")(() => ({
  position: "absolute",
  top: "50%",
  left: "57%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "#1D1D1D",
  borderRadius: "12px",
  boxShadow: "24px",
  padding: "20px",
  color: "white",
  "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
    paddingBottom: "0px",
    paddingTop: "0px",
  },
  "& .css-wb57ya-MuiFormControl-root-MuiTextField-root": {
    backgroundColor: "#292929",
    borderRadius: "9px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "12px",
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
    width: "100%",
    fontSize: "15px",
    opacity: 1,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#ffffff",
    width: "100%",
    fontSize: "15px",
    opacity: 1,
  },
  "& .css-v51kjr-MuiButtonBase-root-MuiButton-root:hover": {
    background: "dba42d",
  },
  "& .css-fmkye0-MuiButtonBase-root-MuiButton-root": {
    backgroundColor: "red",
  },
}));
const InputLabel = styled("p")(() => ({
  color: "#ffffff",
  marginTop: "0px",
  marginBottom: "6px",
  fontSize: "9px",
  fontFamily: "Outfit",
  marginTop: "10px",
  marginBottom: "10px",
  marginLeft: "5px",
}));
const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "15px",
}));
const SelectLogo = styled("button")(() => ({
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
const ProfileIcon = styled(PhotoCamera)({
  position: "absolute",
  transform: "scale(1) translate(-50%, -50%)",
  top: "50%",
  left: "50%",
});
export {
  InputLabel,
  Stylediv,
  SelectLogo,
  SubmitBtn,
  Wrapper,
  Profile,
  Picture,
  ProfileIcon,
};
