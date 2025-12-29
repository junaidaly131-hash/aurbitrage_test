import { Box, Button, Modal, styled, Typography } from "@mui/material";

const StyledModal = styled(Modal)({
  display: "grid",
  placeItems: "center",
});

const PostTooltip = styled(Box)(({ postImages }) => ({
  padding: "0 20px",
  width: "30%",
  position: "absolute",
  top: postImages && postImages.length > 0 ? "120px" : "250px",
  zIndex: "999",
  background: "#4E4E4E",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const TooltipHeader = styled("h2")(({ theme }) => ({
  margin: "14px 0",
  color: "#fff",
}));

const PostTooltipContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

const NewPostWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "calc(100% - 48px)",
  width: "930px",
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(1.5),
  overflowY: "auto",
  maxHeight: "90%",
  position: "relative",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  gap: theme.spacing(3),
  flexDirection: "column",
  display: "flex",
}));

const NewButton = styled(Button)(({ theme }) => ({
  display: "flex",
  background: "#DBA42D",
  textTransform: "capitalize",
  padding: "9px 20px",
  borderRadius: "12px",
  color: "#000",
  fontWeight: "700",
  "&:hover": { background: "#DBA42D" },
  cursor: "pointer",
  marginTop: "-5px",
}));

const PreviewPostModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PreviewPostWrapper = styled(Box)(({ theme, bg }) => ({
  borderRadius: "20px",
  background: bg === "false" ? theme.palette.background.grey : bg,
  padding: "12px",
  width: "800px",
  margin: "15px 0",
  maxHeight: "90%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 24,
}));
const Title = styled(Typography)({
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "26px",
  // height: "56px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontFamily: "Outfit",
  color: "#fff",
});
const Description = styled("div")(({ bgColor }) => ({
  fontSize: "18px",
  fontWeight: 300,
  lineHeight: "26px",
  fontFamily: "Outfit",
  color: "#fff",
  background: bgColor,
  "*": {
    margin: "unset",
    padding: "unset",
    fontSize: "unset",
  },
  "& blockquote": {
    borderLeft: "4px solid #ccc",
    marginBottom: "5px",
    marginTop: "5px",
    paddingLeft: "16px",
  },
  // Quill size classes
  "& .ql-size-small": {
    fontSize: ".7em",
  },
  "& .ql-size-large": {
    fontSize: "1.5em",
    lineHeight: "36px",
  },
  "& .ql-size-huge": {
    fontSize: "2.5em",
    lineHeight: "54px",
  },
  "& .ql-bold": {
    fontWeight: "bold",
  },
  "& .ql-italic": {
    fontStyle: "italic",
  },
  "& .ql-underline": {
    textDecoration: "underline",
  },
  "& .ql-strike": {
    textDecoration: "line-through",
  },
  "& .ql-list": {
    paddingLeft: "20px",
    "& li": {
      marginBottom: "5px",
    },
  },
  "& a": {
    color: "#DBA42D",
    textDecoration: "underline",
  },
}));

const CreatePostSettingsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

export {
  StyledModal,
  NewButton,
  CreatePostSettingsWrapper,
  PostTooltip,
  TooltipHeader,
  PostTooltipContent,
  NewPostWrapper,
  PreviewPostModal,
  PreviewPostWrapper,
  Title,
  Description,
  Flex,
};
