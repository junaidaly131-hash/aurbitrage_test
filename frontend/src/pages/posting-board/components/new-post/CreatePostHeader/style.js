import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { CaretLeft } from "phosphor-react";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  borderBottom: `1px solid ${theme.palette.background.dark3}`,
  "& > *": {
    width: "33%",
  },
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    marginBottom: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    "& > *": {
      width: "auto",
    },
  },
}));

const BackBtn = styled(CaretLeft)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  color: "#fff",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    left: "12px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "20px",
  textAlign: "center",
}));

const Actions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(1.5),
  button: {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

export { StyledBox, BackBtn, Title, Actions };
