import {
  styled,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";

const Wrapper = styled(Box)({
  paddingLeft: "56px",
  paddingRight: "56px",
  maxHeight: "calc(100vh - 200px)",
});
const GoButton = styled("button")({
  marginLeft: "36px",
  height: "44px",
  background: "rgba(234, 58, 61, 0.6)",
  borderRadius: "6px",
  fontFamily: "Outif",
  fontSize: "16px",
  padding: "0px 15px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#fff",
  textTransform: "capitalize",
  border: "none",
  cursor: "pointer",
});
const ImageSlider = styled(Box)({
  width: "100%",
  height: "auto",
  paddingTop: "40px",
  position: "relative",
});
const NavIcon = styled(IconButton)(({ theme: { palette } }) => ({
  borderRadius: "50%",
  position: "absolute",
  transform: "translateY(-50%)",
  zIndex: 2,
  top: "50%",
  color: "#fff",
  "&:hover": {
    color: palette.secondary.main,
  },
}));
const Left = styled(NavIcon)({
  left: "-12px",
});
const Right = styled(NavIcon)({
  right: "-12px",
});
const CoverImage = styled("img")({
  maxWidth: "calc(100% - 80px)",
  maxHeight: "524px",
  objectFit: "fit",
  margin: "0 auto",
  display: "block",
  width: "100%",
  position: "relative",
  zIndex: 1,
});
const GridWrapper = styled(Box)({
  paddingTop: "24px",
  paddingLeft: "58px",
  paddingRight: "58px",
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "25px",
});
const GridImagesContainer = styled("div")({
  width: "100%",
  height: "188px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "6px",
  padding: "7px",
  display: "flex",
  alignItems: "start",
  justifyContent: "end",
});
const DelButton = styled(Button)({
  cursor: "pointer",
  // position: "relative",
  // left: "px"
});
const StyledPopup = styled(Dialog)({
  "& .MuiPaper-root.MuiDialog-paper": {
    width: "429px",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(26, 24, 24, 0.09)",
    boxShadow: "none",
  },
});
const PopupContent = styled(DialogContent)({
  width: "100%",
  position: "relative",
  minHeight: "218px",
  background: "transparent",
  color: "white",
  textAlign: "center",
});
const Heading = styled("h2")({
  fontSize: "23px",
  fontWeight: "600",
  color: "white",
});
const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  marginBottom: "29px",
});
const NoButton = styled(Button)({
  color: "black",
  background: "white",
  fontSize: "19px",
});
const YesButton = styled(Button)({
  color: "White",
  background: "#EA3A3D",
  fontSize: "19px",
});
const GalleryContainer = styled(Box)({
  maxHeight: "calc(100vh - 118px)",
  overflow: "auto",
});
export {
  GoButton,
  Wrapper,
  ImageSlider,
  Left,
  Right,
  CoverImage,
  GridWrapper,
  GridImagesContainer,
  DelButton,
  StyledPopup,
  PopupContent,
  Heading,
  NoButton,
  ButtonContainer,
  YesButton,
  GalleryContainer,
};
