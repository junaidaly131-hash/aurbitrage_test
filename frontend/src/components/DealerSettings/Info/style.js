import { Button, styled, Typography } from "@mui/material";

export const Stylediv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  [theme.breakpoints.down(810)]: {
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "10px",
  },
}));
export const OtherWrapper = styled("div")(({ theme }) => ({
  width: "774px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
export const PeopleHeading = styled("h5")(() => ({
  color: "#ffffff",
  width: "100%",
  marginTop: "24px",
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "6px",
  fontWeight: "400",
  fontFamily: "Outfit",
}));
export const PeoplePara = styled("p")(() => ({
  fontWeight: "100",
  color: "#ffffff",
  margin: "24px",
  textAlign: "center",
  fontSize: "14px",
  fontFamily: "Outfit",
}));
export const AddPeopleBtn = styled("button")(() => ({
  background: "#4E4E4E",
  height: "35px",
  border: "none",
  borderRadius: "12px",
  width: "207px",
  marginTop: "24px",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "Outfit !important",
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
export { Error, RefreshBtn, ErrorWrapper };
