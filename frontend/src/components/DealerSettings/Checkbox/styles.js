import { Checkbox, styled } from "@mui/material";

const StyledCheckbox = styled(Checkbox)({
  color: "#dba42d",
  "&.Mui-checked": {
    color: "#dba42d",
  },
});

const StyledLabel = styled("span")({
  color: "#ffffff",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  fontFamily: "Outfit",
});

const StyledImg = styled("img")({
  width: "20px",
  marginRight: "12px",
});
export { StyledCheckbox, StyledLabel, StyledImg };
