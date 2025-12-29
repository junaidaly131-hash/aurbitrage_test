import { Box, Checkbox, styled, Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CaretDown } from "phosphor-react";

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(0.75),
  padding: theme.spacing(5, 1.5),
  maxWidth: "100%",
  width: "292px",
  overflow: "auto",
  height: "calc(100vh - 76px)",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 1.5),
    height: "450px",
  },
}));

const DateRange = styled(Box)({
  display: "flex",
  gap: 12,
  alignItems: "center",
  color: "#fff",
});

const Chips = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  padding: theme.spacing(2.5, 0, 1.5, 0),
}));

const Divider = styled("hr")(({ theme }) => ({
  height: 0,
  border: 0,
  borderBottom: `1px solid ${theme.palette.background.dark3}`,
  marginBottom: 0,
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(1.5),
  },
}));

const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.primary.contrastText,
  borderRadius: "0 !important",
  borderBottom: `1px solid ${theme.palette.background.dark3}`,
  background: "none",
  "&:before": { display: "none" },
  "&.post.MuiPaper-root": {},
}));

const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  minHeight: 0,
  padding: theme.spacing(1, 0),
  p: {
    margin: 0,
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    alignItems: "center",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
}));

const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  background: "none",
}));

const ExpandIcon = styled(CaretDown)(({ theme }) => ({
  color: "#fff",
  width: "18px",
}));

const Label = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.background.grey,
  lineHeight: "100%",
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Icon = styled(Box)(({ theme, checked }) => ({
  border: !checked ? `1px solid ${theme.palette.background.overlay}` : `unset`,
  borderRadius: "4px",
  width: 14,
  height: 14,
  boxSizing: "border-box",
  background: checked
    ? theme.palette.background.grey
    : theme.palette.background.overlay,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CheckBox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
  "&:hover": { background: "transparent" },
}));

export {
  StyledBox,
  DateRange,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  ExpandIcon,
  Label,
  Title,
  Divider,
  Chips,
  Icon,
  CheckBox,
};
