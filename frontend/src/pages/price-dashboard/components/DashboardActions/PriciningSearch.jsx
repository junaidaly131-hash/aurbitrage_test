import { Autocomplete, Box, InputAdornment } from "@mui/material";
import { useState, useMemo, useEffect, useContext } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { useNavigate, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import {
  IconBarIcon,
  StyledClose,
  StyledList,
  StyledPopper,
  StyledTextField,
} from "./styles";

const PricingSearch = ({ searchOptions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setSearchFilter,
    searchFilter,
    aurbitrageSkuFilter,
    setAurbitrageSkuFilter,
    setSelectedNode,
    setCategoryFilter,
    setSubCategoryFilter,
    setMintFilter,
    setIsSideBarData,
    setSkuType,
  } = useContext(PricingDashboardContext);

  // Flatten searchOptions for easy handling
  const getFlattenedItems = (options) => {
    return options.map((option) => ({
      aurbitrageSku: option.aurbitrageSku || "",
      keywords: option.keywords || "",
      mint: option.mint || "",
    }));
  };

  const [search, setSearch] = useState(searchFilter || aurbitrageSkuFilter);

  const fuse = useMemo(
    () =>
      new Fuse(getFlattenedItems(searchOptions), {
        keys: [
          { name: "aurbitrageSku", weight: 0.5 },
          { name: "keywords", weight: 0.3 },
          { name: "mint", weight: 0.2 },
        ],
        includeScore: true,
        threshold: 0.3,
        distance: 100,
      }),
    [searchOptions],
  );

  const filteredOptions = useMemo(() => {
    if (!search) return searchOptions;
    const results = fuse.search(search);
    return results.map((result) => result.item);
  }, [search, fuse, searchOptions]);

  const clearSidebarSelections = () => {
    setSelectedNode("");
    setCategoryFilter("");
    setSubCategoryFilter("");
    setMintFilter("");
    setIsSideBarData(false);
    setSkuType("");
  };

  const shouldNavigateToMainDashboard = () => {
    const currentPath = location.pathname;
    // Don't navigate if we're on favorites or shortlist pages
    return (
      !currentPath.includes("/favorites") && !currentPath.includes("/shortlist")
    );
  };

  const handleOptionSelect = (event, value) => {
    if (value && event.key !== "Enter") {
      setAurbitrageSkuFilter(value.aurbitrageSku);
      clearSidebarSelections();
      if (shouldNavigateToMainDashboard()) {
        navigate("/dashboard/pricing/");
      }
    }
  };
  const handleSearch = (event, newInputValue) => {
    if (event && event.key !== "Enter") {
      setSearch(newInputValue);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && search) {
      event.preventDefault();
      setSearchFilter(search);
      setAurbitrageSkuFilter("");
      clearSidebarSelections();
      if (shouldNavigateToMainDashboard()) {
        navigate("/dashboard/pricing/");
      }
    }
    if (search == "") {
      setSearchFilter("");
      setAurbitrageSkuFilter("");
    }
  };

  const handleClear = () => {
    setSearch("");
    setSearchFilter("");
    setAurbitrageSkuFilter("");
  };

  return (
    <>
      <Autocomplete
        freeSolo
        options={filteredOptions}
        getOptionLabel={(option) => `${option.aurbitrageSku} - ${option.mint}`}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              {option.aurbitrageSku} - {option.mint}
            </Box>
          );
        }}
        onInputChange={handleSearch}
        onChange={handleOptionSelect}
        inputValue={search}
        clearOnEscape
        clearText="Clear"
        renderInput={(params) => (
          <StyledTextField
            {...params}
            variant="outlined"
            placeholder="Search SKUs..."
            value={search}
            onKeyDown={handleKeyPress}
            InputProps={{
              ...params.InputProps,
              startAdornment: <IconBarIcon />,
              endAdornment: (
                <InputAdornment position="end" onClick={handleClear}>
                  {search && <StyledClose />}
                </InputAdornment>
              ),
            }}
          />
        )}
        PopperComponent={(props) => <StyledPopper {...props} />}
        ListboxComponent={(props) => <StyledList {...props} />}
      />
    </>
  );
};

export default PricingSearch;
