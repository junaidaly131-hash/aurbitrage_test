import { useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Wrapper,
  Label,
  DropdownMenu,
  DropdownItem,
  SearchContainer,
} from "./styles";

const FilterDropdown = ({
  options = [],
  value = [],
  placeholder = "Filter",
  onChange,
  showIcon = true,
  multiSelect = false,
  enableSearch = true,
  disabled = false,
  startIcon = null,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm("");
  };

  const handleSelect = (option) => {
    if (multiSelect) {
      const newValue = value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option];
      onChange?.(newValue);
    } else {
      onChange?.(option);
      handleClose();
    }
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }, [options, searchTerm]);

  const displayLabel = useMemo(() => {
    if (multiSelect) {
      return value.length > 0 ? `${value.length} selected` : placeholder;
    }
    return value || placeholder;
  }, [value, placeholder, multiSelect]);

  const hasValue = multiSelect ? value.length > 0 : Boolean(value);
  const showSearchBar = enableSearch && options.length > 5 && open;

  return (
    <Wrapper>
      <button
        className={`dropdown-button ${hasValue ? "active" : ""}`}
        aria-controls={open ? "filter-dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={disabled || !options.length}
      >
        {startIcon && <span style={{ marginRight: "6px", display: "flex", alignItems: "center" }}>{startIcon}</span>}
        <Label>{displayLabel}</Label>
        <ArrowDropDown 
          sx={{
            color: "primary.main",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }} 
          className="dropdown-icon" 
        />

      </button>
      <DropdownMenu
        id="filter-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-dropdown-menu",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {showSearchBar && (
          <SearchContainer
            onKeyDown={(e) => e.stopPropagation()}
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <TextField
              size="small"
              placeholder="Search posts"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputLabelProps={{ sx: { color: "white" } }}
              InputProps={{
                sx: {
                  color: "white",
                  fontSize: "12px",
                },
              }}
            />
          </SearchContainer>
        )}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => {
            const isSelected = multiSelect
              ? value.includes(option)
              : value === option;
            return (
              <DropdownItem
                key={option}
                active={isSelected}
                onClick={() => handleSelect(option)}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                  disableRipple
                  size="small"
                  sx={(theme) => ({
                    color: theme.palette.secondary.main,
                    p: 0,
                    mr: 1,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.gold || theme.palette.secondary.main,
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  })}
                />
                {option}
              </DropdownItem>
            );
          })
        ) : (
          <DropdownItem disabled>No options found</DropdownItem>
        )}
      </DropdownMenu>
    </Wrapper>
  );
};

export default FilterDropdown;
