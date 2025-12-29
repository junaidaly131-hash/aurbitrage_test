import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme, isLike }) => ({
  border: "unset",
  color: "#fff",
  padding: "0px",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "100%",
  alignItems: "center",
  gap: "6px",
  textTransform: "none",
  minWidth: "max-content",
  svg: {
    color: isLike ? theme.palette.secondary.main : "#fff",
  },
  ".liked": {
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    color: theme.palette.secondary.main,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

export { StyledButton };
