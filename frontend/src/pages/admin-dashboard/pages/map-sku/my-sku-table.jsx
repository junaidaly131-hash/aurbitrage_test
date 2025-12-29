import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import useRePublishSkuPrices from "@/pages/admin-dashboard/hooks/useRePublishPrices";
import useRemoveSkuPrice from "@/pages/admin-dashboard/hooks/removeSkuPrice";
import VirtualizedTable from "@/components/VirtualizedTable";
import MapSKURow from "../../components/MapSkuRow/map-sku-row";
import SortableTableHeader from "./sortHeader";
import Fuse from "fuse.js";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import { StyledStack, StyledTableRowSku, StyledTableCell } from "./styles";
import MapUserSKURow from "../../components/MapSkuRow/map-user-sku-row";
const MapSkuTableContainer = (props) => {
  const {
    startDate,
    endDate,
    unmappedSKUs,
    AurbitrageSKUMeta,
    searchInput,
    dealerFilter,
    userRole,
    skuTypeFilter,
    setCreateSKU,
    isManual,
    isCustom,
    tabSwitch,
    setTabSwitch,
    onEdit,
    tabValue,
    filter = false,
    updateChanges,
  } = props;
  const {
    loading: rePublishLoading,
    error: rePublishError,
    rePublishSkuPrices,
  } = useRePublishSkuPrices();

  const {
    loading: removeLoading,
    error: removeError,
    removeSkuPrice,
  } = useRemoveSkuPrice();

  const { enqueueSnackbar } = useSnackbar();
  const displayAlert = React.useCallback(
    (alert) => {
      enqueueSnackbar(alert.message, {
        variant: alert.error ? "error" : "success",
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
      });
    },
    [enqueueSnackbar],
  );

  const [view, setView] = React.useState([]);
  const [skuRealtionIdx, setSkuRelationIdx] = React.useState({});
  const [sort, setSort] = React.useState({ sort: "sku", order: "asc" });
  const handleSort = (newSort) => {
    setSort(newSort);
  };
  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      keys: ["sku", "aurbitrageSku", "keywords"],
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
    };
    const keysArray = unmappedSKUs;
    return new Fuse(keysArray, fuseOptions);
  }, [unmappedSKUs]);

  const filterSKUType = (item) => {
    return (
      skuTypeFilter.length === 0 ||
      (skuTypeFilter.includes("Active") && item.aurbitrageSkuId) ||
      (skuTypeFilter.includes("Unmapped") && !item.aurbitrageSkuId)
    );
  };

  const viewFilter = (item) => {
    const isCorrectTab =
      (tabValue === 0 &&
        item.isExtracted &&
        item.sourceTable === "MasterPricelists") ||
      (tabValue === 1 &&
        !item.isExtracted &&
        item.sourceTable === "MasterPricelists") ||
      (tabValue === 2 && item.sourceTable === "DealerMasterPricelists");
    return (
      (isCorrectTab || filter) &&
      (dealerFilter.length === 0 || dealerFilter.includes(item.dealer)) &&
      (!startDate || dayjs(item.date).isSameOrAfter(startDate)) &&
      (!endDate || dayjs(item.date).isSameOrBefore(endDate)) &&
      filterSKUType(item)
    );
  };

  const sortTable = (a, b) => {
    const valueA = a[sort.sort];
    const valueB = b[sort.sort];

    if (typeof valueA === "string" && typeof valueB === "string") {
      // Perform case-insensitive comparison for strings
      const comparison = valueA.localeCompare(valueB, undefined, {
        sensitivity: "base",
      });
      return sort.order === "asc" ? comparison : -comparison;
    }
    // For non-string types (e.g., numbers, dates)
    if (valueA < valueB) {
      return sort.order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sort.order === "asc" ? 1 : -1;
    }
    return 0;
  };

  React.useEffect(() => {
    const activeRows =
      searchInput !== ""
        ? fuse.search(searchInput).map((result) => result.item)
        : unmappedSKUs;
    setView(activeRows);
  }, [unmappedSKUs, searchInput]);

  React.useEffect(() => {
    if (isManual == false) {
      setCreateSKU(isManual);
    }
  }, [isManual]);
  React.useEffect(() => {
    if (rePublishLoading !== "loading" && rePublishLoading !== "idle") {
      const alertObject = {};
      alertObject["show"] = true;
      alertObject["error"] = rePublishError !== "";
      alertObject["message"] = rePublishError || "Prices Republished";
      displayAlert(alertObject);
    }
  }, [rePublishError, rePublishLoading, displayAlert]);

  React.useEffect(() => {
    if (removeLoading !== "loading" && removeLoading !== "idle") {
      const alertObject = {};
      alertObject["show"] = true;
      alertObject["error"] = removeError !== "";
      alertObject["message"] = removeError || "Sku Price Removed";
      displayAlert(alertObject);
    }
  }, [removeError, removeLoading, displayAlert]);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${month}-${day}-${year} ${hours}:${minutes}`;
  };

  const filterSkuIds = () => {
    const filteredSkus = view.filter((sku) => !sku.isExtracted);
    const pricelistIds = filteredSkus.map((sku) => sku.pricelistId);
    return pricelistIds;
  };

  const handleRepublishPrices = () => {
    const skuIds = filterSkuIds();
    rePublishSkuPrices(skuIds);
  };

  const handleRemoveSku = (pricelistId) => {
    const filteredSkus = view.filter((sku) => sku.pricelistId !== pricelistId);
    setView(filteredSkus);
    removeSkuPrice(pricelistId);

    // Notify parent component about the deletion
    if (updateChanges) {
      updateChanges({ deleted: true, pricelistId });
    }
  };

  const updateRowByUniqueKey = (dealer, sku, section, updatedValues) => {
    setView((prevView) =>
      prevView.map((row) => {
        if (
          row.dealer === dealer &&
          row.sku === sku &&
          row.section === section
        ) {
          const updatedRow = { ...row, ...updatedValues };
          return updatedRow;
        }
        return row;
      }),
    );
  };

  const renderHeader = () => {
    return (
      <>
        <>
          <StyledTableRowSku>
            <SortableTableHeader
              label="SKU"
              sortKey="sku"
              sort={sort}
              onSort={handleSort}
            />

            {userRole === "superadmin" && (
              <>
                <SortableTableHeader
                  label="Section"
                  sortKey="section"
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHeader
                  label="Dealer"
                  sortKey="dealer"
                  sort={sort}
                  onSort={handleSort}
                />
              </>
            )}

            <StyledTableCell>Bid Price</StyledTableCell>
            <StyledTableCell>Ask Price</StyledTableCell>

            <SortableTableHeader
              label="Aurbitrage SKU"
              sortKey="aurbitrageSku"
              sort={sort}
              onSort={handleSort}
            />
            {isCustom && userRole === "superadmin" && (
              <StyledTableCell>Receiver Dealer</StyledTableCell>
            )}
            <StyledTableCell className="lastCell">Time</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            {isCustom && userRole === "superadmin" && (
              <StyledTableCell></StyledTableCell>
            )}
          </StyledTableRowSku>
        </>
      </>
    );
  };

  return (
    <StyledStack direction="column">
      <VirtualizedTable
        data={view.filter(viewFilter).sort(sortTable)}
        fixedHeaderContent={() => <>{renderHeader()}</>}
        itemContent={(index, row) => {
          return (
            <MapSKURow
              row={row}
              index={index}
              AurbitrageSKUMeta={AurbitrageSKUMeta}
              formatDate={formatDate}
              userRole={userRole}
              skuRealtionIdx={skuRealtionIdx}
              setSkuRelationIdx={setSkuRelationIdx}
              handleRemoveSku={handleRemoveSku}
              tabSwitch={tabSwitch}
              setTabSwitch={setTabSwitch}
              displayAlert={displayAlert}
              updateRowByUniqueKey={updateRowByUniqueKey}
              onEdit={onEdit}
              isCustom={isCustom}
            />
          );
        }}
      />
    </StyledStack>
  );
};
const MySkuTable = (props) => {
  return (
    <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
      <MapSkuTableContainer {...props} />
    </SnackbarProvider>
  );
};
export default MySkuTable;
