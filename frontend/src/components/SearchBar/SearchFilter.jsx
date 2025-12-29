import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { v4 as uuid } from "uuid";
import SearchField from "../SearchField/SearchField";

export const SearchBar = ({
  onChange,
  searchInput,
  options = [],
  label,
  isUser,
  isDealer,
  maxWidth,
  openOnFocus = false,
  styles,
  ...props
}) => {
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
      (_, { inputValue }) => {
        if (isDealer) {
          return !inputValue && openOnFocus
            ? options.map((result) => result.dealerName)
            : fuse.search(inputValue).map((result) => result.item.dealerName);
        } else {
          if (isUser) {
            return !inputValue && openOnFocus
              ? options.map((result) => result.firstName)
              : fuse.search(inputValue).map((result) => result.item.firstName);
          } else {
            return !inputValue && openOnFocus
              ? options.map((result) => result.sku)
              : fuse.search(inputValue).map((result) => result.item.sku);
          }
        }
      },
    [fuse, isUser, isDealer],
  );

  const handleChange = (e, v) => {
    setValue(v);
    onChange(v || "");
  };

  const handleInputChange = (e, v) => {
    setValue(v);
    if (!v) {
      onChange("");
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      setOpen(false);
      onChange(value);
    }
  };

  const handleInputClick = () => {
    setOpen(openOnFocus ? true : false);
    onChange(value);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  return (
    <SearchField
      maxWidth={maxWidth}
      id={id}
      size="small"
      freeSolo
      disablePortal
      disableClearable={true}
      value={value}
      open={open}
      setOpen={setOpen}
      onChange={handleChange}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}
      handleEnterPress={handleEnterPress}
      handleInputClick={handleInputClick}
      handleClear={handleClear}
      label={label || "Search SKU"}
      styles={styles}
      options={
        isDealer
          ? options.map((option) => option.dealerName)
          : isUser
            ? options.map((option) => option.firstName)
            : options.map((option) => option.sku)
      }
      {...props}
    />
  );
};
