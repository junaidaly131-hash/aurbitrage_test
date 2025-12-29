import React, { useState, useMemo, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { List, IconButton, InputAdornment } from "@mui/material";
import Fuse from "fuse.js";
import { v4 as uuid } from "uuid";

export const SearchBar = ({
  setSearchInput,
  searchInput,
  options = [],
  width,
  label,
  isUser,
  isDealer,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(searchInput || "");
  const [open, setOpen] = useState(false);
  const [id] = useState(uuid());

  const fuse = useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      threshold: 0.3,
      keys: isDealer
        ? ["dealerName"]
        : isUser
          ? ["email", "firstName"]
          : ["sku", "keywords"],
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
    };
    return new Fuse(options, fuseOptions);
  }, [options]);

  const filterOptions = useMemo(
    () =>
      (options, { inputValue }) => {
        if (isDealer) {
          return fuse
            .search(inputValue)
            .map((result) => result.item.dealerName);
        } else {
          if (isUser) {
            return fuse
              .search(inputValue)
              .map((result) => result.item.firstName);
          } else {
            return fuse.search(inputValue).map((result) => result.item.sku);
          }
        }
      },
    [fuse, isUser, isDealer],
  );

  const handleChange = (e, v) => {
    setValue(v);
    setSearchInput(v || "");
  };

  const handleInputChange = (e, v) => {
    setValue(v);
    if (!v) {
      setSearchInput("");
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      setOpen(false);
      setSearchInput(value);
    }
  };

  const handleInputClick = () => {
    setOpen(false);
    setSearchInput(value);
  };
  const handleClear = () => {
    setValue("");
    setSearchInput("");
  };
  const defaultStyles = {
    width: width || "300px",
    // margin: "auto",
    background: "transparent",
    outline: "none",
    padding: "10px",
    borderRadius: "15px",
    color: "#fff",
    border: "none",
  };

  return (
    <Autocomplete
      id={id}
      size="small"
      freeSolo
      disablePortal
      disableClearable={true}
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={handleChange}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}
      options={
        isDealer
          ? options.map((option) => option.dealerName)
          : isUser
            ? options.map((option) => option.firstName)
            : options.map((option) => option.sku)
      }
      componentsProps={{ paper: { sx: { textAlign: "left", color: "#fff" } } }}
      style={defaultStyles}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          sx={{
            input: { color: "#fff" },
            "& .MuiAutocomplete-hasClearIcon": { display: "none" },
          }}
          onKeyDown={handleEnterPress}
          placeholder={label || "Search SKU"}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <div
                style={{
                  cursor: "pointer",
                  color: "white",
                  marginRight: "10px",
                  display: "flex",
                }}
                onClick={handleInputClick}
              >
                <FontAwesomeIcon icon={faSearch} color="white" />
              </div>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={handleClear}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            ),
          }}
        />
      )}
    />
  );
};
