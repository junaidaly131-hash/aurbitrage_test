import {
  StyledDropdown,
  StyledDiv,
  StyledIconBox,
  DropdownLabel,
  DropdownSelect,
  Required,
  Error,
  Item,
} from "./styles";

export const Dropdown = ({
  label,
  options,
  placeholder,
  Icon,
  value,
  onChange,
  name,
  errors,
  required,
  ...props
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <StyledDiv>
      <DropdownLabel>
        {label} {required ? <Required>*</Required> : ""}
      </DropdownLabel>
      <StyledDropdown>
        <StyledIconBox>
          <Icon />
        </StyledIconBox>
        <DropdownSelect
          value={value ? `${value}` : ""}
          onChange={(e) => {
            onChange(e);
          }}
          displayEmpty={true}
          error={!!errors[name]}
          MenuProps={MenuProps}
          {...props}
        >
          <Item disabled value="">
            <em>{placeholder}</em>
          </Item>
          {options.map((option, index) => (
            <Item key={index} value={option.value}>
              {option.label}
            </Item>
          ))}
        </DropdownSelect>
      </StyledDropdown>
      {errors[name] && <Error>{errors[name].message}</Error>}
    </StyledDiv>
  );
};
