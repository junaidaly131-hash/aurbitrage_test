import {
  Box,
  Button,
  CardMedia,
  IconButton,
  Modal,
  styled,
} from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  color: "white",
  height: "100%",
  maxHeight: "450px",
  flexDirection: "column",
  overflow: "hidden",
  "& .circularBar": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
    width: "100%",
  },

  "&:hover .thumbnails": {
    transform: "scale(1)",
  },

  "& .imageModal": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  "& .imageModalHeight": {
    maxWidth: "70%",
    maxHeight: "70%",
    objectFit: "contain",
  },
}));

const Media = styled(CardMedia)({
  objectFit: "contain",
  borderRadius: "20px",
  maxHeight: "348px",
  cursor: "pointer",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

const SliderNavigation = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
}));

const PrevButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 0,
  backgroundColor: "white",
  color: "black",
}));
const NextButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 0,
  backgroundColor: "white",
  color: "black",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  position: "relative",
  "& .css-10ifshv-MuiButtonBase-root-MuiIconButton-root:hover": {
    background: "white",
  },
  "& .css-otdnv0-MuiButtonBase-root-MuiIconButton-root:hover": {
    backgroundColor: "white !important",
  },
}));
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
const StyledImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "100%",
  maxHeight: "100%",
  width: "100%",
  objectFit: "cover",
  outline: "none",
  borderRadius: theme.spacing(1),
}));
const ModalImage = styled("img")(({ theme }) => ({
  width: "600px",
  height: "600px",
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  borderRadius: theme.spacing(1),
}));
const Thumbnails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "54px",
  gap: "16px",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
  transform: "scale(1)",
  background: "rgba(0,0,0,.3)",
  borderRadius: "12px",
  width: "auto",
  padding: "4px",
}));
const Thumbnail = styled("img")(({ theme }) => ({
  objectFit: "cover",
  height: "100%",
  width: " 100%",
  maxHeight: "100%",
  maxWidth: "100%",
  borderRadius: "4px",
}));
const ThumbnailIndex = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  background: theme.palette.background.paper,
  borderRadius: "5px",
  padding: "2px 5px",
}));
const ThumbnailImage = styled(Box)({
  width: "80px",
  height: "40px",
  borderRadius: "4px",
  overflow: "hidden",
  cursor: "pointer",
  objectFit: "cover",
});
const StyledPdfBox = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "90vh",
  overflow: "auto",
  color: "white",
  background: "#292929",
  padding: 2,
}));

const PdfRowElements = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 3,
}));

const PdfModalButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#DBA42D",
  color: "white",
  "&:hover": { backgroundColor: "#115293" },
  "&:disabled": { backgroundColor: "#ccc" },
  "&.download": {
    marginBottom: "10px",
  },
}));

export {
  StyledBox,
  SliderNavigation,
  ThumbnailIndex,
  Thumbnail,
  Thumbnails,
  StyledImage,
  StyledModal,
  ImageWrapper,
  NextButton,
  PrevButton,
  ThumbnailImage,
  Media,
  StyledPdfBox,
  PdfRowElements,
  PdfModalButton,
  ModalImage,
};
