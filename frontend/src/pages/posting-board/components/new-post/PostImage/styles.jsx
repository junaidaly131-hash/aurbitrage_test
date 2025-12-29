import {
  alpha,
  Box,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import uploadbg from "@/assets/images/image upload bg.png";

const IconBtn = styled(IconButton)({
  color: "#fff",
});
const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  position: "absolute",
  right: theme.spacing(2),
  bottom: theme.spacing(1.5),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.5, 1.5, 0.5, 0.5),
  button: {
    padding: theme.spacing(0, 0.5),
  },
  label: {
    height: "fit-content",
    display: "flex",
    padding: theme.spacing(0),
  },
}));
const Media = styled(CardMedia)({
  objectFit: "contain",
  borderRadius: "20px",
  height: "400px",
});
const Label = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.spacing(1),
  minHeight: "50vh",
  width: "100%",
  background: `url(${uploadbg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
}));

const UploadLabel = styled("label")({
  fontWeight: "400",
  margin: "10px 0px",
});

const Navigation = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  color: "#fff",
  height: "32px",
  width: "32px",
  padding: 0,
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    color: "#fff",
  },
}));
const NavLeft = styled(Navigation)({
  left: 0,
});
const NavRight = styled(Navigation)({
  right: 0,
});
const Navigations = styled(Box)({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
});
const ActiveIndex = styled("div")(({ theme }) => ({
  fontWeight: "400",
  position: "absolute",
  right: 0,
  left: "50%",
  bottom: theme.spacing(1.5),
  background: "#191919",
  color: "white",
  padding: theme.spacing(0, 1.5),
  height: "30px",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  zIndex: 1000,
  transform: "translateX(-50%)",
}));
const ImageUploadWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}));

const Thumbnail = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "calc(100% - 358px)",
  position: "relative",
  overflow: "hidden",
}));

const DocContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  ".react-pdf__message.react-pdf__message--loading": {
    color: "#000",
    padding: theme.spacing(3, 1),
  },
}));

const Loader = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#888",
  zIndex: 1,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.overlay,
  padding: theme.spacing(1.25, 2.25),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.25),
}));
const FileName = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#fff",
});
const FileDetails = styled(Typography)({
  color: alpha("#fff", 0.8),
});
const PdfPreviewWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.grey,
  borderRadius: 1,
  padding: 1,
  marginBottom: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));
export {
  ImageUploadWrapper,
  IconBtn,
  IconBox,
  Media,
  Label,
  UploadLabel,
  NavLeft,
  NavRight,
  Navigations,
  ActiveIndex,
  DocContainer,
  Thumbnail,
  Loader,
  FileDetails,
  FileName,
  ContentWrapper,
  PdfPreviewWrapper,
};
