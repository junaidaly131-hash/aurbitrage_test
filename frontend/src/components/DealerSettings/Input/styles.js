import { InputAdornment, styled, Typography } from "@mui/material";

const Stylediv = styled("div")(() => ({
  width: "356px",
  // marginBottom: "12px",
  "& .MuiInputBase-root": {
    backgroundColor: "transparent",
    color: "#ffffff",
    width: "100%",
    fontSize: "9px",
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
    width: "100%",
    fontSize: "15px",
    opacity: 1,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#ffffff",
    width: "100%",
    fontSize: "15px",
    opacity: 1,
  },
  "& .css-wb57ya-MuiFormControl-root-MuiTextField-root": {
    backgroundColor: "#292929",
    borderRadius: "9px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "12px",
  },
  "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
    paddingBottom: "0px",
    paddingTop: "0px",
  },
}));

const InputLabel = styled("p")(() => ({
  color: "#ffffff",
  marginTop: "0px",
  marginBottom: "6px",
  fontSize: "9px",
  fontFamily: "Outfit",
}));

const Required = styled("span")(() => ({
  color: "red",
}));
const Error = styled(Typography)(({ theme: { palette } }) => ({
  margin: "0px",
  fontSize: "12px",
  color: palette.danger.main,
}));
const InputIcon = styled(InputAdornment)({
  color: "#fff",
});

export { Stylediv, InputLabel, Required, Error, InputIcon };
