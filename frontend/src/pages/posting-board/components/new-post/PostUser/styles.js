import { Avatar, Box, styled, Typography } from "@mui/material";
const Profile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  minWidth: "max-content",
}));
const Image = styled(Avatar)(({ theme }) => ({
  height: "52px",
  width: "52px",
  borderRadius: "50%",
  img: {
    objectFit: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: "40px",
    width: "40px",
  },
}));
const UserName = styled(Typography)(({ theme }) => ({
  lineHeight: "100%",
  color: "#fff",
  textAlign: "left",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
}));
const DealerName = styled(Typography)(({ theme }) => ({
  lineHeight: "130%",
  color: theme.palette.background.grey,
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

export { Profile, Image, DealerName, UserName };
