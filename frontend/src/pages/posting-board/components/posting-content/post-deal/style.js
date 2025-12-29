import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  background: "#191919",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",

  "& .mainBox": {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flexWrap: "wrap",
  },
  "& .chipStyle": {
    fontSize: "12px",
    padding: "5px",
    color: "#DBA42D",
    backgroundColor: "transparent",
    borderColor: "#DBA42D",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  "& .metalPriceBox": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export { StyledBox };
