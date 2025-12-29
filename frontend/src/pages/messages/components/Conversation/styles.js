import { Clear } from "@mui/icons-material";
import {
  Box,
  Stack,
  Modal,
  Button,
  styled,
  Typography,
  alpha,
  IconButton,
  Dialog,
  DialogActions,
  Menu,
} from "@mui/material";
const ImagePreviewBox = styled(Box)(({ theme }) => ({
  position: "relative",
  bgcolor: "rgba(0, 0, 0, 0.5)",
  width: "fit-content",
  overflow: "hidden",
  "& .img": {
    maxWidth: "174px",
    maxHeight: "126px",
    minHeight: "106px",
    objectFit: "contain",
    borderRadius: "3px",
  },
  "& .crossIcon": {
    position: "absolute",
    top: "0px",
    right: "0px",
    zIndex: 1,
  },
}));

const ReplyBox = styled(Box)(({ theme, msgType }) => ({
  color: "white",
  borderRadius: "6px",
  position: "relative",
  boxShadow: "0x 0px 5px 0px #0000000D",
  "& .innerBox": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    padding: "6px 12px",
    borderRadius: "12px",
  },

  "& .imagePreview": {
    maxWidth: "50px",
    maxHeight: "50px",
    borderRadius: "8px",
    marginTop: "8px",
  },
}));
const StyledContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  width: "auto",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "6px",
}));

const StyledMessageBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  height: "100%",
  paddingRight: 6,
  "&::-webkit-scrollbar": {
    width: "3px",
  },
  "&::-webkit-scrollbar-track": {
    background: "red",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.gray,
    borderRadius: "10px",
    border: "2px solid transparent",
  },
  "&::-webkit-scrollbar-track-piece": {
    background: theme.palette.background.overlay,
  },
  overflow: "auto",
  minHeight: 0,
  [theme.breakpoints.down("md")]: {
    paddingRight: 0,
    width: "100%",
    maxWidth: "calc(100vw - 3px)",
  },
}));

const StyledInnerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingRight: "28px",
  "& p": {
    display: "inline-block",
    lineBreak: "anywhere",
  },
}));
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
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

const MessageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark4,
  padding: "24px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    padding: "12px 18px",
  },
}));

const SkuLabel = styled(Box)(({ theme }) => ({
  marginBottom: "6px",
  position: "relative",
}));
const SkuHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

const MessageWrapper = styled(Box)(({ theme, isOwnMessage }) => ({
  padding: "12px",
  background: isOwnMessage ? "transparent" : theme.palette.background.overlay,
  borderRadius: isOwnMessage ? "0px 12px 12px 12px" : "12px 0px 12px 12px",
  border: isOwnMessage
    ? `1px solid ${theme.palette.primary.light}`
    : `1px solid ${theme.palette.background.overlay}`,
  boxShadow: isOwnMessage ? "none" : "0px 0px 5px 0px #0000000D",

  display: "flex",
  flexDirection: "column",
  gap: "6px",
}));
const MessageBoxContent = styled(Box)(({ theme, hasSku }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.overlay,
  padding: "12px",
  boxShadow: "0px 0px 5px 0px #0000000D",
  border: `1px solid ${theme.palette.background.dark3}`,
  width: hasSku ? "364px" : "fit-content",
  maxWidth: "100%",
}));
const CloseIcon = styled(Clear)({
  position: "absolute",
  right: "-10px",
  top: "-10px",
  cursor: "pointer",
  height: "16px",
  zIndex: 3,
});
const CloseIconDark = styled(Clear)({
  color: "#000",
  height: "16px",
});
const UserName = styled(Typography)({});
const Padding = styled(Box)(({ theme }) => ({
  marginLeft: "48px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "0px",
  },
}));
const PDFWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "336px",
  borderRadius: "6px",
  overflow: "hidden",
  cursor: "pointer",
}));
const Thumbnail = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "166px",
  position: "relative",
  overflow: "hidden",
}));
const Loader = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#888",
  zIndex: 1,
}));
const DocContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
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
const PdfPreviewWrapper = styled(Box)(({ theme, incoming }) => ({
  backgroundColor: incoming
    ? theme.palette.primary.light
    : theme.palette.background.grey,
  borderRadius: 1,
  padding: 1,
  marginBottom: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));
const CloseBtn = styled(IconButton)({
  position: "absolute",
  right: "-10px",
  top: "0px",
  cursor: "pointer",
  height: "16px",
  zIndex: 3,
});

const SKUBox = styled(Box)(({ theme, incoming }) => ({
  position: "relative",
  padding: theme.spacing(1.5),
  background: incoming ? "transparent" : theme.palette.background.overlay,
  border: `1px solid ${incoming ? theme.palette.background.dark3 : theme.palette.background.overlay}`,
  boxShadow: incoming ? "none" : "0px 0px 5px 0px #0000000D",
  borderRadius: incoming
    ? theme.spacing(0, 1.5, 1.5, 1.5)
    : theme.spacing(1.5, 0, 1.5, 1.5),
}));

/* DELETE CONFIRMATION DIALOG */
const Deletion = styled(Dialog)(({ theme }) => ({
  width: "100%",
  "& .MuiDialog-paper": {
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    margin: theme.spacing(0, 5),
    maxWidth: "418px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1.5, 0),
  },
}));
const DeletionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 500,
  color: "#fff",
  textAlign: "center",
  lineHeight: "24px",
}));
const DeletionContent = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: "#fff",
  textAlign: "center",
}));
const DeletionActions = styled(DialogActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: 0,
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
}));
const EmojiIcon = styled(IconButton)({
  color: "#fff",
  padding: "3px",
  fontSize: "12px",
});
const Options = styled(Menu)(({ theme, direction = "column" }) => ({
  "& .MuiPaper-root": {
    borderRadius: "6px",
  },
  "& .MuiMenu-list": {
    borderRadius: "6px",
    background: theme.palette.background.paper,
    padding: "3px",
    display: "flex",
    flexDirection: direction,
    gap: "6px",
    border: `1px solid ${theme.palette.background.dark3}`,
  },
}));
const TimeStamp = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 500,
  color: "#fff",
  opacity: 0.2,
  textAlign: "center",
  margin: "auto",
}));
const MediaBox = styled(Box)(({ theme, incoming }) => ({
  backgroundColor: incoming ? "transparent" : theme.palette.background.overlay,
  border: `1px solid ${incoming ? theme.palette.background.dark3 : theme.palette.background.overlay}`,
  boxShadow: incoming ? "none" : "0px 0px 5px 0px #0000000D",
  borderRadius: incoming
    ? theme.spacing(0, 1.5, 1.5, 1.5)
    : theme.spacing(1.5, 0, 1.5, 1.5),
  width: "100%",
  maxWidth: "364px",
  overflow: "hidden",
  padding: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));
export {
  StyledContainer,
  StyledMessageBox,
  StyledInnerBox,
  ReplyBox,
  ImagePreviewBox,
  StyledModal,
  StyledPdfBox,
  PdfModalButton,
  PdfRowElements,
  MessageBox,
  SkuLabel,
  SkuHeader,
  MessageWrapper,
  MessageBoxContent,
  CloseIcon,
  UserName,
  Padding,
  PDFWrapper,
  Thumbnail,
  Loader,
  DocContainer,
  ContentWrapper,
  FileName,
  FileDetails,
  PdfPreviewWrapper,
  CloseIconDark,
  CloseBtn,
  SKUBox,
  Deletion,
  DeletionTitle,
  DeletionContent,
  DeletionActions,
  DeleteButton,
  EmojiIcon,
  Options,
  TimeStamp,
  MediaBox,
};
