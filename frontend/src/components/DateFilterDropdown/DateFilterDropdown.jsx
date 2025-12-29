import { useState, useMemo } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Box, Button, alpha } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import {
  Wrapper,
  Label,
  DropdownMenu,
} from "./styles";
import dayjs from "dayjs";

const DateFilterDropdown = ({
  value = [null, null],
  placeholder = "All days",
  onChange,
  startIcon = null,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleReset = () => {
    onChange?.([null, null]);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleApply = () => {
    handleClose();
  };

  const displayLabel = useMemo(() => {
    const [start, end] = value || [];
    if (start && end) {
      return `${dayjs(start).format("MM/DD/YYYY")} - ${dayjs(end).format("MM/DD/YYYY")}`;
    }
    if (start) {
      return `${dayjs(start).format("MM/DD/YYYY")} - ...`;
    }
    return placeholder;
  }, [value, placeholder]);

  const hasValue = value && (value[0] || value[1]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Wrapper>
        <button
          className={`dropdown-button ${hasValue ? "active" : ""}`}
          aria-controls={open ? "date-filter-dropdown-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          disabled={disabled}
        >
          {startIcon && <span style={{ marginRight: "6px", display: "flex", alignItems: "center" }}>{startIcon}</span>}
          <Label>{displayLabel}</Label>
          <ArrowDropDown 
            sx={{
              color: "primary.main",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }} 
            className="dropdown-icon" 
          />
        </button>
        <DropdownMenu
          id="date-filter-dropdown-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "date-filter-dropdown-menu",
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box>
                <Label sx={{ color: "#999", fontSize: "11px", mb: 0.5 }}>From</Label>
                <Box
                  sx={(theme) => ({
                    backgroundColor: "#111",
                    border: `1px solid ${alpha("#fff", 0.12)}`,
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: value?.[0] ? "#fff" : "#666",
                    minWidth: "100px",
                  })}
                >
                  {value?.[0] ? dayjs(value[0]).format("MM/DD/YYYY") : "Enter date"}
                </Box>
              </Box>
              <Box>
                <Label sx={{ color: "#999", fontSize: "11px", mb: 0.5 }}>To</Label>
                <Box
                  sx={(theme) => ({
                    backgroundColor: "#111",
                    border: `1px solid ${alpha("#fff", 0.12)}`,
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: value?.[1] ? "#fff" : "#666",
                    minWidth: "100px",
                  })}
                >
                  {value?.[1] ? dayjs(value[1]).format("MM/DD/YYYY") : "Enter date"}
                </Box>
              </Box>
            </Box>
            <StaticDateRangePicker
              value={value}
              onChange={onChange}
              calendars={1}
              displayStaticWrapperAs="desktop"
              sx={(theme) => ({
                backgroundColor: "transparent",
                "& .MuiPickersLayout-root": {
                  backgroundColor: "transparent",
                },
                "& .MuiDateRangePickerToolbar-root": {
                  display: "none",
                },
                "& .MuiPickersCalendarHeader-root": {
                  color: "#fff",
                  "& .MuiPickersCalendarHeader-label": {
                    color: theme.palette.secondary.gold || "#DBA42D",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                  "& .MuiIconButton-root": {
                    color: "#fff",
                  },
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  color: "#999",
                  fontSize: "12px",
                },
                "& .MuiPickersDay-root": {
                  color: "#fff",
                  fontSize: "12px",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.secondary.gold || "#DBA42D", 0.2),
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.gold || "#DBA42D",
                    color: "#000",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.secondary.gold || "#DBA42D", 0.85),
                    },
                  },
                  "&.MuiPickersDay-dayOutsideMonth": {
                    color: "#444",
                  },
                },
                "& .MuiDateRangePickerDay-rangeIntervalDayHighlight": {
                  backgroundColor: alpha(theme.palette.secondary.gold || "#DBA42D", 0.15),
                },
                "& .MuiDateRangePickerDay-rangeIntervalDayHighlightStart": {
                  borderTopLeftRadius: "50%",
                  borderBottomLeftRadius: "50%",
                },
                "& .MuiDateRangePickerDay-rangeIntervalDayHighlightEnd": {
                  borderTopRightRadius: "50%",
                  borderBottomRightRadius: "50%",
                },
                "& .MuiPickersLayout-actionBar": {
                  display: "none",
                },
              })}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <Button
                onClick={handleReset}
                sx={{
                  color: "#999",
                  fontSize: "12px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#fff",
                  },
                }}
              >
                Reset
              </Button>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={handleCancel}
                  sx={{
                    color: "#E75153",
                    fontSize: "12px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: alpha("#E75153", 0.1),
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApply}
                  variant="contained"
                  sx={(theme) => ({
                    backgroundColor: theme.palette.secondary.gold || "#DBA42D",
                    color: "#000",
                    fontSize: "12px",
                    textTransform: "none",
                    borderRadius: "6px",
                    padding: "6px 16px",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.secondary.gold || "#DBA42D", 0.85),
                    },
                  })}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
        </DropdownMenu>
      </Wrapper>
    </LocalizationProvider>
  );
};

export default DateFilterDropdown;
