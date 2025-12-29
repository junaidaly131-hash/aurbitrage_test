import { useState } from "react";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { formatTooltipContent } from "@/pages/price-dashboard/components/DataTable/utils";
import { StyledIconButton } from "./styles";

const AttributeTooltip = ({ row }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipContent = formatTooltipContent(row);

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };
  return (
    <Tooltip
      title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}
      open={tooltipOpen}
      onOpen={() => handleTooltipOpen()}
      onClose={handleTooltipClose}
      arrow
    >
      <StyledIconButton
        onMouseEnter={() => handleTooltipOpen()}
        onMouseLeave={handleTooltipClose}
      >
        <InfoIcon />
      </StyledIconButton>
    </Tooltip>
  );
};

export default AttributeTooltip;
