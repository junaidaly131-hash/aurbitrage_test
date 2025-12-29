import { Box, Button, Grid, Typography, styled } from "@mui/material";

export const Title = styled(Typography)(
  ({ theme: { breakpoints, palette }, variant }) => ({
    margin: "0",
    fontSize: "32px",
    lineHeight: "40px",
    color: variant === "colored" ? "#000" : palette.secondary.main,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Manrope",
    [breakpoints.up("md")]: {
      lineHeight: "56px",
      fontSize: "48px",
      textAlign: "left",
    },
  }),
);

export const Header = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  [breakpoints.up("md")]: {
    maxWidth: "540px",
  },
}));

export const Description = styled(Typography)(
  ({ theme: { breakpoints }, variant }) => ({
    margin: "0px",
    fontSize: "22px",
    fontWeight: "400",
    color: variant === "colored" ? "#000" : "#fff",
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
  }),
);

export const ContentWrapper = styled(Grid)(
  ({ theme: { breakpoints }, media }) => ({
    padding: "40px 0",
    display: "flex",
    alignItems: "center",
    "> div:nth-child(1)": {
      order: media,
      marginTop: parseInt(media) === 1 ? "40px" : "0",
      marginBottom: parseInt(media) !== 1 ? "40px" : "0",
    },
    [breakpoints.up("md")]: {
      padding: "64px 0",
      "> div:nth-child(1)": {
        marginTop: "0",
        marginBottom: "0",
      },
    },
  }),
);

export const Media = styled("img")(({ theme: { breakpoints }, imgWidth }) => ({
  width: "100%",
  maxWidth: { imgWidth },
  margin: "0 auto",
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
    "&.white": {
      background: "white",
    },
    "&.black": {
      color: "#fff",
      background: "black",
      "&:hover": {
        background: "black",
      },
    },
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
