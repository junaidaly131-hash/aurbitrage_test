import { SearchBar } from "@/components/SearchBar";
import FilterIcon from "@/assets/images/filter-menu.svg";
import { Clear, FilterButton, SearchFilterWrapper } from "./styles";

const SearchFilter = ({
  value,
  onChange,
  options,
  filterMenu,
  setFilterMenu,
  clearFilterMenu,
}) => {
  return (
    <SearchFilterWrapper>
      <FilterButton>
        Filter
        {filterMenu ? (
          <img
            src={FilterIcon}
            alt="menu"
            onClick={() => setFilterMenu(false)}
          />
        ) : (
          <Clear fontSize={"small"} onClick={clearFilterMenu} />
        )}
      </FilterButton>
      <SearchBar
        searchInput={value}
        setSearchInput={onChange}
        options={options}
      />
    </SearchFilterWrapper>
  );
};

export default SearchFilter;
