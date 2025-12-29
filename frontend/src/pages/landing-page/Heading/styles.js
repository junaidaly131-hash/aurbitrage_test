import { Box, styled, Typography } from "@mui/material";

export const Wrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "block",
  textAlign: "center",
  margin: "0 auto",
  [breakpoints.up("md")]: {
    margin: "0",
    textAlign: "left",
  },
}));
export const Container = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  justifyContent: "center",
  [breakpoints.up("md")]: {
    justifyContent: "start",
  },
}));

export const Title = styled(Typography)(
  ({ theme: { breakpoints }, variant }) => ({
    marginBottom: "10px",
    display: "inline-block",
    fontSize: "18px",
    color: variant === "colored" ? "#000" : "#fff",
    [breakpoints.up("md")]: {
      fontSize: "24px",
    },
  }),
);

export const Divider = styled(Box)({
  display: "flex",
});

export const ColoredBar = styled("span")(({ variant }) => ({
  width: "60px",
  height: "6px",
  borderRadius: "20px",
  backgroundColor: variant === "colored" ? "#000" : "#fff",
  zIndex: "999",
}));
export const Bar = styled("span")(({ variant }) => ({
  width: "90px",
  height: "6px",
  borderRadius: "20px",
  backgroundColor: variant === "colored" ? "#BFBABA" : "#383838",
  marginLeft: "-10px",
}));
