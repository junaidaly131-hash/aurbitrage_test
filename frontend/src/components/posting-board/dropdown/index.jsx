import { useEffect, useCallback, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import YellowTick from "../../../assets/images/yellow-tick.svg";
import {
  DropdownWrapper,
  DropdownTrigger,
  CaretIconWrapper,
  DropdownContainer,
  OptionItem,
  TickImage,
} from "./styles";

export const Dropdown = ({
  newpost,
  dropdown,
  setDropdown,
  value,
  setValue,
  options,
}) => {
  const dropdownRef = useRef(null);

  const handleDropdownClick = useCallback(
    (value) => {
      setDropdown(value);
    },
    [setDropdown],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleDropdownClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDropdownClick]);

  const handleOptionClick = (option) => {
    setValue(option);
    setDropdown(false);
  };

  return (
    <>
      <DropdownWrapper ref={dropdownRef}>
        <DropdownTrigger
          onClick={() => handleDropdownClick(!dropdown)}
          newpost={newpost}
        >
          {value}
          {newpost ? (
            <CaretIconWrapper>
              <FontAwesomeIcon icon={faCaretDown} size={"sm"} />
            </CaretIconWrapper>
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </DropdownTrigger>
        {dropdown && (
          <DropdownContainer>
            {options.map((elem, index) => (
              <OptionItem
                key={index}
                onClick={() => handleOptionClick(elem)}
                isSelected={value === elem}
              >
                {elem}
                {value === elem && <TickImage src={YellowTick} alt="icon" />}
              </OptionItem>
            ))}
          </DropdownContainer>
        )}
      </DropdownWrapper>
    </>
  );
};
