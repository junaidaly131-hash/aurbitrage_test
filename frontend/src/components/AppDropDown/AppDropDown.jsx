import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { DropdownItem, DropdownMenu, Wrapper, Label } from "./styles";

const AppDropDown = ({
  value,
  options,
  placeholder,
  handleSelect,
  id,
  closeOnSelect = true,
}) => {
  const [open, setOpen] = useState(null);
  const handleOpen = (e) => {
    setOpen(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const selectedOption = options.find((opt) => opt.value === value);
  const valueLabel = selectedOption?.label;
  return (
    <Wrapper>
      <button
        className="dropdown-button"
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        <Label>{valueLabel || placeholder}</Label>
        <ArrowDropDown className="dropdown-icon" />
      </button>
      <DropdownMenu
        id="display-price-menu"
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {options.map((opt) => {
          const active = value === opt.value;

          return (
            <DropdownItem
              active={active}
              key={opt.value}
              onClick={() => {
                handleSelect(opt);
                if (closeOnSelect) {
                  handleClose();
                }
              }}
            >
              {opt.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Wrapper>
  );
};

export default AppDropDown;
