import React from "react";

const formatPriceData = (priceData) => {
  return priceData.replace(/(\d+(\,\d{3})*(\.\d{1,2})?)(\$|\b)/g, (match) => {
    const isPriceWithCoins = /(\d+)\$ for (\d+)/.test(match);
    if (isPriceWithCoins) {
      return match.replace(/\d+/g, (number) =>
        parseInt(number).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );
    } else {
      return parseFloat(match.replace("$", "")).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  });
};

const PriceFormatter = ({ priceData }) => {
  const formattedPriceData = priceData
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <span>{formattedPriceData}</span>;
};

export default PriceFormatter;
