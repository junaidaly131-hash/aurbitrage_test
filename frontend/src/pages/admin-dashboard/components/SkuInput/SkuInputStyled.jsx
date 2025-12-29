import { Autocomplete, Box, TextField } from "@mui/material";
import { matchSorter } from "match-sorter";
import SkuTooltip from "./SkuTooltip";
import { useState } from "react";
import { SKUAutocomplete, SKUFormField, SKUInputField } from "./styles";
const SkuInputStyled = (props) => {
  const {
    SkuOptions,
    value,
    onChange,
    skuDealer,
    index,
    label,
    width,
    errors,
  } = props;

  const uniqueSkuOptions = Array.from(
    new Set(SkuOptions.map((option) => option.value)),
  ).map((avalue) => SkuOptions.find((option) => option.value === avalue));

  const filterOptions = (options, { inputValue }) => {
    if (!inputValue || !inputValue.length) {
      return options.slice(0, 20);
    }

    return matchSorter(options, inputValue, {
      keys: ["label", "keyword"],
      keepDiacritics: true,
    }).slice(0, 20);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const onValueChange = (e, v) => {
    onChange(e, v);
  };

  const selectedOption = uniqueSkuOptions.find(
    (option) => option.label === value,
  );

  return (
    <SKUAutocomplete
      size="small"
      filterOptions={filterOptions}
      disablePortal
      freeSolo
      id={`sku-map-input-${index}`}
      options={uniqueSkuOptions || []}
      getOptionLabel={(option) => option.label}
      value={selectedOption || null}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={onValueChange}
      renderInput={(params) => (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <SKUFormField
            {...params}
            placeholder="Aurbitrage SKU"
            variant="standard"
            label="Aurbitrage SKU"
            InputProps={{
              ...params.InputProps,
              className: "InputProp",
              disableUnderline: true,
            }}
            InputLabelProps={{
              className: "InputLabelProps",
            }}
            className="TextField"
            error={!!errors?.aurbitrageSku}
            helperText={errors?.aurbitrageSku}
          />
          {selectedOption && <SkuTooltip option={selectedOption} />}
        </Box>
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.label}
          <SkuTooltip option={option} />
        </li>
      )}
    />
  );
};

export default SkuInputStyled;
