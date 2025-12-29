import { Box, Button, Grid, styled, Typography } from "@mui/material";

export const ContentWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  padding: "40px 20",
  [breakpoints.up("md")]: {
    justifyContent: "start",
    padding: "40px",
  },
  [breakpoints.up("lg")]: {
    padding: "80px",
  },
}));
export const StyledGrid = styled(Grid)(({ theme: { breakpoints } }) => ({
  color: "#fff",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

export const Content = styled(Box)(({ theme: { breakpoints } }) => ({
  textAlign: "center",
  marginLeft: "0",
  gap: "24px",
  display: "flex",
  flexDirection: "column",
  [breakpoints.up("md")]: {
    textAlign: "start",
  },
}));

export const Title = styled(Typography)(
  ({ theme: { breakpoints, palette } }) => ({
    fontSize: "38px",
    fontFamily: "Manrope",
    fontWeight: 700,
    color: palette.secondary.main,
    [breakpoints.up("md")]: {
      fontSize: "48px",
    },
  }),
);

export const Description = styled(Typography)(({ theme: { breakpoints } }) => ({
  margin: 0,
  color: "#fff",
  fontWeight: "400",
  fontFamily: "Manrope",
  fontSize: "23px",
}));

export const StyledButton = styled(Button)(({ theme: { breakpoints } }) => ({
  height: "60px",
  borderRadius: "128px",
  padding: "16px 40px",
  color: "#000",
  fontSize: "20px",
  fontFamily: "Manrope",
  fontWeight: 700,
  lineHeight: "30px",
  background: "#fff",
  textTransform: "none",
  maxWidth: "fit-content",
  margin: "0 auto 40px",
  [breakpoints.up("md")]: {
    margin: "0",
  },
  "&:hover": {
    background: "#fff",
  },
}));

export const Media = styled("img")({
  display: "block",
  width: "100%",
  maxWidth: "528px",
});

export const MediaCard = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  justifyContent: "center",
  [breakpoints.up("lg")]: {
    justifyContent: "right",
  },
}));
