import { Grid, Chip, Box, Typography, styled } from "@mui/material";

const StyledChip = styled(Chip)(({ theme: { palette } }) => ({
  fontSize: "12px",
  padding: "5px",
  color: palette.secondary.main,
  backgroundColor: "transparent",
  borderColor: palette.secondary.main,
  borderWidth: "1px",
  borderStyle: "solid",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "6px",
  padding: theme.spacing(2.5),
  width: "100%",
  margin: "15px 0",
}));
const PostCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "10px",
  width: "calc(100% - 12px)",
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  "&:nth-child(1)": {
    marginTop: "8px",
  },
  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 32px)",
    margin: "0 auto",
  },
}));
const PostScreen = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const Title = styled(Typography)({
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "26px",
  maxHeight: "56px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#fff",
  textAlign: "left",
});
const Description = styled("div")(({ theme: { palette } }) => ({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "26px",
  position: " relative",
  zIndex: 1,
  textAlign: "left",
  color: "#fff",
  "&.line-clamp": {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    transition: "max-height 0.3s ease",
  },
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
    color: palette.secondary.main,
    textDecoration: "underline",
  },
}));
const FakeDesc = styled(Description)({
  zIndex: 0,
  position: "absolute",
  opacity: "0",
  width: "100%",
});
const DescBox = styled(Box)({
  position: "relative",
});
const PostStatus = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  borderRadius: "12px",
  background: palette.secondary.main,
  padding: "2px 8px",
  color: "#020202",
  fontSize: "14px",
  fontWeight: 500,
}));
const ShowMore = styled("button")(({ theme: { palette } }) => ({
  color: palette.secondary.main,
  fontSize: "16px",
  background: "none",
  maxWidth: "fit-content",
  textAlign: "left",
  outline: "none",
  boxShadow: "none",
  padding: 0,
  border: 0,
  position: " relative",
  zIndex: 1,
  borderBottom: `1px solid transparent`,
  "&:hover": {
    borderBottom: `1px solid ${palette.secondary.main}`,
  },
}));

export {
  StyledChip,
  StyledGrid,
  FakeDesc,
  PostStatus,
  Description,
  Title,
  PostCard,
  ShowMore,
  DescBox,
  PostScreen,
};
