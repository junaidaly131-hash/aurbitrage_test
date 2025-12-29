import { useState, useEffect, useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  ClearButton,
  Wrapper,
  Label,
  DropdownMenu,
  DropdownItem,
} from "./styles";
import { ArrowDropDown } from "@mui/icons-material";

export const FilterGroup = ({
  options = [],
  filters = [],
  title,
  onChange,
  showSelected,
  multiSelect = true,
}) => {
  const [state, setState] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const newState = options.reduce((acc, option) => {
      acc[option] = filters.includes(option);
      return acc;
    }, {});
    setState(newState);
  }, [options, filters]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toggle = (option) => {
    setState((prevState) => {
      const newState = { ...prevState, [option]: !prevState[option] };
      if (onChange) {
        onChange(Object.keys(newState).filter((key) => newState[key]));
      }
      return newState;
    });
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const showSearchBar = options.length > 10 && open;

  const filteredItems = useMemo(() => {
    const filteredOptions = options.filter((option) =>
      option?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

    return filteredOptions
      .sort((a, b) => {
        const aSelected = state[a] ? -1 : 1;
        const bSelected = state[b] ? -1 : 1;
        return aSelected - bSelected;
      })
      .filter((item, index, self) => self.indexOf(item) === index);
  }, [options, state, searchTerm]);

  const renderClearButton = () =>
    filters.length > 0 && (
      <ClearButton
        fontSize={"small"}
        onClick={(e) => {
          e.stopPropagation();
          onChange([]);
        }}
      />
    );

  return (
    <Wrapper>
      <button
        className={`dropdown-button ${Object.values(state).some((val) => val) ? "active" : ""}`}
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={!options.length}
      >
        {!title && <FontAwesomeIcon icon={faFilter} />}
        &nbsp;<Label>{title || "Filters"}</Label>&nbsp;
        <ArrowDropDown className="dropdown-icon" />
        {renderClearButton()}
      </button>
      <DropdownMenu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-menu",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {showSearchBar && (
          <DropdownItem
            onKeyDown={(e) => e.stopPropagation()}
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <TextField
              size="small"
              id={`dealer-search-input`}
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputLabelProps={{ sx: { color: "white" } }}
              InputProps={{
                sx: {
                  color: "white",
                },
              }}
            />
          </DropdownItem>
        )}
        {filteredItems.map((option) => (
          <DropdownItem key={option} onClick={() => toggle(option)}>
            {multiSelect && (
              <Checkbox
                color="secondary"
                checked={state[option]}
                size="small"
                sx={{
                  color: "inherit",
                  padding: "0 0.5em 0 0.5em",
                }}
              />
            )}
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
      {showSelected && (
        <div>
          {filters.map((option) => (
            <button
              key={option}
              value={option}
              className="selectedFilter"
              onClick={() => toggle(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </Wrapper>
  );
};
