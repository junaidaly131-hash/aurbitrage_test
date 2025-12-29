import {
  alpha,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  styled,
} from "@mui/material";
const SeeAll = styled(ButtonBase)(({ theme: { palette } }) => ({
  height: "32px",
  borderRadius: "6px",
  fontFamily: "Outif",
  fontSize: "12px",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "absolute",
  bottom: "18px",
  right: "96px",
  background: palette.secondary.dark,
  color: "#fff",
  textTransform: "capitalize",
}));
const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root.MuiDialog-paper": {
    width: "100%",
  },
});
const Content = styled(DialogContent)({
  width: "100%",
  position: "relative",
  minHeight: "300px",
});
const NavIcon = styled(IconButton)(({ theme: { palette } }) => ({
  height: "44px",
  width: "44px",
  borderRadius: "50%",
  position: "absolute",
  transform: "translateY(-50%)",
  top: "50%",
  border: `1px solid ${palette.background.gray}`,
  color: "#fff",
  background: alpha(palette.background.gray, 0.4),
  "&:hover": {
    background: palette.background.gray,
  },
}));
const Left = styled(NavIcon)({
  left: "8px",
});
const Right = styled(NavIcon)({
  right: "8px",
});
const CoverImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "fit",
  margin: "0 auto",
  display: "block",
});
export { SeeAll, StyledDialog, Content, Left, Right, CoverImage };
