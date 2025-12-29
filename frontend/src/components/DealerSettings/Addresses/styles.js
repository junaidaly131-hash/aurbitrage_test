import { Button, styled, Typography } from "@mui/material";
import ReactQuill from "react-quill";

const Stylediv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "40px",
  justifyContent: "center",
  [theme.breakpoints.down(810)]: {
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "10px",
  },
  "&.text-editor": {
    "button:hover, .ql-toolbar button:hover, button:focus, .ql-toolbar button:focus, button.ql-active, .ql-toolbar button.ql-active, .ql-picker-label, .ql-toolbar .ql-picker-label, .ql-picker-label.ql-active, .ql-toolbar .ql-picker-label.ql-active, .ql-picker-item:hover, .ql-toolbar .ql-picker-item:hover, .ql-picker-item.ql-selected, .ql-toolbar .ql-picker-item.ql-selected":
      {
        color: theme.palette.secondary.main,
      },
    ".ql-toolbar button:hover .ql-stroke, .ql-toolbar button:focus .ql-stroke, .ql-toolbar button.ql-active .ql-stroke, .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-toolbar .ql-picker-item.ql-selected .ql-stroke":
      {
        stroke: theme.palette.secondary.main,
      },
    ".ql-toolbar button:hover .ql-fill, .ql-toolbar button:focus .ql-fill, .ql-toolbar button.ql-active .ql-fill, .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-toolbar .ql-picker-item.ql-selected .ql-fill":
      {
        fill: theme.palette.secondary.main,
      },
    "button, .ql-toolbar button, button:focus, .ql-toolbar button:focus, button.ql-active, .ql-toolbar button.ql-active, .ql-picker-label, .ql-toolbar .ql-picker-label, .ql-picker-label.ql-active, .ql-toolbar .ql-picker-label.ql-active .ql-toolbar .ql-picker-item.ql-selected":
      {
        color: "#fff",
      },
    ".ql-toolbar button .ql-stroke, .ql-toolbar button:focus .ql-stroke, .ql-toolbar button.ql-active .ql-stroke, .ql-toolbar .ql-picker-label .ql-stroke, .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-toolbar .ql-picker-item .ql-stroke, .ql-toolbar .ql-picker-item.ql-selected .ql-stroke":
      {
        stroke: "#fff",
      },
    ".ql-toolbar button .ql-fill, .ql-toolbar button:focus .ql-fill, .ql-toolbar button.ql-active .ql-fill, .ql-toolbar .ql-picker-label .ql-fill, .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-toolbar .ql-picker-item .ql-fill":
      {
        fill: "#fff",
      },
  },
}));
const AddressesWrapper = styled("div")(({ theme }) => ({
  width: "924px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const AddressesHeading = styled("h5")(() => ({
  color: "#ffffff",
  width: "100%",
  marginTop: "24px",
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "400",
  fontFamily: "Outfit",
}));
const AddressesPara = styled(ReactQuill)(({ theme }) => {
  return {
    color: "#ffffff",
    width: "100%",
    marginTop: "24px",
    marginBottom: "24px",
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "300",
    fontFamily: "Outfit",
  };
});

const AddressesText = styled("p")(() => ({
  fontSize: "12px",
  color: "#ffffff",
  fontFamily: "Outfit",
  margin: "0px",
}));

const AddressNumber = styled("span")(() => ({
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  fontFamily: "Outfit",
}));

const Table = styled("table")(
  ({ theme: { palette }, borderSpacingEnabled }) => ({
    borderCollapse: "separate",
    borderSpacing: borderSpacingEnabled ? "12px 12px" : "0 12px",
    tr: {
      height: "54px",
    },
    th: {
      padding: "10px",
      textAlign: "center",
      color: "#fff",
      fontFamily: "Outfit",
      fontSize: "16px",
      fontWeight: 400,
    },
    td: {
      borderRadius: "0",
      fontFamily: "Outfit",
      color: "#fff",
      fontWeight: 500,
      fontSize: "14px",
      padding: "12px",
      background: palette.background.overlay,
      paddingLeft: "21px",
      paddingRight: borderSpacingEnabled ? "36px" : "36px",
      "&:first-child": {
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderTopRightRadius: borderSpacingEnabled ? "10px" : "0px",
        borderBottomRightRadius: borderSpacingEnabled ? "10px" : "0px",
        textAlign: "left",
      },
      "&:last-child": {
        borderRadius: borderSpacingEnabled ? "10px" : "0px",
        borderTopRightRadius: borderSpacingEnabled ? "10px" : "10px",
        borderBottomRightRadius: borderSpacingEnabled ? "10px" : "10px",
        textAlign: borderSpacingEnabled ? "left" : "right",
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
    },
  }),
);

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
const NoData = styled("p")(() => ({
  fontSize: "16px",
  color: "#fff",
  fontFamily: "Outfit",
  fontWeight: "600",
  textAlign: "center",
}));

export {
  Stylediv,
  AddressesWrapper,
  AddressesHeading,
  AddressesPara,
  AddressesText,
  AddressNumber,
  Table,
  Error,
  RefreshBtn,
  ErrorWrapper,
  NoData,
};
