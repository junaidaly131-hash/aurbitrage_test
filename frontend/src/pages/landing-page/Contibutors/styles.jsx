import { Box, Button, styled, Typography } from "@mui/material";

export const ContributorWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  position: "relative",
  flexDirection: "column",
  gap: "24px",
  padding: "40px 20px",
  [breakpoints.up("md")]: {
    justifyContent: "start",
    padding: "40px",
  },
  [breakpoints.up("lg")]: {
    padding: "80px",
  },
  background: "#101010",
  "&.dark": {
    background: "#18181A",
  },
}));
export const ContentWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
}));

export const Media = styled("img")({
  width: "150px",
  height: "auto",
});

export const ActionButton = styled(Button)(({ theme: { palette } }) => ({
  height: "68px",
  width: "fit-content",
  padding: "16px 44px",
  background: palette.secondary.main,
  color: "#000",
  textTransform: "none",
  fontSize: "23px",
  fontWeight: "700",
  fontFamily: "Manrope",
  borderRadius: "140px",
  "&:hover": {
    background: "#fff",
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "24px",
  fontWeight: "400",
  fontFamily: "Manrope",
  textAlign: "left",
}));
