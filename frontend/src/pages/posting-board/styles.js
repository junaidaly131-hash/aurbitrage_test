import { Box, Button, Grid, styled } from "@mui/material";
export const GridContainer = styled(Grid)({ height: "98%", overflow: "none" });
export const GridItem = styled(Grid)({ height: "100%" });
export const ContentWrapper = styled(Box)({
  background: "#191919",
  borderRadius: "20px",
  maxWidth: "1440px",
  margin: "0",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  paddingBottom: "10px",
});
export const SearchWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const PostWrapper = styled(Box)({
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
});
export const SearchBox = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  width: "40%",
  maxWidth: "350px",
}));
export const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const Typo = styled("p")({
  flex: "0 1 auto",
  marginRight: "5px",
  color: "#1AD598",
  fontWeight: "400",
});
export const StyledButton = styled(Button)({
  padding: "11px 10px",
  borderRadius: "15px",
  margin: "0 12px",
  color: "#fff",
});

export const VideoContent = styled("video")({
  height: "300rem",
  width: "100%",
  backgroundSize: "cover",
});
