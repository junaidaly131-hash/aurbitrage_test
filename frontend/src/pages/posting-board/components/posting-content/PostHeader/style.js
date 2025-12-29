import { Avatar, Box, Button, Typography, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, hidden }) => ({
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  color: "#fff",
  position: "relative",
  borderRadius: theme.spacing(1.5),
  gap: theme.spacing(1),
  ...(hidden && {
    [theme.breakpoints.up(hidden)]: {
      display: "none",
      transition: "all 0.3s ease",
    },
  }),
}));

const MediaCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 32px)",
    justifyContent: "space-between",
  },
}));
const ActionCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
const DateCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  whiteSpace: "nowrap",
  gap: "4px",
  fontSize: "12px",
  color: theme.palette.background.grey,
  span: {
    fontSize: "10px",
  },
}));

const StyledButton = styled(Button)(({ theme, post, hidden }) => ({
  border: `1px solid ${
    post?.postType === "Sell"
      ? "#43A047"
      : post?.postType === "Buy"
        ? "#2196F3"
        : post?.postType === "Bulletin"
          ? "#FFCA28"
          : post?.postType === "Question"
            ? "#78909C"
            : post?.postType === "Automated"
              ? "#009688"
              : ""
  }`,
  color:
    post?.postType === "Sell"
      ? "#43A047"
      : post?.postType === "Buy"
        ? "#2196F3"
        : post?.postType === "Bulletin"
          ? "#FFCA28"
          : post?.postType === "Question"
            ? "#78909C"
            : post?.postType === "Automated"
              ? "#009688"
              : "",
  "&:hover": {
    borderColor: `${
      post?.postType === "Sell"
        ? "#43A047"
        : post?.postType === "Buy"
          ? "#2196F3"
          : post?.postType === "Bulletin"
            ? "#FFCA28"
            : post?.postType === "Question"
              ? "#78909C"
              : post?.postType === "Automated"
                ? "#009688"
                : ""
    }`,
  },
  padding: "8px 15px",
  fontSize: "14px",
  fontWeight: "500",
  textTransform: "none",
  height: "36px !important",
  width: "100%",
  ...(hidden && {
    width: "auto",
    [theme.breakpoints.down(hidden)]: {
      display: "none",
      transition: "all 0.3s ease",
    },
  }),
}));
const ContactCard = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0px",
  left: "0px",
  zIndex: "999",
  paddingTop: "80px",
  [theme.breakpoints.down("md")]: {
    right: "22px",
    left: 0,
    margin: "0 auto",
  },
}));
const ContactWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.dark,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  gap: theme.spacing(1),
  width: "360px",
  maxWidth: "100%",
  [theme.breakpoints.down("md")]: {
    marginLeft: "auto",
  },
}));
const ContactCardContainer = styled(Box)(({ theme }) => ({}));
const ContactHeading = styled(Typography)(({ theme }) => ({
  textAlign: "center",
}));
const Contact = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  fontFamily: "Outfit",
  fontSize: "16px",
  fontWeight: "400",
  ".icon": {
    height: "18px",
  },
  ".email": {
    width: "22px",
  },
  span: {
    width: "calc(100% - 100px)",
  },
}));
const Wrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
}));
const UpdatedAt = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 400,
  color: theme.palette.background.grey,
  textAlign: "left",
}));

const ProfileWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  alignItems: "center",
}));

const DealerName = styled(Typography)(({ theme }) => ({
  color: "#fff",
  textAlign: "left",
  span: {
    color: theme.palette.secondary.main,
  },
}));
const Profile = styled(Avatar)({
  height: 52,
  width: 52,
  objectFit: "contain",
  shrink: 0,
});
const DealerInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export {
  StyledBox,
  StyledButton,
  MediaCard,
  ActionCard,
  DateCard,
  ContactCard,
  ContactWrapper,
  ContactCardContainer,
  ContactHeading,
  Contact,
  Wrapper,
  UpdatedAt,
  ProfileWrapper,
  DealerName,
  Profile,
  DealerInfo,
};
