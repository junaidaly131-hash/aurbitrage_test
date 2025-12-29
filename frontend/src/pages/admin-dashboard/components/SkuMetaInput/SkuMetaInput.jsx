import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { matchSorter } from "match-sorter";

const SkuMetaInput = (props) => {
  const {
    suggestions,
    value,
    onChange,
    index,
    label,
    width,
    allowCustomInput,
    required,
  } = props;

  const [error, setError] = React.useState(false);

  const filterOptions = (options, { inputValue }) => {
    if (!inputValue || !inputValue.length) {
      return options;
    }

    const terms = inputValue.split(" ");
    if (!terms) {
      return options;
    }

    return terms.reduceRight(
      (results, term) => matchSorter(results, term, { keepDiacritics: true }),
      options,
    );
  };

  const isYearValid = (year) => {
    return /^\d{4}$/.test(year);
  };

  const onValueChange = (e, v) => {
    let inputValue = v;

    if (e && e.type === "change") {
      inputValue = e.target.value;
    }

    if (label === "year" && !isYearValid(inputValue)) {
      setError(true);
      onChange("");
      return;
    }

    if (
      (suggestions?.length > 0 &&
        !allowCustomInput &&
        !suggestions?.some(
          (s) => s.toLowerCase() === inputValue.toLowerCase(),
        )) ||
      (required && !inputValue?.trim())
    ) {
      setError(true);
      onChange("");
      return;
    }

    if (error) {
      setError(false);
    }

    onChange(inputValue);
  };

  return (
    <Autocomplete
      size="small"
      filterOptions={filterOptions}
      freeSolo
      disablePortal
      id={`sku-map-input-${index}`}
      options={suggestions || []}
      value={value || ""}
      sx={{
        width: width,
        minWidth: "8em",

        color: "white",
        "& .MuiInput-underline:before": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiInputBase-root": {
          color: "white",
        },
      }}
      componentsProps={{
        paper: {
          sx: {
            textAlign: "left",
            color: "#fff",
          },
        },
      }}
      onChange={onValueChange}
      onInputChange={onValueChange}
      renderInput={(params) => (
        <TextField
          error={error}
          {...params}
          label={label}
          variant="standard"
          inputProps={{
            ...params.inputProps,
            style: { fontSize: "small" },
            maxLength: label === "year" ? 4 : undefined,
            inputMode: label === "year" ? "numeric" : undefined,
            pattern: label === "year" ? "\\d{4}" : undefined,
          }}
          sx={{
            color: "white",
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiFormHelperText-root": {
              color: "white",
            },
          }}
        />
      )}
    />
  );
};

export default SkuMetaInput;
