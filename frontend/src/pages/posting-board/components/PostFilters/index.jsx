import { usePostingBoardContext } from "@/Context/PostingBoardContext";
import {
  DateRange,
  StyledBox,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  ExpandIcon,
  Label,
  Title,
  Divider,
  Chips,
  Icon,
  CheckBox,
} from "./style";
import { CenterBox } from "../../style";
import DateRangePicker from "@/components/DateRangePicker";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/material";
import { Check } from "phosphor-react";
import { useState } from "react";
import Chip from "@/components/Chip";
import { Clear } from "@mui/icons-material";

const PostFilters = ({
  handleDateChange,
  firstDate,
  lastDate,
  isDateFilterActive,
}) => {
  const {
    dealerFilter,
    traderFilter,
    postsDealers,
    postsUsers,
    setDealerFilter,
    setTraderFilter,
    setPostsUsers,
    setPostsDealers,
    meta,
    setPostTypeFilter,
    postTypeFilter,
  } = usePostingBoardContext();

  const theme = useTheme();

  const POST_TYPES = ["Buy", "Sell", "Bulletin", "Question", "Automated"];

  const [expandedAccordion, setExpandedAccordion] = useState("dealers");

  const handleDealerfilter = (dealer) => {
    const filteredTraders = dealerFilter.filter((i) => i.id === dealer.id);
    if (filteredTraders.length) {
      setDealerFilter(dealerFilter.filter((i) => i.id !== dealer.id));
    } else {
      setDealerFilter((prev) => [...prev, dealer]);
    }
  };
  const handleTraderfilter = (trader) => {
    const filteredTraders = traderFilter.filter((i) => i.id === trader.id);
    if (filteredTraders.length) {
      setTraderFilter(traderFilter.filter((i) => i.id !== trader.id));
    } else {
      setTraderFilter((prev) => [...prev, trader]);
    }
  };
  const handlePostTypeClick = (selectedType) => {
    const isChecked = postTypeFilter.includes(selectedType);
    if (isChecked) {
      setPostTypeFilter(postTypeFilter.filter((i) => i !== selectedType));
    } else {
      setPostTypeFilter((prev) => [...prev, selectedType]);
    }
  };

  function renderCheckboxList(
    options,
    filters,
    onChange,
    labelKey = (x) => x,
    filterKey = (x) => x,
  ) {
    return (
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={labelKey(option)}
            control={
              <Checkbox
                checked={
                  filters.filter((i) => filterKey(i) === filterKey(option))
                    .length
                }
                onChange={() => onChange(option)}
                sx={{
                  padding: 0,
                  "&:hover": { background: "transparent" },
                }}
                icon={<Icon />}
                checkedIcon={
                  <Icon checked={true}>
                    <Check />
                  </Icon>
                }
              />
            }
            label={<Label variant="body1">{labelKey(option)}</Label>}
          />
        ))}
      </FormGroup>
    );
  }

  return (
    <StyledBox>
      <Title variant="subtitle1">Show</Title>
      <Box>
        {isDateFilterActive() && (
          <CenterBox>
            <DateRange>
              <DateRangePicker
                key="date-filter-active"
                onChange={handleDateChange}
                startDate={firstDate}
                endDate={lastDate}
              />
            </DateRange>
          </CenterBox>
        )}
        {!isDateFilterActive() && (
          <CenterBox>
            <DateRangePicker
              key="date-filter-inactive"
              onChange={handleDateChange}
              startDate={null}
              endDate={null}
            />
          </CenterBox>
        )}
        <Divider />
      </Box>

      {(dealerFilter || []).length > 0 ||
      (traderFilter || []).length > 0 ||
      (postTypeFilter || []).length > 0 ? (
        <Chips>
          {(dealerFilter || []).map((filter, index) => (
            <Chip
              key={`filter-${index + 1}`}
              label={filter.dealerName}
              onDelete={() => handleDealerfilter(filter)}
            ></Chip>
          ))}
          {(traderFilter || []).map((filter, index) => (
            <Chip
              key={`filter-${index + 1}`}
              label={`${filter.firstName} ${filter.lastName}`}
              onDelete={() => handleTraderfilter(filter)}
            ></Chip>
          ))}
          {(postTypeFilter || []).map((filter, index) => (
            <Chip
              key={`filter-${index + 1}`}
              label={filter}
              onDelete={() => handlePostTypeClick(filter)}
            ></Chip>
          ))}
        </Chips>
      ) : null}

      <StyledAccordion
        expanded={expandedAccordion === "dealers"}
        disableGutters
      >
        <StyledAccordionSummary
          onClick={() =>
            setExpandedAccordion(
              expandedAccordion === "dealers" ? null : "dealers",
            )
          }
          expandIcon={<ExpandIcon />}
        >
          <Typography variant="subtitle1">Dealers</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {renderCheckboxList(
            postsDealers || [],
            dealerFilter || [],
            handleDealerfilter,
            (x) => x.dealerName,
            (x) => x.id,
          )}
        </StyledAccordionDetails>
      </StyledAccordion>

      <StyledAccordion
        expanded={expandedAccordion === "traders"}
        disableGutters
      >
        <StyledAccordionSummary
          onClick={() =>
            setExpandedAccordion(
              expandedAccordion === "traders" ? null : "traders",
            )
          }
          expandIcon={<ExpandIcon />}
        >
          <Typography variant="subtitle1">Traders</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {renderCheckboxList(
            postsUsers || [],
            traderFilter || [],
            handleTraderfilter,
            (x) => `${x.firstName} ${x.lastName}`,
            (x) => x.id,
          )}
        </StyledAccordionDetails>
      </StyledAccordion>

      <StyledAccordion expanded={expandedAccordion === "types"} disableGutters>
        <StyledAccordionSummary
          onClick={() =>
            setExpandedAccordion(expandedAccordion === "types" ? null : "types")
          }
          expandIcon={<ExpandIcon />}
        >
          <Typography variant="subtitle1">Types</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {renderCheckboxList(
            POST_TYPES,
            postTypeFilter || [],
            handlePostTypeClick,
          )}
        </StyledAccordionDetails>
      </StyledAccordion>
    </StyledBox>
  );
};
export default PostFilters;
