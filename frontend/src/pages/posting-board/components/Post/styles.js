import {
  Card,
  Box,
  Typography,
  styled,
  IconButton,
  Avatar,
} from "@mui/material";

const StyledCard = styled(Box)(({ theme }) => ({
  boxShadow: "none",
  "& .arrowDown": {
    fontSize: "14px",
    color: theme.palette.secondary.main,
  },
  "& .repliesHeading": {
    fontSize: "0.8em",
    marginLeft: "15px",
    color: theme.palette.secondary.main,
  },
  "& .margin": {
    marginLeft: "20px",
  },
}));

const EditBox = styled(Box)(({ Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& .inputStyleEdit": {
    background: "#292929",
    border: "none",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
    "::placeholder": {
      color: "#fff",
    },
    padding: "13px 20px",
    borderRadius: "50px",
    display: "block",
    width: "95%",
  },

  "& .editButtonStyle": {
    background: "#DBA42D",
    borderRadius: "50px",
    padding: "9px 30px",
    color: "#000",
    margin: "15px 0",
    "&:hover": { background: "#DBA42D" },
    textTransform: "capitalize",
    fontWeight: "700",
  },
}));

export const IconBox = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "10px",
  fontFamily: "Outfit",
  fontWeight: "400",
  cursor: "pointer",
  color: "#fff",
  borderRadius: 0,
  textDecoration: "underline",
  padding: 0,
  svg: {
    height: "14px",
    width: "14px",
  },
  ".active": {
    color: theme.palette.secondary.main,
  },
}));
export const CommentActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
}));

const CommentCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.dark4,
  color: "#fff",
  boxShadow: "none",
  borderRadius: "6px !important",
  overflow: "visible",
  "&.childComment": {
    marginLeft: theme.spacing(1.5),
    // background: theme.palette.background.dark,
    marginTop: theme.spacing(1),
    width: "calc(100% - 12px)",
  },

  "& .mainBox": {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    mx: 2,
    width: "100%",
  },

  "& .replyIcon": {
    marginRight: "-15px",
  },
  "& .chatIcon": {
    marginLeft: "10px",
    cursor: "pointer",
  },
  "& .commentText": {
    fontWeight: "500",
    fontSize: "12px",
    width: "95%",
  },

  "& .circularBar": {
    height: "1em",
    width: "1em",
    marginLeft: "5px",
  },
}));
export const UserName = styled(Typography)(({ theme }) => ({
  margin: "0px",
  color: "#fff",
  lineHeight: "1",
  span: {
    color: theme.palette.secondary.main,
  },
}));
export const DealerName = styled(Typography)(({ theme }) => ({
  margin: "0px",
  color: theme.palette.secondary.main,
  fontFamily: "Outfit",
  fontSize: "12px",
  fontWeight: "400",
}));
export const Header = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "12px",
  width: "100%",
  padding: "12px",
  position: "relative",
});
export const CommentText = styled(Typography)({
  fontFamily: "Outfit",
  fontSize: "16px",
  fontWeight: "300",
});
export const CommentUser = styled(CommentText)({
  fontWeight: "500",
  "&.small": {
    fontSize: "12px",
  },
});
export const CommentDate = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  fontWeight: "400",
  color: theme.palette.background.grey,
  textAlign: "left",
  marginTop: "0 !important",
  lineHeight: "1",
}));
export const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: theme.spacing(1.5),
  "&.childComment": {
    gap: 0,
  },
}));
export const Timeline = styled("div")(({ theme }) => ({
  height: "calc(40px)",
  width: "8px",
  position: "absolute",
  top: "calc(100%)",
  left: "4px",
  borderLeft: `2px solid ${theme.palette.warning.light}`,
  borderBottom: `2px solid ${theme.palette.warning.light}`,
  borderBottomLeftRadius: "8px",
  "&.childComment": {
    left: "-8px",
    top: "26px",
    height: "calc(100% + 40px)",
  },
}));
export const CommentReplies = styled(Box)({});
export const RepliesHeading = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
  color: theme.palette.secondary.main,
  padding: theme.spacing(0, 1.5, 1.5, 1.5),
  cursor: "pointer",
  marginLeft: theme.spacing(0),
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  alignItems: "center",
}));
const DealerInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));
const Profile = styled(Avatar)({
  height: 32,
  width: 32,
  objectFit: "contain",
  shrink: 0,
});

export { StyledCard, EditBox, CommentCard, ProfileInfo, Profile, DealerInfo };
