import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledGrid = styled(Box)(({ theme }) => ({
  color: "#fff",
  "& .contactCard": {
    padding: "0 20px",
    width: "70%",
    position: "absolute",
    top: "0px",
    zIndex: "999",
    background: "#4E4E4E",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .contactHeading": {
    margin: "14px 0",
  },
  "& .contactPhoneNo": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  "& .flexCenter": {
    display: "flex",
    alignItems: "center",
  },

  "& .copyIcon": {
    marginRight: "20px",
    cursor: "pointer",
  },

  "& .emailText": {
    marginRight: "10px",
    fontSize: "13px",
  },
  "& .contactEmail": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));
export const PostImage = styled(Box)({
  position: "relative",
  height: "100%",
});
export const PostText = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  p: {
    margin: theme.spacing(0, 0, 0.5, 0),
  },
}));
export const PostTitle = styled("h5")(({ theme }) => ({
  margin: theme.spacing(2, 0, 1.5, 0),
}));

export { StyledGrid };
