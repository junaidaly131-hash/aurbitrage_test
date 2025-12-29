import { Box, Button, Grid, Typography, styled } from "@mui/material";

export const FeatureWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  position: "relative",
  flexDirection: "column",
  gap: "24px",
  padding: "40px 24px",
  [breakpoints.up("md")]: {
    alignItems: "start",
    justifyContent: "start",
    padding: "40px",
  },
  [breakpoints.up("lg")]: {
    padding: "80px",
  },
  background: "#101010",
}));

export const Header = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
}));

export const Title = styled(Typography)(
  ({ theme: { breakpoints, palette } }) => ({
    margin: "0",
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: "700",
    fontFamily: "Manrope",
    color: palette.secondary.main,
    textAlign: "center",
    [breakpoints.up("md")]: {
      lineHeight: "56px",
      fontSize: "48px",
      textAlign: "left",
    },
  }),
);

export const Description = styled(Typography)(({ theme: { breakpoints } }) => ({
  margin: "0px",
  fontSize: "22px",
  fontWeight: "400",
  color: "#fff",
  textAlign: "center",
  fontFamily: "Manrope",
  [breakpoints.up("md")]: {
    fontSize: "30px",
    textAlign: "left",
  },
}));

export const ContentWrapper = styled(Grid)(({ theme: { breakpoints } }) => ({
  padding: "40px 0",
  display: "flex",
  alignItems: "center",
  [breakpoints.up("md")]: {
    padding: "64px 0",
  },
}));

export const Media = styled("img")(({ theme: { breakpoints } }) => ({
  width: "95%",
  maxWidth: "550px",
  margin: "0 auto 40px",
  display: "block",
  [breakpoints.up("md")]: {
    margin: "unset",
  },
}));

export const StyledButton = styled(Button)(
  ({ theme: { palette, breakpoints } }) => ({
    height: "64px",
    borderRadius: "140px",
    padding: "12px 24px",
    background: palette.secondary.main,
    textTransform: "unset",
    fontSize: "16px",
    fontWeight: "700",
    width: "max-content",
    fontFamily: "Manrope",
    color: "#000",
    margin: "0 auto",
    "&:hover": {
      background: palette.secondary.main,
    },
    [breakpoints.up("md")]: {
      margin: "0",
      fontSize: "22px",
      padding: "16px 44px",
    },
  }),
);
