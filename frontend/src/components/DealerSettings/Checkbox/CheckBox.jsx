import { FormControlLabel } from "@mui/material";
import { StyledCheckbox, StyledLabel, StyledImg } from "./styles";

export const CheckBox = ({ label, icon, onChange, checked, ...rest }) => {
  return (
    <FormControlLabel
      {...rest}
      control={<StyledCheckbox onChange={onChange} checked={checked} />}
      label={
        <StyledLabel>
          {icon && <StyledImg src={icon} alt="icon" />}
          {label}
        </StyledLabel>
      }
      labelPlacement="start"
    />
  );
};
