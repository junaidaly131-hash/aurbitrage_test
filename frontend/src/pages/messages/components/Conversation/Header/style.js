import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark2,
  color: "white",
  borderBottom: "1px solid rgba(255,255,255,0.10)",
  padding: theme.spacing(1.5),
  "& .stack": {
    width: "100%",
    height: "100%",
  },
}));

export const Status = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.grey,
  lineHeight: "1",
}));
export const Dealer = styled(Typography)(({ theme }) => ({
  lineHeight: "1",
}));
