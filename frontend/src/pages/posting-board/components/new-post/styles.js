import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Select,
  styled,
  Popover,
  Typography,
  FormGroup,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
export const StyledModal = styled(Modal)({
  display: "grid",
  placeItems: "center",
});
export const ModalContent = styled(Box)({
  maxWidth: "90vw",
  width: "850px",
  padding: 3,
  borderRadius: 5,
  overflowY: "auto",
  maxHeight: "90%",
  background: "#292929",
});
export const QuillContainer = styled("div")({
  height: "300px",
  "& #editor": {
    minHeight: "10rem",
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    overflowY: "auto",
    color: "white",
    borderRadius: "15px",
  },
  "& .ql-editor": {
    color: "white",
    "&::before": {
      color: "white",
    },
  },
  "& .ql-container": {
    backgroundColor: "##696969",
    borderRadius: "0 0 15px 15px",
  },
  "& .ql-toolbar": {
    borderRadius: "15px 15px 0 0",
  },
});
export const Field = styled(Box)(({ theme }) => ({
  background: "#191919",
  padding: "18px",
  borderRadius: theme.spacing(2),
  margin: theme.spacing(1.5, 0),
}));
export const PostTitle = styled(Field)({
  border: "2px solid #696969",
});
export const ModalHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "15px",
  background: "#191919",
  padding: "18px",
});
export const ActionButton = styled(Button)({
  borderRadius: "50px",
  padding: "6px 20px",
  color: "#fff",
});
export const CancelButton = styled(ActionButton)(({ theme }) => ({
  background: "#EA3A3D",
  "&:hover": { background: "#EA3A3D" },
  margin: theme.spacing(0, 2.5),
}));
export const AddButton = styled(ActionButton)({
  background: "#DBA42D",
  "&:hover": { background: "#DBA42D" },
});
export const FlexCenter = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const FlexBox = styled(FlexCenter)(({ theme }) => ({
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
export const FlexRight = styled(FlexCenter)(({ theme }) => ({
  marginRight: theme.spacing(4),
}));
export const Labels = styled("h6")({
  margin: "13px 0",
  fontWeight: "300",
  fontSize: "17px",
  justifyContent: "space-between",
  width: "100%",
});
export const PostButton = styled(Button)(({ theme }) => ({
  display: "flex",
  textTransform: "capitalize",
  padding: theme.spacing(0.4, 4),
  fontWeight: "400",
  height: "36px",
  lineBreak: "ristricted",
  cursor: "pointer",
  minWidth: "max-content",
  gap: theme.spacing(1.5),
}));
export const PostIcon = styled("img")({ marginLeft: "10px" });
export const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: 45,
  height: 45,
  marginRight: theme.spacing(2.5),
  objectFit: "contain",
}));
export const TextWhite = styled("h6")({ margin: "0px", color: "#fff" });
export const Dealer = styled("p")({
  margin: "0px",
  color: "#DBA42D",
  fontWeight: "500",
  fontSize: "13px",
});
export const GridSpacing = styled(Grid)({
  marginTop: 3,
  marginBottom: 3,
});
export const Video = styled("video")({ backgroundSize: "cover" });
export const CardImage = styled(CardMedia)(({ theme }) => ({
  objectFit: "contain",
  borderRadius: theme.spacing(2.5),
  height: "400px",
}));
export const Delete = styled(IconButton)({ marginLeft: 2 });
export const UploadButton = styled("img")({ cursor: "pointer", width: "25px" });
export const UploadInput = styled("input")({ display: "none" });
export const PostImageBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
});
export const NavIcon = styled(IconButton)({
  position: "absolute",
  backgroundColor: "white",
  color: "black",
});
export const NextIcon = styled(NavIcon)({
  right: 0,
});
export const PrevIcon = styled(NavIcon)({
  left: 0,
});
export const FileLabel = styled("label")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#696969",
  padding: "15px",
  borderRadius: "15px",
  marginLeft: "4px",
  marginRight: "4px",
  minHeight: "50vh",
});
export const FileIcon = styled("img")({ cursor: "pointer" });
export const Info = styled("h5")({ fontWeight: "400", margin: "10px 0px" });
export const SettingsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "space-between",
  background: "#191919",
  padding: "30px 20px",
  borderRadius: "15px",
  marginLeft: "4px",
  marginRight: "4px",
  minHeight: "50vh",
  color: "#fff",
});
export const Heading = styled("h6")({ margin: 0 });
export const SettingBox = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "auto",
  ".mt-2": {
    marginTop: theme.spacing(1),
  },
  ".mb-2": {
    marginBottom: theme.spacing(1),
  },
}));
export const FlexBetween = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});
export const PostLables = styled("p")({
  margin: "13px 0",
  fontWeight: "300",
  fontSize: "17px",
});
export const PostMessage = styled(PostLables)({
  justifyContent: "space-between",
  width: "100%",
});
export const SelectField = styled(Select)({ width: 150 });
export const SelectMetal = styled(Select)({ width: 200 });
export const ControlLabel = styled(FormControlLabel)({
  color: "white",
});
export const Centered = styled(ButtonGroup)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const PrevButton = styled(Button)({
  background: "#DBA42D",
  borderRadius: "50px",
  padding: "6px 20px",
  color: "#fff",
  "&:hover": { background: "#DBA42D" },
});
const ColorPickerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  alignItems: "end",
  width: "530px",
  background: "#696969",
  borderRadius: theme.spacing(1.5),
}));
const ColorPickerWrapper = styled("div")({
  display: "flex",
  gap: "10px",
  position: "relative",
  maxWidth: "100%",
  alignItems: "center",
  width: "450px",
  overflow: "auto",
});
const SelectBgColor = styled(Box)(({ theme, showColorPicker }) => ({
  minWidth: "45px",
  height: "45px",
  borderRadius: "20%",
  backgroundColor: "white",
  backgroundImage: showColorPicker
    ? "#fff"
    : "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)",
  backgroundSize: "200% 200%",
  cursor: "pointer",
  border: "#e12ecf",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: " background-color 0.2s ease-in-out",
  marginBottom: "10px",
}));
const ColorPickerBox = styled(Box)(({ theme, color, bgColor }) => ({
  width: bgColor === color ? "45px" : "40px",
  height: bgColor === color ? "45px" : "40px",
  borderRadius: "20%",
  background: color || "rgba(150, 85, 255, 0.9)",
  backgroundColor: color || "white",
  backgroundImage: color
    ? "unset"
    : "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)",
  backgroundSize: "200% 200%",
  cursor: "pointer",
  flexShrink: "0",
  marginBottom: "3px",
}));
const ColorPickerPopOver = styled(Popover)({
  marginTop: "-20px",
});
const StyledChevronLeftIcon = styled(ChevronLeftIcon)({
  color: "black",
  fontSize: "30px",
  fontWeight: "bold",
});
const StyledText = styled(Typography)({
  color: "white",
  fontWeight: "bold",
});
const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
const PostTypes = styled(FormGroup)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(0.5, 3),
  borderBottom: `1px solid ${theme.palette.background.dark3}`,
}));

const MobileActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2.5),
  button: {
    width: "100%",
    maxWidth: "calc(50% - 6px)",
    height: "40px",
    fontWeight: 600,
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(0.5),
    flexDirection: "column",
    button: {
      width: "100%",
      maxWidth: "100%",
    },
  },
}));
export {
  ColorPickerContainer,
  ColorPickerBox,
  ColorPickerWrapper,
  ColorPickerPopOver,
  SelectBgColor,
  StyledChevronLeftIcon,
  StyledText,
  Wrapper,
  PostTypes,
  MobileActionButtons,
};
