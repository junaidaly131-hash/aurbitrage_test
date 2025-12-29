import { Box, styled, Typography } from "@mui/material";
import header_img from "@/assets/images/landing-pages/header.jpeg";

export const Header = styled(Box)({
  height: "322px",
  background: `url(${header_img})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
});
export const Overlay = styled(Box)({
  background: "#000000CC",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
});
export const Title = styled(Typography)({
  fontFamily: "Manrope",
  fontWeight: "700",
  color: "#fff",
  fontSize: "48px",
  lineHeight: "64px",
  margin: "auto !important",
});
export const SectionWrapper = styled(Box)(
  ({ theme: { breakpoints, palette } }) => ({
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "40px 20px",
    background: "#18181A",

    "&.dark": {
      background: "#101010",
    },
    "&.colored": {
      background: palette.secondary.main,
      borderRadius: "50px",
    },
    "&.round-top": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
    [breakpoints.up("md")]: {
      justifyContent: "start",
      padding: "40px 20px",
      "&.box": {
        padding: "80px 20px",
      },
    },
    [breakpoints.up("lg")]: {
      padding: "80px",
      "&.box": {
        padding: "140px 80px",
      },
    },
  }),
);

export const FlexBox = styled(Box)({
  display: "flex",
  gap: "24px",
  flexDirection: "column",
});

export const Wrapper = styled(Box)(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
  width: "100%",
  boxSizing: "border-box",
}));

export const ContributorsWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "40px",
  justifyContent: {
    xs: "center",
    md: "center",
    lg: "space-between",
  },
  flexWrap: "wrap",
  marginTop: "80px",
}));

export const ContributorMedia = styled(Box)(({ theme: { breakpoints } }) => ({
  width: `calc(${100 / 3}% - 40px)`,
  [breakpoints.up("md")]: {
    width: `calc(${100 / 6}% - 40px)`,
  },
}));
