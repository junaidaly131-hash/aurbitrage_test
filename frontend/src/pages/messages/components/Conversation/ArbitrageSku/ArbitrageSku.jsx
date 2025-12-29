import { Tooltip } from "@mui/material";
import {
  Wrapper,
  SKUTitle,
  SKUInfo,
  Order,
  Metal,
  SKUPrice,
  MetalPrice,
  PriceBox,
  Row,
  CloseIcon,
} from "./styles";
import SourceIcon from "@/components/Icons/SourceIcon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PriceFormatter from "@/pages/price-dashboard/components/DataTable/PriceFormatter";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { useContext } from "react";
import {
  renderNotes,
  renderPrice,
} from "@/pages/price-dashboard/components/DataTable/utils";
import {
  InfoButton,
  InfoIcon,
  ToolTipTitle,
} from "@/pages/price-dashboard/components/DataTable/styles";
dayjs.extend(relativeTime);

const ArbitrageSku = ({ isAttachment = false, onClose, sku, ...rest }) => {
  const {
    displayPrice,
    numTopPicks: depth,
    spotPrices,
  } = useContext(PricingDashboardContext);

  const metalSpotPrice = spotPrices.find(
    (item) => item?.metals?.toLowerCase() === sku?.data?.metal?.toLowerCase(),
  );

  const formattedSpotPrice = metalSpotPrice
    ? `$${metalSpotPrice.bid.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "-";

  const trade = sku?.trade === "bid" ? "Buying" : "Selling";
  const date = sku?.data?.date;

  const price = sku?.data
    ? renderPrice(
        displayPrice,
        spotPrices,
        sku.data,
        (sku.data?.notes || sku.data?.shippingNote) && (
          <Tooltip title={<ToolTipTitle>{renderNotes(sku.data)}</ToolTipTitle>}>
            <InfoButton>
              <InfoIcon />
            </InfoButton>
          </Tooltip>
        ),
        sku.trade === "bid" ? "bidData" : "askData",
        true,
      )
    : 0;

  const formatTime = (timeString) => {
    return timeString
      .replace(/\byear(s)?\b/g, (match, p1) => (p1 ? "yrs" : "yr"))
      .replace(/\bmonth(s)?\b/g, (match, p1) => (p1 ? "mons" : "mon"))
      .replace(/\bminute(s)?\b/g, (match, p1) => (p1 ? "mins" : "min"))
      .replace(/\bhour(s)?\b/g, (match, p1) => (p1 ? "hrs" : "hr"))
      .replace(/\bday(s)?\b/g, (match, p1) => (p1 ? "days" : "day"))
      .replace(/\bweek(s)?\b/g, (match, p1) => (p1 ? "wks" : "wk"))
      .replace(/\bsecond(s)?\b/g, (match, p1) => (p1 ? "secs" : "sec"));
  };
  return (
    <>
      <Wrapper isAttachment={isAttachment} {...rest}>
        {onClose && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
        )}
        <Row>
          <SKUInfo>
            <SKUTitle>
              {sku?.data?.sourceTable === "DealerMasterPricelists"
                ? `${sku?.dealerName} Custom`
                : `${sku?.dealerName}${sku?.data?.sourceTable === "API" ? " API" : ""}`}
            </SKUTitle>
            <SourceIcon />
            <Order>({trade})</Order>
          </SKUInfo>
          <Metal>{sku?.skuName}</Metal>
          <PriceBox>
            <SKUPrice>
              {price && <PriceFormatter priceData={price.price} />}
              <span>
                {sku?.data?.isApiPrice
                  ? date
                  : formatTime(dayjs(date).fromNow())}
              </span>
            </SKUPrice>
            <MetalPrice>
              {sku?.data?.metal} {formattedSpotPrice}
            </MetalPrice>
          </PriceBox>
        </Row>
      </Wrapper>
    </>
  );
};

export default ArbitrageSku;
