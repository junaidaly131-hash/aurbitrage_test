import { Box, styled } from "@mui/material";

const StyledChip = styled(Box)(({ theme, rounded = false, color = "" }) => ({
  backgroundColor: theme.palette.background.overlay,
  height: rounded ? "20px" : "28px",
  width: "fit-content",
  flexWrap: "nowrap",
  color: color ? `${theme.palette}.${color}` : theme.palette.background.grey,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: rounded ? 500 : 400,
  fontSize: "12px",
  gap: "6px",
  padding: !rounded ? "6px" : "2px 8px",
  lineHeight: rounded ? "12px" : "unset",
  borderRadius: !rounded ? theme.spacing(0.5) : "100px",
  cursor: "pointer",
}));

export { StyledChip };
