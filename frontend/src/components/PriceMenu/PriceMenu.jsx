import { useState } from "react";
import Dropdown from "./Dropdown";
import { ArrowDropDown } from "@mui/icons-material";
import { Button, Label, Time, IconBox, MenuWrapper } from "./styles";
import PriceFormatter from "@/pages/price-dashboard/components/DataTable/PriceFormatter";
import dayjs from "dayjs";

export const PriceMenu = ({
  data = {},
  aurbitrageSkuId,
  type = "ask",
  index,
  handleCheckAvailability,
  loading,
}) => {
  const [open, setOpen] = useState(false);

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
    <MenuWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button open={open}>
        <Label>
          <PriceFormatter priceData={data.price} />
        </Label>
        <Time className={`${open ? "active" : ""}`}>
          {formatTime(dayjs(data?.date).fromNow())}
        </Time>
        <IconBox>
          <ArrowDropDown />
        </IconBox>
      </Button>
      {open && (
        <Dropdown
          data={data.info}
          aurbitrageSkuId={aurbitrageSkuId}
          type={type}
          index={index}
          handleCheckAvailability={handleCheckAvailability}
          loading={loading}
        />
      )}
    </MenuWrapper>
  );
};
export default PriceMenu;
