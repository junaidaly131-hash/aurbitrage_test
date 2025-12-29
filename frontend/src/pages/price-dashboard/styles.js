import { Box, Grid, styled } from "@mui/material";

export const Wrapper = styled(Grid)(({ header, theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "8px",
  width: "100%",
  margin: "0px auto",
  overflow: "hidden",
  position: "relative",
  padding: "24px",
  height: `calc(100vh - ${88}px)`,
}));

export const TableWrapper = styled(Box)(({ header, theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "8px",
  paddingTop: "12px",
  margin: "0 auto",
  ".pricing-table-scroller": {
    height: `calc(100vh - ${header + 136}px) !important`,
  },
}));

export const StyledSortableTableCell = styled("th")(({ theme, label }) => ({
  "&.MuiTableCell-head": { color: "#fff" },
  border: "none",
  width: label == "SKU" ? "auto" : "200px",
  paddingBottom: "0px !important",
  paddingTop: "0px !important",
  borderRadius: "0px !important",
  height: "48px !important",
  cursor: "pointer",
  lineHeight: "48px",
  fontSize: "14px",
  fontFamily: "Outfit",
  fontWeight: "500",
  "& span": {
    display: "inline-block",
  },
  "& .sort": {
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
  },
}));
