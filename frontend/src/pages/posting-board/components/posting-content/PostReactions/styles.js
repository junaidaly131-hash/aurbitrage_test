import { Box, IconButton, styled } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  justifyContent: "space-between",
  paddingTop: theme.spacing(1.5),
  borderTop: `1px solid ${theme.palette.background.dark3}`,
}));
const IconBox = styled(IconButton)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "100%",
  padding: "0px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  minWidth: "max-content",
  "& .faved": {
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
  },
  "& .more-comments": {
    color: "#DBA42D",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

const ReactionsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
const Sharing = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: theme.spacing(1.5),
  alignItems: "center",
}));

const Divider = styled("hr")(({ theme }) => ({
  margin: theme.spacing(0, 3),
  background: theme.palette.background.dark3,
  height: "17px",
  [theme.breakpoints.down("md")]: {
    margin: theme.spacing(0, 0.6),
  },
}));

export { Wrapper, IconBox, ReactionsBox, Sharing, Divider };
