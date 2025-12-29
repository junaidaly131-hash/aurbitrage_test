import React, { useState, useMemo } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Fuse from "fuse.js";
import {
  StyledAutocomplete,
  StyledInputAdornmentStart,
  StyledInputAdornmentEnd,
  StyledIconButton,
  StyledTextField,
} from "./styles";

const SearchBar = ({ setSearchInput, searchInput, options = [], width }) => {
  const [value, setValue] = useState(searchInput || "");
  const [open, setOpen] = useState(false);

  const fuse = useMemo(() => {
    const fuseOptions = {
      keys: ["name", "dealer"],
      threshold: 0.3,
    };
    return new Fuse(options, fuseOptions);
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!value.trim()) return options;

    return fuse.search(value).map((result) => result.item);
  }, [value, options, fuse]);

  const handleChange = (event, newValue) => {
    setValue(newValue || "");
    setSearchInput(newValue || "");
  };

  const handleInputChange = (event, newInputValue) => {
    setValue(newInputValue);
    if (!newInputValue) {
      setSearchInput("");
    }
  };

  const handleClear = () => {
    setValue("");
    setSearchInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchInput(value);
      setOpen(false);
    }
  };
  const getOptions = (options) => {
    const optionsIdx = {};
    options.forEach((option) => {
      optionsIdx[option.name] = "";
      optionsIdx[option.dealer] = "";
    });
    return Object.keys(optionsIdx);
  };

  const separatedOptions = getOptions(filteredOptions);

  return (
    <StyledAutocomplete
      size="small"
      freeSolo
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={separatedOptions}
      getOptionLabel={(option) => option}
      componentsProps={{
        paper: { sx: { textAlign: "left", color: "#fff" } },
      }}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          variant="standard"
          placeholder="Search by Name or Dealer"
          onKeyDown={handleKeyDown}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <StyledInputAdornmentStart position="start">
                <SearchIcon />
              </StyledInputAdornmentStart>
            ),
            endAdornment: (
              <StyledInputAdornmentEnd position="end">
                <StyledIconButton
                  aria-label="clear search"
                  onClick={handleClear}
                  edge="end"
                >
                  <ClearIcon />
                </StyledIconButton>
              </StyledInputAdornmentEnd>
            ),
          }}
        />
      )}
      width={width}
    />
  );
};

export default SearchBar;
