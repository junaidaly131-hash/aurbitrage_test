import { useEffect, useState, useCallback } from "react";
import VirtualizedTable from "@/components/VirtualizedTable";
import { LinearProgress, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import Fuse from "fuse.js";
import { ActionButton, Cell, Row } from "./styles";
import { StyledDiv, StyledFetchinData } from "../styles";
import useApiSkus from "@/pages/admin-dashboard/pages/api-sku/hooks/useApiSkus";
import useAurbitrageSkus from "@/pages/admin-dashboard/pages/api-sku/hooks/useAurbitrageSkus";
import useMapDealerApiSku from "@/pages/admin-dashboard/hooks/useMapDealerApiSku";
import useUnmapDealerApiSku from "@/pages/admin-dashboard/hooks/useUnmapDealerApiSku";
import SkuInput from "@/pages/admin-dashboard/components/SkuInput";

const columns = [
  { label: "SKU", dataKey: "sku" },
  { label: "Dealer Name", dataKey: "dealerName" },
  { label: "User Dealer Name", dataKey: "userDealerName" },
  { label: "Aurbitrage SKU", dataKey: "aurbitrageSku" },
  { label: "", dataKey: "save" },
];

const ApiSkuRow = ({
  row,
  index,
  mapping,
  setMapping,
  aurbitrageSkuOptions,
  saving,
  handleSave,
  handleUnmap,
  isMapped,
}) => {
  const hasNewMapping =
    mapping[row.sku]?.value &&
    mapping[row.sku]?.value !== row.aurbitrageSku?.id;
  const isLoading = saving[row.sku];

  return (
    <>
      <Cell>{row.sku}</Cell>
      <Cell className="center">{row.dealer?.dealerName || row.dealerId}</Cell>
      <Cell className="center">
        {row.userDealer?.dealerName || row.userDealerId}
      </Cell>
      <Cell className="center" align="center" sx={{ margin: "auto" }}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <SkuInput
            index={index}
            value={
              mapping[row.sku]?.label || row.aurbitrageSku?.aurbitrageSku || ""
            }
            SkuOptions={aurbitrageSkuOptions}
            onChange={(e, v) => setMapping({ ...mapping, [row.sku]: v })}
            disabled={isLoading}
          />
        </div>
      </Cell>
      <Cell className="end buttonsCell">
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
            marginRight: "10px",
          }}
        >
          {isMapped ? (
            <>
              {hasNewMapping ? (
                <ActionButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled={isLoading}
                  onClick={() => handleSave(row)}
                >
                  {isLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </ActionButton>
              ) : (
                <ActionButton
                  variant="contained"
                  color="error"
                  size="small"
                  disabled={isLoading}
                  onClick={() => handleUnmap(row)}
                >
                  {isLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    "Unmap"
                  )}
                </ActionButton>
              )}
            </>
          ) : (
            <ActionButton
              variant="contained"
              color="secondary"
              size="small"
              disabled={!mapping[row.sku]?.value || isLoading}
              onClick={() => handleSave(row)}
            >
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Save"
              )}
            </ActionButton>
          )}
        </div>
      </Cell>
    </>
  );
};

const APISKUs = ({
  setApiSkus,
  searchInput,
  dealerFilter,
  updateApiSkus,
  skuTypeFilter,
}) => {
  const { apiSkus, fetchApiSkus, loading } = useApiSkus();
  const { aurbitrageSkus, fetchAurbitrageSkus } = useAurbitrageSkus();
  const {
    mapDealerApiSku,
    loading: mapLoading,
    error: mapError,
  } = useMapDealerApiSku();
  const {
    unmapDealerApiSku,
    loading: unmapLoading,
    error: unmapError,
  } = useUnmapDealerApiSku();
  const [mapping, setMapping] = useState({});
  const [saving, setSaving] = useState({});
  const [view, setView] = useState([]);
  const [localApiSkus, setLocalApiSkus] = useState([]);

  useEffect(() => {
    fetchApiSkus();
    fetchAurbitrageSkus();
  }, []);

  useEffect(() => {
    if (!loading && apiSkus.length > 0) {
      setApiSkus(apiSkus);
      setLocalApiSkus(apiSkus);
    }
  }, [loading, apiSkus]);

  const fuse = new Fuse(localApiSkus, {
    keys: ["sku", "dealer.dealerName", "userDealer.dealerName"],
    threshold: 0.3,
    tokenize: true,
    matchAllTokens: true,
    useExtendedSearch: true,
    distance: 10000,
  });

  useEffect(() => {
    const activeSkus =
      searchInput.trim() !== ""
        ? fuse.search(searchInput).map((result) => result.item)
        : localApiSkus;

    setView(
      activeSkus.filter(
        (sku) =>
          (dealerFilter.includes(sku.dealer?.dealerName) ||
            dealerFilter.length === 0) &&
          ((skuTypeFilter.includes("Active") && sku.aurbitrageSkuId) ||
            (skuTypeFilter.includes("Unmapped") && !sku.aurbitrageSkuId) ||
            skuTypeFilter.length === 0),
      ),
    );
  }, [localApiSkus, searchInput, dealerFilter, skuTypeFilter]);
  const aurbitrageSkuOptions = (
    Array.isArray(aurbitrageSkus) ? aurbitrageSkus : []
  ).map((sku) => ({
    label: sku.aurbitrageSku,
    value: sku.id,
    keyword: sku.keywords || "",
  }));

  const handleSave = useCallback(
    async (row) => {
      const v = mapping[row.sku];
      if (!v?.value) return;
      setSaving((prev) => ({ ...prev, [row.sku]: true }));

      const result = await mapDealerApiSku(row.sku, row.dealerId, v.value);

      if (result && result.success) {
        toast.success("SKU mapped.");

        // Update local state instead of making API call
        const selectedAurbitrageSku = aurbitrageSkus.find(
          (sku) => sku.id === v.value,
        );
        const updatedRow = {
          ...row,
          aurbitrageSku: {
            id: selectedAurbitrageSku.id,
            aurbitrageSku: selectedAurbitrageSku.aurbitrageSku,
          },
        };

        // Update the local API SKUs state
        setLocalApiSkus((prevLocalApiSkus) =>
          prevLocalApiSkus.map((item) =>
            item.sku === row.sku && item.dealerId === row.dealerId
              ? updatedRow
              : item,
          ),
        );

        // Update the parent component's state
        if (updateApiSkus) {
          updateApiSkus((prevApiSkus) =>
            prevApiSkus.map((item) =>
              item.sku === row.sku && item.dealerId === row.dealerId
                ? updatedRow
                : item,
            ),
          );
        }

        // Clear the mapping state for this SKU
        setMapping((prev) => {
          const newMapping = { ...prev };
          delete newMapping[row.sku];
          return newMapping;
        });
      } else {
        toast.error(mapError || "Failed to map SKU.");
      }

      setSaving((prev) => ({ ...prev, [row.sku]: false }));
    },
    [mapping, aurbitrageSkus, updateApiSkus, mapDealerApiSku, mapError],
  );

  const handleUnmap = useCallback(
    async (row) => {
      setSaving((prev) => ({ ...prev, [row.sku]: true }));

      const result = await unmapDealerApiSku(row.sku, row.dealerId);

      if (result && result.success) {
        toast.success("SKU unmapped.");

        // Update local state instead of making API call
        const updatedRow = {
          ...row,
          aurbitrageSku: null,
        };

        // Update the local API SKUs state
        setLocalApiSkus((prevLocalApiSkus) =>
          prevLocalApiSkus.map((item) =>
            item.sku === row.sku && item.dealerId === row.dealerId
              ? updatedRow
              : item,
          ),
        );

        // Update the parent component's state
        if (updateApiSkus) {
          updateApiSkus((prevApiSkus) =>
            prevApiSkus.map((item) =>
              item.sku === row.sku && item.dealerId === row.dealerId
                ? updatedRow
                : item,
            ),
          );
        }
      } else {
        toast.error(unmapError || "Failed to unmap SKU.");
      }

      setSaving((prev) => ({ ...prev, [row.sku]: false }));
    },
    [updateApiSkus, unmapDealerApiSku, unmapError],
  );

  const itemContent = useCallback(
    (index, row) => {
      const isMapped = !!row.aurbitrageSku?.aurbitrageSku;
      return (
        <ApiSkuRow
          row={row}
          index={index}
          mapping={mapping}
          setMapping={setMapping}
          aurbitrageSkuOptions={aurbitrageSkuOptions}
          saving={saving}
          handleSave={handleSave}
          handleUnmap={handleUnmap}
          isMapped={isMapped}
        />
      );
    },
    [mapping, saving, aurbitrageSkuOptions, handleSave, handleUnmap],
  );

  if (loading)
    return (
      <StyledDiv>
        <StyledFetchinData>
          <h2> Fetching Data </h2>
          <LinearProgress />
        </StyledFetchinData>
      </StyledDiv>
    );

  return (
    <VirtualizedTable
      data={Array.isArray(view) ? view : []}
      itemContent={itemContent}
      fixedHeaderContent={() => (
        <Row>
          {columns.map((col) => (
            <Cell key={col.dataKey} className="MuiTableCell-head">
              {col.label}
            </Cell>
          ))}
        </Row>
      )}
    />
  );
};

export default APISKUs;
