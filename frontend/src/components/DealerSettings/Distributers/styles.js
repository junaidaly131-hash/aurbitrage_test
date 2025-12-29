import { Button, Grid, styled, Typography } from "@mui/material";

const AuthorizedContainer = styled("div")(({ theme }) => ({
  height: "calc(100vh - 340px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down(650)]: {
    height: "calc(100vh - 340px)",
  },
  "& .css-1f2kvjf-MuiFormControlLabel-root": {
    width: "100%",
  },
  "& .css-1f2kvjf-MuiFormControlLabel-root .MuiFormControlLabel-label": {
    width: "100%",
  },
  "& .css-omkpe3-MuiButtonBase-root-MuiCheckbox-root": {
    width: "70%",
  },
  "& .css-1hoxztr": {
    fontFamily: "Outfit !important",
  },
  "& .css-16iwd3n-MuiGrid-root": {
    marginLeft: "0px",
    marginTop: "0px",
    paddingTop: "8px",
    paddingBottom: "24px",
    width: "100%",
    paddingLeft: "10px",
  },
  "& .css-16iwd3n-MuiGrid-root>.MuiGrid-item ": {
    paddingLeft: "0px",
  },
}));
const AuthorizedWrapper = styled("div")(({ theme }) => ({
  "& .css-1f2kvjf-MuiFormControlLabel-root": {
    width: "100%",
  },
  "& .css-1f2kvjf-MuiFormControlLabel-root .MuiFormControlLabel-label": {
    width: "100%",
  },
  "& .css-omkpe3-MuiButtonBase-root-MuiCheckbox-root": {
    width: "70%",
  },
  width: "774px",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
}));

const Stylediv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
}));
const AuthorizedHeading = styled("h5")(() => ({
  color: "#ffffff",
  width: "100%",
  marginTop: "24px",
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "400",
  fontFamily: "Outfit",
}));
const AuthorizedPara = styled("p")(() => ({
  fontSize: "16px",
  color: "#ffffff",
  textAlign: "center",
  marginTop: "40px",
  fontFamily: "Outfit",
}));
const AddIndustryAffiliations = styled("button")(() => ({
  background: "#4E4E4E",
  height: "35px",
  border: "none",
  borderRadius: "12px",
  width: "246px",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "Outfit !important",
}));
const AuthorizedGrid = styled(Grid)(() => ({
  backgroundColor: "#292929",
  borderRadius: "24px",
  paddingBottom: "28px",
  marginTop: "0px",
}));
const Loader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Error = styled(Typography)({
  color: "red",
  textAlign: "center",
  marginBottom: "20px",
});
const RefreshBtn = styled(Button)({
  padding: "6px 30px",
  // width:"20%",
  background: "rgba(219, 164, 45, 0.5)",
  color: "white",
  "&:hover": {
    background: "rgba(219, 164, 45, 0.5)",
  },
});

export {
  AuthorizedContainer,
  AuthorizedWrapper,
  Stylediv,
  AuthorizedHeading,
  AuthorizedPara,
  AddIndustryAffiliations,
  AuthorizedGrid,
  Loader,
  Error,
  RefreshBtn,
};
