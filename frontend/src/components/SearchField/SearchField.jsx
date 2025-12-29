import React from "react";
import { Input, Search } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IconButton, InputAdornment } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";

const SearchField = ({
  maxWidth,
  onChange,
  onInputChange,
  options,
  id,
  value,
  open,
  setOpen,
  isDealer,
  isUser,
  handleEnterPress,
  handleInputClick,
  handleClear,
  label,
  styles,
  filterOptions,
  ...props
}) => {
  const defaultStyles = {
    background: "#212223",
    outline: "none",
    borderRadius: "12px",
    color: "#fff",
    border: "none",
  };
  return (
    <Search
      id={id}
      size="small"
      maxWidth={maxWidth}
      freeSolo
      disablePortal
      disableClearable={true}
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={onChange}
      onInputChange={onInputChange}
      filterOptions={filterOptions}
      style={styles || defaultStyles}
      options={
        isDealer
          ? options.map((option) => option.dealerName)
          : isUser
            ? options.map((option) => option.firstName)
            : options.map((option) => option.sku)
      }
      componentsProps={{ paper: { sx: { textAlign: "left", color: "#fff" } } }}
      renderInput={(params) => (
        <Input
          {...params}
          variant="standard"
          sx={{
            input: {
              color: "#fff",
              padding: "0px 18px",
              background: "#212223",
            },
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
            endAdornment: (
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
            ),
          }}
          {...props}
        />
      )}
    />
  );
};

export default SearchField;
