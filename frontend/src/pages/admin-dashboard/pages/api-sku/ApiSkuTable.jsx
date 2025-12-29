import { useEffect, useState, useCallback } from "react";
import VirtualizedTable from "@/components/VirtualizedTable";
import useApiSkus from "./hooks/useApiSkus";
import useAurbitrageSkus from "./hooks/useAurbitrageSkus";
import {
  StyledTableCell,
  StyledTableRowSku,
  StyledStack,
} from "../map-sku/styles";
import SkuInput from "../../components/SkuInput/SkuInput";
import { Button, CircularProgress } from "@mui/material";
import { StyledTableCell as EditSkuStyledTableCell } from "../../components/EditSkuRow/styles";
import toast from "react-hot-toast";
import Fuse from "fuse.js";

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
}) => (
  <>
    <EditSkuStyledTableCell>{row.sku}</EditSkuStyledTableCell>
    <EditSkuStyledTableCell className="center">
      {row.dealer?.dealerName || row.dealerId}
    </EditSkuStyledTableCell>
    <EditSkuStyledTableCell className="center">
      {row.userDealer?.dealerName || row.userDealerId}
    </EditSkuStyledTableCell>
    <EditSkuStyledTableCell
      className="center"
      align="center"
      sx={{ margin: "auto" }}
    >
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <SkuInput
          index={index}
          value={
            mapping[row.sku]?.label || row.aurbitrageSku?.aurbitrageSku || ""
          }
          SkuOptions={aurbitrageSkuOptions}
          onChange={(e, v) => setMapping({ ...mapping, [row.sku]: v })}
          disabled={!!row.aurbitrageSku?.aurbitrageSku}
        />
      </div>
    </EditSkuStyledTableCell>
    <EditSkuStyledTableCell className="end buttonsCell">
      <div
        style={{
          display: "grid",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={
            !!row.aurbitrageSku?.aurbitrageSku ||
            !mapping[row.sku]?.value ||
            saving[row.sku]
          }
          onClick={() => handleSave(row)}
        >
          Save
        </Button>
      </div>
    </EditSkuStyledTableCell>
  </>
);

const ApiSkuTable = ({ setApiSkus, searchInput, dealerFilter }) => {
  const { apiSkus, fetchApiSkus, loading } = useApiSkus();
  const { aurbitrageSkus, fetchAurbitrageSkus } = useAurbitrageSkus();
  const [mapping, setMapping] = useState({});
  const [saving, setSaving] = useState({});
  const [view, setView] = useState([]);

  useEffect(() => {
    fetchApiSkus();
    fetchAurbitrageSkus();
  }, []);

  useEffect(() => {
    if (!loading && apiSkus.length > 0) {
      setApiSkus(apiSkus);
    }
  }, [loading]);
  const fuse = new Fuse(apiSkus, {
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
        : apiSkus;

    setView(
      activeSkus.filter(
        (sku) =>
          dealerFilter.includes(sku.dealer?.dealerName) ||
          dealerFilter.length === 0,
      ),
    );
  }, [apiSkus, searchInput, dealerFilter]);
  const aurbitrageSkuOptions = (
    Array.isArray(aurbitrageSkus) ? aurbitrageSkus : []
  ).map((sku) => ({
    label: sku.aurbitrageSku,
    value: sku.id,
    keyword: sku.keywords || "",
  }));

  const handleSave = async (row) => {
    const v = mapping[row.sku];
    if (!v?.value) return;
    setSaving((prev) => ({ ...prev, [row.sku]: true }));
    try {
      const response = await fetch("/api/v1/sku-relations/map-dealer-api-sku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: row.sku,
          dealerId: row.dealerId,
          aurbitrageSkuId: v.value,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("SKU mapped.");
        fetchApiSkus();
      } else {
        toast.error(result.error || "Failed to map SKU.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving((prev) => ({ ...prev, [row.sku]: false }));
    }
  };

  const itemContent = useCallback(
    (index, row) => (
      <ApiSkuRow
        row={row}
        index={index}
        mapping={mapping}
        setMapping={setMapping}
        aurbitrageSkuOptions={aurbitrageSkuOptions}
        saving={saving}
        handleSave={handleSave}
      />
    ),
    [mapping, saving, aurbitrageSkuOptions],
  );

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <StyledStack direction="column">
      <VirtualizedTable
        data={Array.isArray(view) ? view : []}
        itemContent={itemContent}
        fixedHeaderContent={() => (
          <tr>
            {columns.map((col) => (
              <StyledTableCell key={col.dataKey} className="MuiTableCell-head">
                {col.label}
              </StyledTableCell>
            ))}
          </tr>
        )}
        components={{ TableRow: StyledTableRowSku }}
        rowHeight={60}
        headerHeight={50}
      />
    </StyledStack>
  );
};

export default ApiSkuTable;
