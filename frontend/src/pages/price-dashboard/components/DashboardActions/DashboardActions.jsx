import { useContext, useState, useEffect, forwardRef } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { FilterGroup } from "@/components/FilterGroup";
import PricingSearch from "./PriciningSearch";
import ClearShortlist from "./ClearShortlist";
import SearchMetadataDisplay from "./SearchMetadataDisplay";
import { Typography } from "@mui/material";
import {
  Count,
  DashActions,
  FilterLabel,
  FlexBetweenGap,
  FlexCenter,
  FlexCenterGap,
  FlexXCenter,
  Label,
  SearchBox,
  StyledClearIcon,
  StyledButton,
  FiltersWrapper,
  Container,
  StyledChip,
  OptionBox,
  ChipParentBox,
} from "./styles";
import { useLocation } from "react-router-dom";
import AppDropDown from "@/components/AppDropDown";
import {
  DEPTH_OPTIONS,
  DISPLAY_PRICE_OPTIONS,
  PAGE_VIEW_OPTIONS,
} from "./FilterOptions";
import PriceMenu from "@/components/PriceMenu/PriceMenu";
import { Tune } from "@mui/icons-material";

function updateFilters(
  selectedFilters,
  refFilters,
  filterType,
  updatedFilters,
) {
  refFilters.forEach((newFilter) => {
    if (
      !selectedFilters.some(
        (sf) => sf.filter === filterType && sf.value === newFilter,
      )
    ) {
      updatedFilters.push({ filter: filterType, value: newFilter });
    }
  });
}

const DashboardActions = forwardRef(function Comp(props, ref) {
  const {
    dealers,
    setDealerFilter,
    dealerFilter,
    selectedNode,
    setpricingDataView,
    metalFilter,
    setMetalFilter,
    refineryFilter,
    setRefineryFilter,
    yearFilter,
    setYearFilter,
    allYears,
    allRefineries,
    allMetals,
    searchOptions,
    searchFilter,
    skuCount,
    handleNoClick,
    suggestionPrompt,
    handleYesClick,
    suggestionType,
    searchMetadata,
    displayPrice,
    setDisplayPrice,
    numTopPicks,
    setNumTopPicks,
    view,
    setView,
  } = useContext(PricingDashboardContext);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterMenu, setFilterMenu] = useState(true);
  const [showSearchMetadata, setShowSearchMetadata] = useState(true);

  const location = useLocation();
  const currentRoute = location.pathname;

  // Reset showSearchMetadata when searchMetadata changes
  useEffect(() => {
    if (searchMetadata) {
      setShowSearchMetadata(true);
    }
  }, [searchMetadata]);

  // Handle filter tags
  useEffect(() => {
    // remove tags
    const updatedFilters = selectedFilters.filter((f) => {
      if (f.filter === "dealer") {
        return dealerFilter.includes(f.value);
      } else if (f.filter === "year") {
        return yearFilter.includes(f.value);
      } else if (f.filter === "metal") {
        return metalFilter.includes(f.value);
      } else if (f.filter === "refinery") {
        return refineryFilter.includes(f.value);
      }
      return true;
    });
    //Add tags
    updateFilters(selectedFilters, dealerFilter, "dealer", updatedFilters);
    updateFilters(selectedFilters, yearFilter, "year", updatedFilters);
    updateFilters(selectedFilters, metalFilter, "metal", updatedFilters);
    updateFilters(selectedFilters, refineryFilter, "refinery", updatedFilters);

    if (
      updatedFilters.length !== selectedFilters.length ||
      updatedFilters.some((f, idx) => f !== selectedFilters[idx])
    ) {
      setSelectedFilters(updatedFilters);
    }
  }, [dealerFilter, metalFilter, refineryFilter, selectedFilters, yearFilter]);

  const handleFilterUnselect = (filter) => {
    switch (filter.filter) {
      case "dealer":
        setDealerFilter((p) => p.filter((v) => v !== filter.value));
        break;
      case "year":
        setYearFilter((p) => p.filter((v) => v !== filter.value));
        break;
      case "metal":
        setMetalFilter((p) => p.filter((v) => v !== filter.value));
        break;
      case "refinery":
        setRefineryFilter((p) => p.filter((v) => v !== filter.value));
        break;
      default:
        break;
    }
  };

  const handleFilterMenu = () => {
    setFilterMenu(true);
    setDealerFilter([]);
    setYearFilter([]);
    setMetalFilter([]);
    setRefineryFilter([]);
  };

  const handleDisplayPriceSelect = (opt) => {
    setDisplayPrice(opt.value);
  };
  const handleDepthSelect = (opt) => {
    setNumTopPicks(opt.value);
  };
  const handlePageViewSelect = (opt) => {
    setView(opt.value);
  };

  const hasPageView = currentRoute === "/dashboard/pricing";
  const hasFilters = [
    dealerFilter,
    yearFilter,
    metalFilter,
    refineryFilter,
  ].some((filter) => filter?.length > 0);
  return (
    <Container ref={ref}>
      <DashActions>
        <FilterLabel>
          {filterMenu ? (
            <Tune onClick={() => setFilterMenu(false)} />
          ) : (
            <Tune color="secondary" onClick={handleFilterMenu} />
          )}
        </FilterLabel>
        <FlexBetweenGap>
          <SearchBox className="search-btn">
            <PricingSearch
              setpricingDataView={setpricingDataView}
              selectedNode={selectedNode}
              searchOptions={searchOptions}
            />
          </SearchBox>
          <FlexXCenter>
            <Count>
              {`${skuCount == -1 ? 0 : skuCount} Product${skuCount !== 1 ? "s" : ""} Found`}
            </Count>
          </FlexXCenter>
          <FlexCenter>
            <Label>Display Price</Label>
            <AppDropDown
              value={displayPrice}
              options={DISPLAY_PRICE_OPTIONS}
              placeholder="Display Price"
              id="display-price-menu"
              handleSelect={handleDisplayPriceSelect}
            />
          </FlexCenter>
          <FlexCenter>
            <Label>Depth:</Label>
            <AppDropDown
              value={numTopPicks}
              options={DEPTH_OPTIONS}
              placeholder="Depth"
              id="depth-menu"
              handleSelect={handleDepthSelect}
            />
          </FlexCenter>
          {hasPageView && (
            <FlexCenter>
              <Label>Page View</Label>
              <AppDropDown
                value={view}
                options={PAGE_VIEW_OPTIONS}
                placeholder="Page View"
                id="page-view-menu"
                handleSelect={handlePageViewSelect}
              />
            </FlexCenter>
          )}
          {currentRoute === "/dashboard/pricing/shortlist" && (
            <ClearShortlist />
          )}
        </FlexBetweenGap>
      </DashActions>
      {showSearchMetadata && (
        <SearchMetadataDisplay
          searchMetadata={searchMetadata}
          onClose={() => setShowSearchMetadata(false)}
        />
      )}
      {(!filterMenu || hasFilters) && (
        <DashActions>
          <FlexBetweenGap className="w-full">
            <FiltersWrapper className="gap ">
              <FilterGroup
                options={dealers}
                filters={dealerFilter}
                onChange={setDealerFilter}
                title={"Dealer"}
              />
              <FilterGroup
                options={allYears}
                filters={yearFilter}
                onChange={setYearFilter}
                title={"Year"}
              />
              <FilterGroup
                options={allMetals}
                filters={metalFilter}
                onChange={setMetalFilter}
                title={"Metal"}
              />
              <FilterGroup
                options={allRefineries}
                filters={refineryFilter}
                onChange={setRefineryFilter}
                title={"Refinery"}
              />
            </FiltersWrapper>
            <FlexCenterGap className="filter-scroller">
              {selectedFilters.map((f) => (
                <StyledButton
                  key={`${f.dealer}=${f.value}`}
                  onClick={() => handleFilterUnselect(f)}
                >
                  {f.value}&nbsp;
                  <StyledClearIcon fontSize={"small"} />
                </StyledButton>
              ))}
            </FlexCenterGap>
          </FlexBetweenGap>
        </DashActions>
      )}
      {searchFilter && suggestionPrompt && (
        <ChipParentBox>
          <StyledChip
            label={
              <Typography variant="body1" className="chip-text">
                We found results under <strong>{suggestionType}</strong> for "
                {searchMetadata?.correctedQuery || searchFilter}", would you
                like us to include those in your search?&nbsp;
                <OptionBox component="span" onClick={handleYesClick}>
                  Yes
                </OptionBox>
                &nbsp;/&nbsp;
                <OptionBox
                  component="span"
                  onClick={handleNoClick}
                  color="white"
                >
                  No
                </OptionBox>
              </Typography>
            }
          />
        </ChipParentBox>
      )}
    </Container>
  );
});

export default DashboardActions;
