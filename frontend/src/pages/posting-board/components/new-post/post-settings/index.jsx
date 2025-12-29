import { useEffect, useRef } from "react";
import {
  Box,
  Switch,
  Select,
  MenuItem,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  TextField,
  Typography,
  FormGroup,
} from "@mui/material";
import DateTimePicker from "../DateSelector";
import {
  StyledBox,
  StyleDiv,
  SettingsWrapper,
  SettingTitle,
  OptionsWrapper,
  FlexCenter,
  FormControler,
  Deals,
  PostProfileWrapper,
} from "./style";
import { styled } from "@mui/system";
import {
  CheckBox,
  ExpandIcon,
  Icon,
  Label,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from "../../PostFilters/style";
import { Check } from "phosphor-react";
import PostUser from "../PostUser";

const PostSettings = ({
  allowComments,
  setAllowComments,
  allowMessages,
  setTextPost,
  allowTextPost,
  setAllowMessages,
  showEmail,
  setShowEmail,
  hideUsername,
  setHideUsername,
  postType,
  enableDeal,
  setEnableDeal,
  priceType,
  setPriceType,
  priceOption,
  setPriceOption,
  priceData,
  setPriceData,
  startDate,
  endDate,
  startTime,
  endTime,
  handleStartDateChange,
  handleEndDateChange,
  handleStartTimeChange,
  handleEndTimeChange,
  selectedMetals,
  handleMetalChange,
  spotType,
  setSpotType,
  setContactBefore,
  handleSetPostType,
  viewPostType,
}) => {
  const dealsRef = useRef(null);
  const togglesParentRef = useRef(null);

  useEffect(() => {
    if (enableDeal && dealsRef.current && togglesParentRef.current) {
      const parent = togglesParentRef.current;
      const target = dealsRef.current;

      // Adjust scroll inside the parent container
      parent.scrollTo({
        top: target.offsetTop - parent.offsetTop, // Scroll relative to the parent
        behavior: "smooth",
      });
    }
  }, [enableDeal]);

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

  function renderCheckboxList(options, handleSetPostType, value) {
    return (
      <FormGroup>
        {options.map((option) => (
          <FormControler
            key={option}
            control={
              <CheckBox
                checked={value === option}
                onChange={() => handleSetPostType(option)}
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
            label={<Label variant="body1">{option}</Label>}
          />
        ))}
      </FormGroup>
    );
  }

  return (
    <SettingsWrapper>
      <PostProfileWrapper>
        <PostUser />
      </PostProfileWrapper>
      <StyledBox>
        <SettingTitle variant="h3">Post Settings</SettingTitle>
        <PostProfileWrapper>
          <StyleDiv>
            <StyledAccordion disableGutters>
              <StyledAccordionSummary expandIcon={<ExpandIcon />}>
                <Typography variant="subtitle1">Post Type</Typography>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                {renderCheckboxList(
                  [
                    "Looking to Buy",
                    "Looking to Sell",
                    "General Bulletin",
                    "Ask a Question",
                  ],
                  handleSetPostType,
                  viewPostType,
                )}
              </StyledAccordionDetails>
            </StyledAccordion>
            {/* <Dropdown
            newpost={true}
            dropdown={dropdown}
            setDropdown={setDropdown}
            value={<span>{viewPostType ? viewPostType : "Post Type"}</span>}
            setValue={handleSetPostType}
            options={[
              "Looking to Buy",
              "Looking to Sell",
              "General Bulletin",
              "Ask a Question",
            ]}
          /> */}
            {/* <Required>*</Required> */}
          </StyleDiv>
        </PostProfileWrapper>

        <OptionsWrapper ref={togglesParentRef}>
          <FlexCenter>
            <Typography variant="body1">Allow Comments</Typography>
            <FormControler
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              control={<IOSSwitch />}
            />
          </FlexCenter>
          <FlexCenter>
            <Typography variant="body1">Color Boost</Typography>
            <FormControler
              checked={allowTextPost}
              onChange={(e) => setTextPost(e.target.checked)}
              control={<IOSSwitch />}
            />
          </FlexCenter>

          <FlexCenter>
            <Typography variant="body1">Allow Messages</Typography>
            <FormControler
              checked={allowMessages}
              onChange={(e) => setAllowMessages(e.target.checked)}
              control={<IOSSwitch />}
            />
          </FlexCenter>

          <FlexCenter>
            <Typography variant="body1">Show My Email</Typography>
            <FormControler
              checked={showEmail}
              onChange={(e) => setShowEmail(e.target.checked)}
              control={<IOSSwitch />}
            />
          </FlexCenter>
          <FlexCenter>
            <Typography variant="body1">Hide Username</Typography>
            <FormControler
              checked={hideUsername}
              onChange={(e) => setHideUsername(e.target.checked)}
              control={<IOSSwitch />}
            />
          </FlexCenter>
          {postType != "" &&
            postType != "Bulletin" &&
            postType != "Question" && (
              <>
                <FlexCenter>
                  <Typography variant="body1">Allow Deals</Typography>
                  <FormControler
                    checked={enableDeal}
                    onChange={() => {
                      setEnableDeal((prevState) => {
                        setContactBefore(prevState);
                        return !prevState;
                      });
                    }}
                    control={<IOSSwitch defaultChecked />}
                  />
                </FlexCenter>
              </>
            )}
          {enableDeal && (
            <>
              <Deals ref={dealsRef}>
                <Typography variant="body1">The Deal is based on:</Typography>

                <Select
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value)}
                  displayEmpty
                  sx={{ width: 150 }}
                >
                  <MenuItem value="spot">Spot Price</MenuItem>
                  <MenuItem value="fixed">Fixed Price</MenuItem>
                </Select>
              </Deals>

              {priceType === "fixed" ? (
                <>
                  <FormControl>
                    <FormLabel>Price Option</FormLabel>
                    <RadioGroup
                      row
                      value={priceOption}
                      onChange={(e) => setPriceOption(e.target.value)}
                    >
                      <FormControler
                        value="flat"
                        control={<Radio />}
                        sx={{ color: "white" }}
                        label="Flat Price"
                      />
                      <FormControler
                        value="perCoin"
                        control={<Radio />}
                        sx={{ color: "white" }}
                        label="Price per Coin"
                      />
                    </RadioGroup>
                  </FormControl>
                  {priceOption === "flat" && (
                    <Box>
                      <FormLabel>Flat Price</FormLabel>
                      <TextField
                        fullWidth
                        id="flat-price"
                        value={priceData}
                        onChange={(e) => setPriceData(e.target.value)}
                      />
                    </Box>
                  )}
                  {priceOption === "perCoin" && (
                    <Box>
                      <FormLabel>Price per Coin</FormLabel>
                      <TextField
                        fullWidth
                        id="price-per-coin"
                        value={priceData}
                        onChange={(e) => setPriceData(e.target.value)}
                      />
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <Box>
                    <DateTimePicker
                      startDate={startDate}
                      endDate={endDate}
                      startTime={startTime}
                      endTime={endTime}
                      handleStartDateChange={handleStartDateChange}
                      handleEndDateChange={handleEndDateChange}
                      handleStartTimeChange={handleStartTimeChange}
                      handleEndTimeChange={handleEndTimeChange}
                    />
                  </Box>

                  <Box className="dealTypeText">
                    <Typography variant="body1">Metals:</Typography>
                    <Select
                      multiple
                      value={selectedMetals}
                      onChange={handleMetalChange}
                      displayEmpty
                      sx={{ width: 200 }}
                    >
                      <MenuItem value="Gold">Gold</MenuItem>
                      <MenuItem value="Silver">Silver</MenuItem>
                      <MenuItem value="Platinum">Platinum</MenuItem>
                      <MenuItem value="Palladium">Palladium</MenuItem>
                      <MenuItem value="Rhodium">Rhodium</MenuItem>
                    </Select>
                  </Box>

                  <Deals>
                    <Typography variant="body1">Spot Type:</Typography>

                    <Select
                      value={spotType}
                      onChange={(e) => setSpotType(e.target.value)}
                      displayEmpty
                      sx={{ width: 200 }}
                    >
                      <MenuItem value="Bid">Bid</MenuItem>
                      <MenuItem value="Ask">Ask</MenuItem>
                    </Select>
                  </Deals>
                </>
              )}
            </>
          )}
        </OptionsWrapper>
      </StyledBox>
    </SettingsWrapper>
  );
};

export default PostSettings;
