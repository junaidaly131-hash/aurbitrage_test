import { Box, IconButton, styled } from "@mui/material";

const StyledContainer = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0),
  "& img": {
    width: "24px",
    height: "24px",
  },
}));

const StyledCalendarBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(1.5),
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  minWidth: "274px",
}));

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const DateInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(1),
  marginTop: theme.spacing(1.5),
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
}));

const DaysCount = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "14px",
  fontWeight: "500",
}));

const TodayLabel = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(1),
  fontSize: "12px",
  color: theme.palette.primary.light,
  fontWeight: "500",
  background: theme.palette.secondary.main,
  padding: theme.spacing(0, 0.5),
  borderRadius: theme.spacing(0.5),
  width: "fit-content",
}));

const PickerInputOverride = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  " & .MuiInputBase-root, & .MuiInputBase-input": {
    color: "#fff",
    background: `${theme.palette.background.dark3} !important`,
    borderRadius: `${theme.spacing(0.5)} !important`,
    padding: theme.spacing(0.5, 1.5),
    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  "& .MuiFormLabel-root": {
    color: theme.palette.secondary.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.background.dark3} !important`,
  },
  "& .MuiTextField-root": {
    background: `${theme.palette.background.dark3} !important`,
    borderRadius: `${theme.spacing(0.5)} !important`,
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(1.5),
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
}));

const Relative = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(1.5),
  "&:nth-child(1)": {
    marginTop: 0,
  },
}));

export {
  StyledContainer,
  StyledIconButton,
  StyledCalendarBox,
  FlexContainer,
  DateInfo,
  DaysCount,
  TodayLabel,
  PickerInputOverride,
  ButtonContainer,
  Relative,
};
