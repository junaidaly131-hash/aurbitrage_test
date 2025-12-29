import { useState, useRef, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import Calendar from "../../assets/images/calendar.svg";
import {
  StyledContainer,
  StyledIconButton,
  StyledCalendarBox,
  FlexContainer,
  DateInfo,
  TodayLabel,
  DaysCount,
  PickerInputOverride,
  ButtonContainer,
  Relative,
} from "./styles";

const DateRangePicker = (props) => {
  const { onChange, startDate: propStartDate, endDate: propEndDate } = props;

  const [startDate, setStartDate] = useState(() => {
    if (propStartDate) return propStartDate;
    const today = dayjs();
    return today.subtract(2, "month");
  });
  const [endDate, setEndDate] = useState(() => {
    if (propEndDate) return propEndDate;
    return dayjs();
  });

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const [open, setOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (propStartDate !== null && propStartDate !== undefined) {
      setStartDate(propStartDate);
      setTempStartDate(propStartDate);
    } else if (propStartDate === null) {
      const today = dayjs();
      const defaultStart = today.subtract(2, "month");
      setStartDate(defaultStart);
      setTempStartDate(defaultStart);
    }

    if (propEndDate !== null && propEndDate !== undefined) {
      setEndDate(propEndDate);
      setTempEndDate(propEndDate);
    } else if (propEndDate === null) {
      const defaultEnd = dayjs();
      setEndDate(defaultEnd);
      setTempEndDate(defaultEnd);
    }

    setIsInitialized(true);
  }, [propStartDate, propEndDate]);

  const handleIconClick = () => {
    setOpen((prev) => {
      if (!prev) {
        setTempStartDate(startDate);
        setTempEndDate(endDate);
      }
      return !prev;
    });
  };

  const handleTempDateChange = (setter) => (newValue) => {
    setter(newValue);
  };

  const handleApply = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setOpen(false);

    if (onChange) {
      onChange({ start: tempStartDate, end: tempEndDate });
    }
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setOpen(false);
  };

  const handleReset = () => {
    const today = dayjs();
    const defaultStart = today.subtract(2, "month");
    const defaultEnd = today;

    setTempStartDate(defaultStart);
    setTempEndDate(defaultEnd);
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
    setOpen(false);

    if (onChange) {
      onChange({ start: defaultStart, end: defaultEnd });
    }
  };

  const getDaysBetween = () => {
    if (!tempStartDate || !tempEndDate) return 0;
    return tempEndDate.diff(tempStartDate, "day");
  };

  const isToday = (date) => {
    return date && date.isSame(dayjs(), "day");
  };

  const formatDateDisplay = (date) => {
    if (!date) return "";
    return date.format("MMM D, YYYY");
  };

  const formatDateRange = () => {
    if (!startDate || !endDate) return "";
    const isSame = startDate.isSame(endDate, "day");
    const start = formatDateDisplay(startDate);
    let end = formatDateDisplay(endDate);
    if (isToday(endDate)) {
      end = "Today";
    }
    if (isSame) {
      return isToday(endDate) ? "Today" : start;
    }
    return `${start} - ${end}`;
  };

  return (
    <StyledContainer ref={containerRef}>
      <FlexContainer onClick={handleIconClick}>
        <StyledIconButton>
          <img loading="lazy" src={Calendar} alt="icon" />
        </StyledIconButton>
        {formatDateRange(startDate, endDate)}
      </FlexContainer>
      {open && (
        <StyledCalendarBox className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <PickerInputOverride>
              <Relative>
                <DatePicker
                  label="From"
                  ref={startDatePickerRef}
                  value={tempStartDate}
                  disableFuture
                  maxDate={tempEndDate}
                  onChange={handleTempDateChange(setTempStartDate)}
                />
                {isToday(tempStartDate) && <TodayLabel>Today</TodayLabel>}
              </Relative>
              <Relative>
                <DatePicker
                  label="To"
                  value={tempEndDate}
                  minDate={tempStartDate}
                  disableFuture
                  ref={endDatePickerRef}
                  onChange={handleTempDateChange(setTempEndDate)}
                />
                {isToday(tempEndDate) && <TodayLabel>Today</TodayLabel>}
              </Relative>
              <DateInfo>
                <DaysCount>{getDaysBetween()} days selected</DaysCount>
              </DateInfo>
              <ButtonContainer>
                <Button variant="outlined" size="small" onClick={handleReset}>
                  Reset
                </Button>
                <Button variant="outlined" size="small" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" size="small" onClick={handleApply}>
                  Apply
                </Button>
              </ButtonContainer>
            </PickerInputOverride>
          </LocalizationProvider>
        </StyledCalendarBox>
      )}
    </StyledContainer>
  );
};

export default DateRangePicker;
