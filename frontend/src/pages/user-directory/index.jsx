import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import VirtualizedTable from "@/components/VirtualizedTable";
import UserRow from "./components/UserRow/UserRow";
import Fuse from "fuse.js";
import SearchBar from "./components/SearchBar/SearchBar";
import useGetUserDirectory from "./hooks/useGetUserDirectory";
import UserHeader from "./components/UserHeader/UserHeader";
import {
  StyledGridContainer,
  StyledHeading,
  StyledUserCount,
  StyledDivider,
  StyledCircularProgressContainer,
  StyledVirtualizedTableStack,
  StyledTableRow,
  StyledTableCell,
} from "./styles";

const UserDirectory = () => {
  const { directory, loading } = useGetUserDirectory();
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState({ sort: "dealer", order: "asc" });

  const handleSort = (newSort) => setSort(newSort);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      keys: ["name", "dealer"],
      threshold: 0.3,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 100,
    };
    return new Fuse(directory, fuseOptions);
  }, [directory]);

  const handleSearch = (searchTerm) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (trimmedSearchTerm === "") {
      return directory;
    }

    return directory.filter((item) =>
      ["name", "dealer"].some((key) =>
        item[key]
          ?.toLowerCase()
          .replace(/\s+/g, "")
          .includes(trimmedSearchTerm.replace(/\s+/g, "")),
      ),
    );
  };

  const sortTable = (a, b) => {
    const valueA = a[sort.sort];
    const valueB = b[sort.sort];
    if (typeof valueA === "string" && typeof valueB === "string") {
      const comparison = valueA.localeCompare(valueB, undefined, {
        sensitivity: "base",
      });
      return sort.order === "asc" ? comparison : -comparison;
    }
    return sort.order === "asc"
      ? valueA < valueB
        ? -1
        : 1
      : valueA > valueB
        ? -1
        : 1;
  };

  return (
    <StyledGridContainer container direction="column">
      <Grid
        container
        item
        sx={{ justifyContent: "space-between", flexDirection: "row" }}
      >
        <StyledHeading>Members</StyledHeading>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledUserCount>{`${handleSearch(search).length} User${directory.length !== 1 ? "s" : ""} Found`}</StyledUserCount>
        </Box>
        <div>
          <SearchBar
            searchInput={search}
            setSearchInput={setSearch}
            label={"Search User"}
            options={directory}
            keys={["name", "dealer"]}
          />
        </div>
      </Grid>
      <StyledDivider item xs={true}>
        {loading ? (
          <StyledCircularProgressContainer>
            <CircularProgress />
          </StyledCircularProgressContainer>
        ) : (
          <StyledVirtualizedTableStack direction="column">
            <VirtualizedTable
              data={handleSearch(search).sort(sortTable)}
              fixedHeaderContent={() => (
                <StyledTableRow>
                  {/* <UserHeader
                    label="Dealer"
                    sortKey="dealer"
                    sort={sort}
                    onSort={handleSort}
                  /> */}
                  <UserHeader
                    label="Name"
                    sortKey="name"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <UserHeader
                    label="Email"
                    sortKey="email"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <StyledTableCell>Phone</StyledTableCell>
                </StyledTableRow>
              )}
              itemContent={(index, row) => (
                <UserRow
                  id={row.id}
                  key={index}
                  index={index}
                  name={row.name}
                  email={row.email}
                  phone={row.phone}
                  dealer={row.dealer}
                  profileImage={row.profileImage}
                />
              )}
            />
          </StyledVirtualizedTableStack>
        )}
      </StyledDivider>
    </StyledGridContainer>
  );
};

export default UserDirectory;
