import { Box, Button, styled, Typography } from "@mui/material";

export const NetworkWrapper = styled(Box)(({ theme: { palette } }) => ({
  background: "#101010",
}));
export const StyledButton = styled(Button)(
  ({ theme: { palette, breakpoints } }) => ({
    height: "46px",
    borderRadius: "46px",
    padding: "8px 36px",
    background: palette.secondary.main,
    textTransform: "unset",
    fontSize: "10px",
    fontWeight: "600",
    width: "max-content",
    fontFamily: "Manrope",
    color: "#fff",
    margin: "0 auto",
    "&:hover": {
      background: palette.secondary.main,
    },
    [breakpoints.up("md")]: {
      margin: "0",
    },
  }),
);
export const Title = styled(Typography)(({ theme: { breakpoints } }) => ({
  margin: "0",
  fontSize: "32px",
  lineHeight: "40px",
  color: "#000",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "Manrope",
  [breakpoints.up("md")]: {
    lineHeight: "56px",
    fontSize: "48px",
    textAlign: "left",
  },
}));

export const Header = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  [breakpoints.up("md")]: {},
}));

export const Description = styled(Typography)(({ theme: { breakpoints } }) => ({
  margin: "0px",
  fontSize: "22px",
  fontWeight: "400",
  color: "#000",
  textAlign: "center",
  fontFamily: "Manrope",
  [breakpoints.up("md")]: {
    fontSize: "30px",
    textAlign: "left",
  },
  "& .custom-description": {
    fontSize: "18px",
    margin: 0,
  },
}));

export const ContactForm = styled("form")(({ theme: { breakpoints } }) => ({
  background: "#18181A",
  borderRadius: "16px",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  margin: "40px 0 0",
  [breakpoints.up("md")]: {
    marginTop: "12px 0",
  },
  ".hs-input": {
    fontSize: "10px",
    color: "#fff",
    background: "red !important",
    marginBottom: "2px",
    "&.error, & span": {
      color: "#FF0C0C",
    },
  },
}));

export const FormGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
export const Label = styled("label")({
  fontSize: "10px",
  color: "#fff",
  marginBottom: "2px",
  "&.error, & span": {
    color: "#FF0C0C",
  },
});
export const Input = styled("input")({
  fontSize: "10px",
  color: "#fff",
  height: "32px",
  background: "rgba(255,255,255, 0.3)",
  width: "100%",
  outline: "none",
});
export const Textarea = styled("textarea")({
  fontSize: "10px",
  color: "#fff",
  height: "60px",
  background: "rgba(255,255,255, 0.3)",
});
