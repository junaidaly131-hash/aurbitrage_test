import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  styled,
  Typography,
} from "@mui/material";
import { palette } from "@mui/system";

const Profile = styled(Avatar)(({ theme: { palette } }) => ({
  position: "absolute",
  left: "24px",
  bottom: "-36px",
  borderRadius: "50%",
  height: "96px",
  width: "96px",
  border: `2px solid #fff`,
  background: palette.background.paper,
}));

const StyledButton = styled(Button)`
  margin: 10px;
  background-color: #3f51b5;
  color: white;

  &:hover {
    background-color: #303f9f;
  }
`;
const Title = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: "#fff",
  b: {
    fontFamily: "Outfit",
    fontSize: "36px",
  },
}));
const InfoWrapper = styled(Box)(({ theme: { palette } }) => ({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  borderBottom: "1px solid #DEDEDE",
}));
const SocialLinks = styled(Box)(
  ({ theme: { palette }, gap = "18px", align }) => ({
    display: "flex",
    gap: gap,
    justifyContent: align,
  }),
);
const SocialLink = styled("a")(({ theme: { palette } }) => ({
  height: "24px",
  width: "24px",
  cursor: "pointer",
  color: "#fff",
}));
const SocialIcon = styled("img")(({ theme: { palette } }) => ({
  height: "24px",
  width: "24px",
}));

const Contacts = styled(Box)({
  display: "flex",
  gap: "24px",
});
const Contact = styled(Box)({
  display: "flex",
  gap: "6px",
  fontFamily: "Outfit",
  fontWeight: 500,
  fontSize: "14px",
  color: "#fff",
});
const Group = styled(Box)({
  display: "flex",
  gap: "24px",
});
const GroupLabel = styled(Typography)({
  fontFamily: "Outfit",
  fontSize: "14px",
  color: "#fff",
  fontWeight: 500,
  width: "172px",
});
const GroupInfo = styled(Box)({
  display: "flex",
  gap: "24px",
  color: "#fff",
});
const GroupItem = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "Inter",
  fontStyle: "italic",
  color: "#fff",
  svg: {
    color: palette.secondary.main,
  },
}));
const Logo = styled("img")({
  height: "24px",
});
const SeeAll = styled(ButtonBase)(({ theme: { palette } }) => ({
  height: "32px",
  borderRadius: "6px",
  fontFamily: "Outif",
  fontSize: "12px",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "absolute",
  bottom: "18px",
  right: "96px",
  background: palette.secondary.dark,
  color: "#fff",
  textTransform: "capitalize",
}));
const StyledHeader = styled(Box)(({ theme: { palette, spacing }, bg }) => ({
  background: palette.background.gray,
  height: "180px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: spacing(1.5),
  position: "relative",
  marginBottom: "14px",
}));
const Image = styled("img")({
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "cover",
  flex: 1,
  // width: "100%",
  // height: "100%",
  // display: "inline-block",
});
const ImagesWrapper = styled(Box)(({ theme: { spacing } }) => ({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  borderRadius: spacing(1.5),
  display: "flex",
  // filter: "grayscale(70%)",
}));
const Error = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  textAlign: "center",
}));
const Loader = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  gap: "24px",
}));

export {
  StyledHeader,
  StyledButton,
  Profile,
  Title,
  SocialLinks,
  SocialLink,
  SocialIcon,
  InfoWrapper,
  Contacts,
  Contact,
  GroupInfo,
  Group,
  GroupLabel,
  GroupItem,
  Logo,
  SeeAll,
  Image,
  ImagesWrapper,
  Error,
  Loader,
};
