import { Button, styled, Typography } from "@mui/material";
import { palette } from "@mui/system";
const ShipingContainer = styled("div")(() => ({}));

const Table = styled("table")(({ theme: { palette } }) => ({
  borderCollapse: "separate",
  borderSpacing: "12px 12px",
  position: "relative",
  tr: {
    padding: "0 12px",
  },
  th: {
    padding: "10px",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Outfit",
    fontSize: "16px",
    fontWeight: 400,
  },
  td: {
    borderRadius: "0",
    fontFamily: "Outfit",
    color: "#fff",
    fontWeight: 500,
    fontSize: "14px",
    height: "60px",
    padding: "0px",
    background: palette.background.overlay,
    "&:first-child": {
      borderRadius: "10px",
      width: "148px",
    },
    "&:last-child": {
      textAlign: "left",
      borderRadius: "10px",
      paddingLeft: "24px",
    },
    "&.p-0": {
      padding: "0 !important",
    },
  },
}));
const NoData = styled("p")(() => ({
  fontSize: "16px",
  color: "#fff",
  fontFamily: "Outfit",
  fontWeight: "600",
  textAlign: "center",
}));
const CourierImg = styled("img")(() => ({
  width: "106px",
  height: "42px",
  marginTop: "10px",
}));
const ShippingHeading = styled("p")(() => ({
  fontSize: "16px",
  color: "#fff",
  fontFamily: "Outfit",
  fontWeight: "600",
  paddingTop: "24px",
  textAlign: "center",
}));
const ShippingParaContainer = styled("div")(({ theme: { palette } }) => ({
  background: palette.background.overlay,
  borderRadius: "12px",
}));

const ShippingPara = styled("p")(() => ({
  fontSize: "20px",
  color: "#fff",
  fontFamily: "Outfit",
  fontWeight: "400",
  padding: "12px 24px",
}));
const Error = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  textAlign: "center",
}));
const RefreshBtn = styled(Button)({
  padding: "6px 30px",
  // width:"20%",
  background: "rgba(219, 164, 45, 0.5)",
  color: "white",
  "&:hover": {
    background: "rgba(219, 164, 45, 0.5)",
  },
});
const ErrorWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "center",
});
export {
  Table,
  CourierImg,
  ShippingHeading,
  ShippingPara,
  ShippingParaContainer,
  ShipingContainer,
  Error,
  RefreshBtn,
  ErrorWrapper,
  NoData,
};
