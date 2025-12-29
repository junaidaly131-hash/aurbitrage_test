import EmojiIcon from "@/components/Icons/EmojiIcon";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";

const StyledCard = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "unset",
  position: "relative",
  boxShadow: "none",
  marginTop: theme.spacing(2.5),
  "& .MuiCardContent-root": {
    padding: "0px",
  },

  "& .circularBar": {
    height: "1em",
    width: "1em",
    marginLeft: "5px",
  },
}));

const Loader = styled("div")({
  marginLeft: "50%",
  marginBottom: "20px",
});
const Progress = styled(CircularProgress)({
  height: "20px",
  width: "20px",
});
const Heading = styled(Box)({
  fontSize: "24px",
  fontFamily: "Outfit",
  fontWeight: "600",
  color: "#fff",
});
const CommentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  position: "relative",
  width: "100%",
}));

const SendButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0, 3),
  fontWeight: "400",
  textTransform: "capitalize",
  flexShrink: 0,
}));

const CommentReply = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "0px",
});
const ReplyTo = styled(Box)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "500",
  color: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "& svg": {
    cursor: "pointer",
    color: theme.palette.danger.main,
  },
}));

const CommentInfo = styled(Box)(({ theme }) => ({
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

const ContentWrapper = styled(CardContent)({
  padding: "0px",
  display: "flex",
  gap: "12px",
  flexDirection: "column",
  position: "relative",
  "&:last-child": {
    paddingBottom: 0,
  },
});

const ViewMore = styled(Box)({
  fontWeight: "400",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  color: "#fff",
});

const InputBox = styled(Box)(({ theme: { palette } }) => ({
  flex: 1,
  position: "relative",
  width: "100%",
}));

const StyledInput = styled(TextField)(({ theme: { palette } }) => ({
  outline: "none",
  border: "1px solid #222",
  borderRadius: "50px",
  ".MuiOutlinedInput-root": {
    borderRadius: "50px",
    background: `${palette.background.gray} !important`,
  },
  "& .MuiInputBase-input": {
    borderRadius: "50px",
    background: `${palette.background.gray} !important`,
    height: "40px",
    padding: "0 16px",
    color: "white",
    zIndex: "1000",
    fontSize: "16px",
    border: "none",
    outline: "none",
    display: "block",
    "&::placeholder": {
      color: palette.background.card,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0 !important",
  },
}));

const EmojiButton = styled(EmojiIcon)(({ theme: { palette } }) => ({
  cursor: "pointer",
  position: "absolute",
  right: "12px",
  color: "#fff",
  height: "32px",
  width: "32px",
  zIndex: 1,
  "&:hover": {
    color: palette.secondary.main,
  },
}));

const EmojiPickerWrapper = styled(Box)(({ openPicker }) => ({
  display: openPicker ? "inline" : "none",
  zIndex: 10,
  position: "fixed",
  bottom: 150,
  right: 100,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export {
  StyledCard,
  Loader,
  Progress,
  Heading,
  CommentBox,
  SendButton,
  CommentReply,
  ReplyTo,
  CommentInfo,
  ContentWrapper,
  ViewMore,
  InputBox,
  StyledInput,
  EmojiButton,
  EmojiPickerWrapper,
  ActionButtons,
};
