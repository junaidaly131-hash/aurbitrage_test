import { useState, useEffect } from "react";
import { IconButton, Switch, Typography, styled } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import {
  Container,
  RowContainer,
  ColumnContainer,
  Label,
  DateTimeInput,
  CustomFormControlLabel,
} from "./style";

const DateTimePicker = ({
  startDate,
  endDate,
  startTime,
  endTime,
  handleStartDateChange,
  handleEndDateChange,
  handleStartTimeChange,
  handleEndTimeChange,
  resetDateTimeRange,
}) => {
  const [is24Hours, setIs24Hours] = useState(false);

  useEffect(() => {
    if (is24Hours) {
      handleStartTimeChange({ target: { value: "00:00" } });
      handleEndTimeChange({ target: { value: "23:59" } });
    }
  }, [is24Hours, handleStartTimeChange, handleEndTimeChange]);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 40,
    height: 24,
    padding: 0,
    margin: 0,
    marginRight: theme.spacing(1.5),

    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 3,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        ".MuiSwitch-thumb": {
          color: theme.palette.secondary.main,
        },
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.background.dark3,
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: theme.palette.background.grey,
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.background.grey,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 18,
      height: 18,
      color: theme.palette.background.grey,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.background.dark3,
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Container>
      <Typography variant="body1">
        Select Dates, Times for Automatic Confirmation
      </Typography>

      <CustomFormControlLabel
        control={
          <IOSSwitch
            checked={is24Hours}
            onChange={() => setIs24Hours(!is24Hours)}
            color="primary"
          />
        }
        label="Allow 24 hr trading"
      />
      <RowContainer>
        <ColumnContainer>
          <Label variant="subtitle1">Start Date:</Label>
          <DateTimeInput
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </ColumnContainer>
        <ColumnContainer>
          <Label variant="subtitle1">End Date:</Label>
          <DateTimeInput
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </ColumnContainer>
        {!is24Hours && (
          <>
            <ColumnContainer>
              <Label variant="subtitle1">Start Time:</Label>
              <DateTimeInput
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </ColumnContainer>
            <ColumnContainer>
              <Label variant="subtitle1">End Time:</Label>
              <DateTimeInput
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </ColumnContainer>
          </>
        )}
        {(startDate || endDate || startTime || endTime) && (
          <IconButton sx={{ marginLeft: "5px" }} onClick={resetDateTimeRange}>
            <HighlightOffIcon style={{ color: "$fff" }} />
          </IconButton>
        )}
      </RowContainer>
    </Container>
  );
};

export default DateTimePicker;
