import React, { useEffect } from "react";
import EditSKURow from "../EditSkuRow/edit-sku-row";
import { calculateSKUPriceValue } from "@/lib";
import {
  AggregateToggleCell,
  AurbitrageSKUCell,
  DateCell,
  EditCell,
  NotesCell,
  PriceCell,
} from "./map-sku-row";

const MapUserSKURow = (props) => {
  const {
    row,
    index,
    AurbitrageSKUMeta,
    formatDate,
    userRole,
    skuRealtionIdx,
    setSkuRelationIdx,
    handleRemoveSku,
    setTabSwitch,
    tabSwitch,
    displayAlert,
    updateRowByUniqueKey,
    onEdit,
    isCustom,
  } = props;

  const [editState, setEditState] = React.useState({});
  const [showAggregates, setShowAggregates] = React.useState({});

  useEffect(() => {
    if (tabSwitch) {
      setEditState({});
    }
  }, [tabSwitch]);

  const getRowKey = (row) => `${row.sku}-${row.dealer}-${row.section}`;

  const handleEditClick = (rowKey) => {
    setEditState((prevState) => ({
      ...prevState,
      [rowKey]: !prevState[rowKey],
    }));
  };

  const handleToggleAggregates = (rowKey) => {
    setShowAggregates((prevState) => ({
      ...prevState,
      [rowKey]: !prevState[rowKey],
    }));
  };

  const getSKUprice = (row, key) => {
    const format = key === "bid" ? row.bidFormat : row.askFormat;
    // Get the index value from skuRelationIdx
    const priceKey = `${row.dealer}${row.sku}${row.date}${row.sourceTable}`;
    const indexValue =
      key === "ask"
        ? skuRealtionIdx[priceKey]?.Price?.ask
        : skuRealtionIdx[priceKey]?.Price?.bid;
    if (skuRealtionIdx[priceKey]?.Price) {
      if (indexValue != undefined) {
        return indexValue;
      } else {
        return "";
      }
    }
    const originalPrice =
      key === "ask"
        ? calculateSKUPriceValue(row.askSign, row.askNumber)
        : calculateSKUPriceValue(row.bidSign, row.bidNumber);
    return (
      (format === "$" ? "$" : "") +
      (originalPrice || originalPrice === 0 ? originalPrice : "") +
      (format === "%" ? "%" : "")
    );
  };

  const getOriginalSKUprice = (row, key) => {
    const format = key === "bid" ? row.bidFormat : row.askFormat;
    // Calculate the original price
    const originalPrice =
      key === "ask"
        ? calculateSKUPriceValue(row.askSign, row.askNumber)
        : calculateSKUPriceValue(row.bidSign, row.bidNumber);
    return (
      (format === "$" ? "$" : "") +
      (originalPrice || originalPrice === 0 ? originalPrice : "") +
      (format === "%" ? "%" : "")
    );
  };

  const rowKey = getRowKey(row);
  const currentShowAggregates = showAggregates[rowKey] || false;

  return !editState[rowKey] ? (
    <>
      <AurbitrageSKUCell row={row} showAggregates={currentShowAggregates} />
      <PriceCell
        row={row}
        priceType="bid"
        getSKUprice={getSKUprice}
        showAggregates={currentShowAggregates}
      />

      <PriceCell
        row={row}
        priceType="ask"
        getSKUprice={getSKUprice}
        showAggregates={currentShowAggregates}
      />

      <NotesCell
        row={row}
        formatDate={formatDate}
        showAggregates={currentShowAggregates}
      />
      <DateCell
        row={row}
        formatDate={formatDate}
        showAggregates={currentShowAggregates}
      />

      <EditCell
        row={row}
        onEdit={onEdit}
        showAggregates={currentShowAggregates}
      />

      {userRole === "superadmin" && isCustom && (
        <AggregateToggleCell
          row={row}
          showAggregates={currentShowAggregates}
          onToggleAggregates={() => handleToggleAggregates(rowKey)}
        />
      )}
    </>
  ) : (
    <EditSKURow
      row={row}
      index={index}
      AurbitrageSKUMeta={AurbitrageSKUMeta}
      getSKUprice={getSKUprice}
      getOriginalSKUprice={getOriginalSKUprice}
      formatDate={formatDate}
      userRole={userRole}
      skuRealtionIdx={skuRealtionIdx}
      setSkuRelationIdx={setSkuRelationIdx}
      handleRemoveSku={handleRemoveSku}
      tabSwitch={tabSwitch}
      setTabSwitch={setTabSwitch}
      setEditActive={() => handleEditClick(rowKey)}
      displayAlert={displayAlert}
      updateRowByUniqueKey={updateRowByUniqueKey}
    />
  );
};

export default MapUserSKURow;
