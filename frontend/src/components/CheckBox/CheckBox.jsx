import {
  StyledCheckBoxContainer,
  StyledCheckBoxWrapper,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckIcon,
  StyledLabel,
} from "./styles";

const CheckBox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error = false,
  name,
  value,
  id,
  className,
  labelPlacement = "right",
  size = "medium",
  ...rest
}) => {
  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event);
    }
  };

  const checkboxId =
    id || `checkbox-${name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <StyledCheckBoxContainer
      className={className}
      disabled={disabled}
      labelPlacement={labelPlacement}
      {...rest}
    >
      <StyledCheckBoxWrapper>
        <StyledCheckBoxInput
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-label={label || "checkbox"}
        />
        <StyledCheckBoxBox
          checked={checked}
          disabled={disabled}
          error={error}
          size={size}
        >
          <StyledCheckIcon checked={checked} size={size}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </StyledCheckIcon>
        </StyledCheckBoxBox>
      </StyledCheckBoxWrapper>
      {label && (
        <StyledLabel htmlFor={checkboxId} disabled={disabled} error={error}>
          {label}
        </StyledLabel>
      )}
    </StyledCheckBoxContainer>
  );
};

export default CheckBox;
