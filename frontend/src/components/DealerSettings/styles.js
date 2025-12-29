import { Box, Button, Container, StepLabel, styled } from "@mui/material";
const Stylediv = styled("div")(({ theme: { palette } }) => ({
  width: "100%",
  backgroundColor: "#292929",
  paddingLeft: "48px",
  paddingBottom: "21px",
  paddingRight: "48PX",
  borderRadius: "12px",
  paddingTop: "24px",

  "& .css-m5vj9m-MuiStepper-root": {
    width: "40%",
    margin: "0 auto",
  },

  "& .css-1bw0nnu-MuiStep-root": {
    padding: "0px",
  },
  "& .css-vnkopk-MuiStepLabel-iconContainer": {
    padding: "0px",
  },
  "& .css-z7uhs0-MuiStepConnector-line": {
    borderTopStyle: "dashed",
  },
  "& .css-1ipbt8v-MuiSvgIcon-root-MuiStepIcon-root": {
    height: "30px",
    width: "30px",
    border: "1px solid black",
    borderRadius: "50%",
    color: "#DBA42D",
  },
  "& .css-1ipbt8v-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#ffffff",
  },
  "& .css-1ipbt8v-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: "#DBA42D",
  },
  "& .css-1fsqha0-MuiStepIcon-text": {
    fill: "black",
  },
  "& .css-mzoumo-MuiButtonBase-root-MuiButton-root": {
    color: "white",
  },
  "& .text-editor": {
    maxWidth: "100%",
    width: "100%",
    background: "#292929",
    borderRadius: "10px",
    ".quill": {
      margin: 0,
    },
    ".ql-toolbar": {
      background: "#4E4E4E",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    ".ql-editor": {
      minHeight: "200px !important",
    },
    "button:hover, .ql-toolbar button:hover, button:focus, .ql-toolbar button:focus, button.ql-active, .ql-toolbar button.ql-active, .ql-picker-label, .ql-toolbar .ql-picker-label, .ql-picker-label.ql-active, .ql-toolbar .ql-picker-label.ql-active, .ql-picker-item:hover, .ql-toolbar .ql-picker-item:hover, .ql-picker-item.ql-selected, .ql-toolbar .ql-picker-item.ql-selected":
      {
        color: palette.secondary.main,
      },
    ".ql-toolbar button:hover .ql-stroke, .ql-toolbar button:focus .ql-stroke, .ql-toolbar button.ql-active .ql-stroke, .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-toolbar .ql-picker-item.ql-selected .ql-stroke":
      {
        stroke: palette.secondary.main,
      },
    ".ql-toolbar button:hover .ql-fill, .ql-toolbar button:focus .ql-fill, .ql-toolbar button.ql-active .ql-fill, .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-toolbar .ql-picker-item.ql-selected .ql-fill":
      {
        fill: palette.secondary.main,
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
    ".ql-toolbar.ql-snow": {
      border: "none !important",
    },
    ".ql-container.ql-snow": {
      border: "none !important",
    },
  },
}));

const StyledHeading = styled("h2")(({ theme }) => ({
  textAlign: "center",
  fontSize: "42px",
  marginTop: "0px",
  marginBottom: "12px",
  fontFamily: "Outfit",
  position: "relative",
}));

const StepperContant = styled(Box)(({ theme }) => ({
  Width: "100%",
}));
const StepperContantBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  marginTop: "30px",
}));
const SaveBtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const SaveBtn = styled("button")(({ disabled, type }) => ({
  background: disabled ? "#ccc" : "#dba42d",
  height: "35px",
  border: "none",
  borderRadius: "12px",
  width: "192px",
  cursor: "pointer",
  color: disabled ? "#eee" : "black",
  fontSize: "12px",
  fontWeight: "900",
  opacity: disabled ? " 0.5" : "1",
  fontFamily: "Outfit !important",
}));
const SaveBtnv2 = styled("button")(({ back }) => ({
  background: back ? "rgba(234, 58, 61, 0.6)" : "rgba(219, 164, 45, 0.5)",
  height: "44px",
  border: "none",
  borderRadius: "6px",
  width: "164px",
  cursor: "pointer",
  color: "white",
  fontSize: "12px",
  fontWeight: "400",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontFamily: "Outfit !important",
}));
const SkipBtn = styled(Button)(() => ({
  background: "#dba42d",
  position: "absolute",
  right: "12px",
  top: "12px",
  color: "black",
  fontSize: "12px",
  "&:hover": {
    background: "#dba42d",
  },
}));
const StepLabelStyles = styled(StepLabel)(({ theme }) => ({}));

const StepIconBox = styled("div")(({ active, completed }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  fontSize: "14px",
  fontWeight: "bold",
  backgroundColor: active ? "white" : "#dba42d",
}));

const FormWrapper = styled(Container)(({ theme: { palette } }) => ({
  backgroundColor: "#1D1D1D",
  padding: "20px",
  borderRadius: "12px",
}));
const Content = styled(Box)({
  height: "calc(100vh - 390px)",
  overflowX: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});
const TabContent = styled(Box)(({ tabHeight }) => ({
  height: `calc(100vh - ${tabHeight + 340}px)`,
  overflowX: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}));

export {
  FormWrapper,
  Stylediv,
  StyledHeading,
  StepperContant,
  StepperContantBtn,
  SaveBtnContainer,
  SaveBtn,
  StepLabelStyles,
  StepIconBox,
  Content,
  TabContent,
  SaveBtnv2,
  SkipBtn,
};
