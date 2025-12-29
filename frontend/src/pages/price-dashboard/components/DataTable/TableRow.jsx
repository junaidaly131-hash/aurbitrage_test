import React, { useContext } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import ExpandableRow from "./ExpandableRow";
import { getMeltPrice, calculatePrice } from "./utils";
const TableRow = ({ item, rowIndex, expandedRow, handleRowClick }) => {
  const { numTopPicks: depth, spotPrices } = useContext(
    PricingDashboardContext,
  );
  const sortItems = (items, type) => {
    return (
      items?.sort((a, b) => {
        const meltPriceA = getMeltPrice(a, type, spotPrices);
        const meltPriceB = getMeltPrice(b, type, spotPrices);
        const priceA = calculatePrice(a, meltPriceA);
        const priceB = calculatePrice(b, meltPriceB);

        return type === "ask" ? priceA - priceB : priceB - priceA;
      }) || []
    );
  };

  const sortedAsk = sortItems(item?.ask, "ask");
  const sortedBid = sortItems(item?.bid, "bid");
  const maxLength = Math.max(sortedAsk.length, sortedBid.length);

  const rowColor = rowIndex % 2 === 0 ? "var(--Bar-Bg, #292929)" : "#212223";
  const current = expandedRow === rowIndex;
  const hasExpand = current || depth > 1;
  return (
    <React.Fragment>
      <ExpandableRow
        data={item}
        handleRowClick={handleRowClick}
        rowIndex={rowIndex}
        index={0}
        expandedRow={expandedRow}
        title={item?.name}
        isExpandable
        rowColor={rowColor}
        className={`${current && maxLength < 2 ? "bordered" : current ? "bordered-row" : ""} ${maxLength && current ? "border-t" : ""}`}
      />

      {hasExpand &&
        (sortedAsk.length > 1 || sortedBid.length > 1) &&
        Array.from({ length: maxLength }, (_, index) => {
          if (index === 0 || (index > depth - 1 && !current)) return null;

          return (
            <ExpandableRow
              className={`${current ? "bordered-row" : ""} ${maxLength - 1 === index ? "border-b" : ""}`}
              key={`expanded-row-${index}`}
              data={item}
              index={index}
              rowIndex={index}
              title=""
              rowColor={rowColor}
            />
          );
        })}
    </React.Fragment>
  );
};

export default TableRow;
