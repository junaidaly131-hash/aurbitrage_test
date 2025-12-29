import React, { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useGetAurbitrageSkuById from "../../hooks/useGetAurbitrageSkuById";
import { formatTooltipContent } from "@/pages/price-dashboard/components/DataTable/utils";

const SkuTooltip = ({ option }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const { aurbitrageSku, loading, error, fetchAurbitrageSkuById } =
    useGetAurbitrageSkuById();
  const tooltipContent = loading
    ? "Loading..."
    : error
      ? `Error: ${error}`
      : formatTooltipContent(aurbitrageSku);

  const handleTooltipOpen = async (option) => {
    setHoveredOption(option);
    await fetchAurbitrageSkuById(option.value);
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
    setHoveredOption(null);
  };
  return (
    <Tooltip
      title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}
      open={tooltipOpen && hoveredOption === option}
      onOpen={() => handleTooltipOpen(option)}
      onClose={handleTooltipClose}
      arrow
    >
      <IconButton
        onMouseEnter={() => handleTooltipOpen(option)}
        onMouseLeave={handleTooltipClose}
        style={{ marginLeft: 8, color: "#fff" }}
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SkuTooltip;
