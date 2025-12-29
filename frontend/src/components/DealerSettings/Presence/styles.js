import { Button, styled, Typography } from "@mui/material";

const Stylediv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: " 40px",
  justifyContent: "center",

  [theme.breakpoints.down(810)]: {
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "10px",
  },
}));
const OnlineWrapper = styled("div")(({ theme }) => ({
  width: "774px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const OnlineHeading = styled("h5")(() => ({
  color: "#ffffff",
  width: "100%",
  marginTop: "24px",
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "400",
  fontFamily: "Outfit",
}));
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
export {
  Stylediv,
  OnlineWrapper,
  OnlineHeading,
  Error,
  RefreshBtn,
  ErrorWrapper,
};
