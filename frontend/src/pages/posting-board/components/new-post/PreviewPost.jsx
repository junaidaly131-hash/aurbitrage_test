import { useState } from "react";
import { Button, CardContent, Chip, Box } from "@mui/material";
import dayjs from "dayjs";
import Rocket from "@/assets/images/rocket.svg";
import Copy from "@/assets/images/copy.svg";
import EmailIcon from "@/assets/images/email 1.svg";

import { useAuth } from "@/Context/AuthContext";
import PriceFormatter from "@/pages/price-dashboard/components/DataTable/PriceFormatter";
import { useSpotPrices } from "@/Context/SpotPricesContext";
import CallIconOutline from "@/assets/images/call-icon-outline.png";
import {
  Description,
  Flex,
  NewPostWrapper,
  PostTooltip,
  PostTooltipContent,
  PreviewPostModal,
  PreviewPostWrapper,
  Title,
  TooltipHeader,
} from "./style";
import toast from "react-hot-toast";
import PostHeader from "../posting-content/PostHeader";
import PostContent from "../posting-content/PostContent";
import { MobileActionButtons } from "./styles";

const PreviewPost = ({
  isOpen,
  handleClose,
  postType,
  postContent,
  postHeader,
  enableDeal,
  selectedMetals,
  priceData,
  priceType,
  spotType,
  startDate,
  endDate,
  startTime,
  endTime,
  postImages,
  showEmail,
  postUser,
  bgColor,
  onAddPostClick,
}) => {
  const { spotPrices } = useSpotPrices();
  const user = useAuth();
  const { userName, email, phoneNo, dealerName } = user;
  const isWithInDateRange = (startDate, endDate, startTime, endTime) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const isWithinDateRange = currentDate >= start && currentDate <= end;

    if (!isWithinDateRange) {
      return false;
    }

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (startTotalMinutes <= endTotalMinutes) {
      return (
        currentTotalMinutes >= startTotalMinutes &&
        currentTotalMinutes <= endTotalMinutes
      );
    } else {
      return (
        currentTotalMinutes >= startTotalMinutes ||
        currentTotalMinutes <= endTotalMinutes
      );
    }
  };
  const showButtons = () => {
    if (!enableDeal) return null;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {postType === "Sell" && (
          <Chip
            label="BUY"
            variant="contained"
            sx={{
              marginRight: 1,
              color: "#DBA42D",
              backgroundColor: "transparent",
              borderColor: "#DBA42D",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            disabled={
              (!isWithInDateRange(startDate, endDate, startTime, endTime) &&
                priceType === "spot") ||
              !isMarketOpen()
            }
          />
        )}

        {postType === "Buy" && (
          <Chip
            label="SELL"
            variant="contained"
            sx={{
              marginRight: 1,
              color: "#DBA42D",
              backgroundColor: "transparent",
              borderColor: "#DBA42D",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            disabled={
              (!isWithInDateRange(startDate, endDate, startTime, endTime) &&
                priceType === "spot") ||
              !isMarketOpen()
            }
          />
        )}

        <Chip
          label="MAKE OFFER"
          variant="contained"
          sx={{
            color: "#DBA42D",
            backgroundColor: "transparent",
            borderColor: "#DBA42D",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          disabled={!isMarketOpen()}
        />
      </Box>
    );
  };
  const findSpotPrice = (metal, spotType) => {
    const metalPrice = spotPrices.find((item) => item.metals === metal);
    if (metalPrice) {
      let sType = "";
      if (spotType === "Ask") {
        sType = `${metal}: Ask - ${metalPrice.ask}`;
      } else if (spotType === "Bid") {
        sType = `${metal}: Bid - ${metalPrice.bid}`;
      }

      return (
        <Chip
          key={metal}
          label={sType}
          sx={{
            fontSize: "12px",
            padding: "5px",
            color: "#DBA42D",
            backgroundColor: "transparent",
            borderColor: "#DBA42D",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          align="Center"
        />
      );
    }
    return null;
  };
  const isMarketOpen = () => {
    const startHour = 6; // 6 AM PST
    const endHour = 14; // 2 PM PST
    const current = new Date();
    const currentPST = new Date(
      current?.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
    );
    const currentTimeString = currentPST?.toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const [time, period] = currentTimeString.split(" ");
    const [hour, minute, second] = time.split(":");
    let hourInt = parseInt(hour, 10);
    if (period == "PM" && hourInt != 12) {
      hourInt += 12;
    } else if (period == "AM" && hourInt == 12) {
      hourInt -= 12;
    }
    return hourInt >= startHour && hourInt < endHour;
  };
  const [tooltip, setTooltip] = useState(false);
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast("Text Copied!");
  };

  const handleMouseEnter = () => {
    setTooltip(true);
  };
  const handleMouseLeave = () => {
    setTooltip(false);
  };
  const marketClosedMessage =
    "MARKET CLOSED – Please contact the trader directly to confirm any deal";
  return (
    <PreviewPostModal open={isOpen} onClose={handleClose}>
      <NewPostWrapper style={{ backgroundColor: bgColor }}>
        <Flex>
          <PostHeader
            post={{
              postType,
              user: postUser || {
                firstName: userName.split(" ")[0],
                lastName: userName.split(" ")[1],
                dealer: { dealerName },
                phoneNo,
                email,
              },
              postTime: dayjs().format("MMMM DD, YYYY, hh:mm A"),
              updatedAt: dayjs().format("MMMM DD, YYYY, hh:mm A"),
            }}
            isPreview={true}
          />
          <Box>
            <Title>{postHeader}</Title>
          </Box>
          <Description
            dangerouslySetInnerHTML={{ __html: postContent }}
          ></Description>
          <PostContent post={{ PostAssets: postImages }} isPreview={true} />
        </Flex>
        {tooltip && (
          <PostTooltip onMouseOut={handleMouseLeave}>
            <TooltipHeader>Contact Card</TooltipHeader>
            {phoneNo && (
              <PostTooltipContent onMouseOver={handleMouseEnter}>
                <img loading="lazy" src={CallIconOutline} alt="call-icon" />
                <p style={{ color: "#fff" }}>{phoneNo}</p>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <a
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "17px",
                      marginRight: "15px",
                    }}
                    href={`tel:${phoneNo}`}
                  >
                    <img loading="lazy" src={Rocket} alt="" />
                  </a>
                  <img
                    onClick={() => handleCopy(phoneNo)}
                    style={{ marginRight: "20px" }}
                    src={Copy}
                    alt=""
                  />
                </Box>
              </PostTooltipContent>
            )}

            {showEmail && (
              <Box
                onMouseOver={handleMouseEnter}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <img
                  style={{ marginRight: "30px" }}
                  src={EmailIcon}
                  alt="call-icon"
                />
                <p style={{ color: "#fff", marginRight: "10px" }}>{email}</p>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <a
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "17px",
                      marginRight: "15px",
                    }}
                    href={`mailto:${email}`}
                  >
                    <img loading="lazy" src={Rocket} alt="" />
                  </a>
                  <img
                    onClick={() => handleCopy(email)}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                    src={Copy}
                    alt=""
                  />
                </Box>
              </Box>
            )}
          </PostTooltip>
        )}
        <Box>
          {enableDeal && (
            <>
              <CardContent>
                {priceType === "fixed" ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {!isMarketOpen() && (
                      <Chip
                        label={`${marketClosedMessage}`}
                        sx={{
                          fontSize: "12px",
                          padding: "5px",
                          color: "#DBA42D",
                          backgroundColor: "transparent",
                          borderColor: "#DBA42D",
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      />
                    )}
                    <Chip
                      label={`${priceType} Type`}
                      sx={{
                        fontSize: "12px",
                        padding: "5px",
                        color: "#DBA42D",
                        backgroundColor: "transparent",
                        borderColor: "#DBA42D",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    />
                    <Chip
                      label={
                        <span>
                          Price Data: <PriceFormatter priceData={priceData} />
                        </span>
                      }
                      sx={{
                        fontSize: "12px",
                        padding: "5px",
                        color: "#DBA42D",
                        backgroundColor: "transparent",
                        borderColor: "#DBA42D",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        marginRight: "10px",
                      }}
                    />
                    {showButtons()}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {!isMarketOpen() && (
                        <Chip
                          label={`${marketClosedMessage}`}
                          sx={{
                            fontSize: "12px",
                            padding: "5px",
                            color: "#DBA42D",
                            backgroundColor: "transparent",
                            borderColor: "#DBA42D",
                            borderWidth: "1px",
                            borderStyle: "solid",
                          }}
                        />
                      )}
                      {!!isWithInDateRange(
                        startDate,
                        endDate,
                        startTime,
                        endTime,
                      ) &&
                        isMarketOpen() && (
                          <Chip
                            label={
                              " Outside of auto-confirmation hours, please confirm deal with Trader"
                            }
                            sx={{
                              fontSize: "12px",
                              padding: "5px",
                              color: "#DBA42D",
                              backgroundColor: "transparent",
                              borderColor: "#DBA42D",
                              borderWidth: "1px",
                              borderStyle: "solid",
                            }}
                          />
                        )}
                      <Chip
                        label={`${priceType} Type`}
                        sx={{
                          fontSize: "12px",
                          padding: "5px",
                          color: "#DBA42D",
                          backgroundColor: "transparent",
                          borderColor: "#DBA42D",
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      />
                      {selectedMetals.map((metal, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {findSpotPrice(metal, spotType)}
                        </Box>
                      ))}

                      {showButtons()}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </>
          )}
        </Box>
        <MobileActionButtons>
          <Button variant="contained" onClick={onAddPostClick}>
            Post
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </MobileActionButtons>
      </NewPostWrapper>
    </PreviewPostModal>
  );
};

export default PreviewPost;
