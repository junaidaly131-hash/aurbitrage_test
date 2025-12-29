import { Button, styled, Typography } from "@mui/material";

const Table = styled("table")(({ theme: { palette } }) => ({
  borderCollapse: "separate",
  borderSpacing: "0 12px",
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
    padding: "12px",
    paddingTop: "20px",
    paddingBottom: "20px",
    background: palette.background.overlay,
    "&:first-child": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      paddingLeft: "38px",
      textAlign: "left",
    },
    "&:last-child": {
      paddingRight: "24px",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      textAlign: "center",
    },
  },
}));
const AddressNumber = styled("span")(() => ({
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  fontFamily: "Outfit",
}));
const Error = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.danger.main,
  fontSize: "18px",
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
export { Table, AddressNumber, Error, RefreshBtn, ErrorWrapper };
