import { Close } from "@mui/icons-material";
import { StyledChip } from "./styles";

const Chip = ({ label, onDelete, rounded = false, ...props }) => {
  return (
    <StyledChip {...props} rounded={rounded} onClick={onDelete}>
      <span>{label}</span>
      {onDelete && <Close sx={{ fontSize: "16px" }} />}
    </StyledChip>
  );
};

export default Chip;
