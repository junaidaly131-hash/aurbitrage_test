import React from "react";
import { Box, Chip, CardContent } from "@mui/material";
import PriceFormatter from "@/pages/price-dashboard/components/DataTable/PriceFormatter";
import { StyledBox } from "./style";
const PostDeal = ({ post, userId, handleOpenModal, findSpotPrice }) => {
  const marketClosedMessage =
    "MARKET CLOSED – Please contact the trader directly to confirm any deal";
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
  const showButtons = (post, handleOpenModal) => {
    if (
      !(
        post.enableDeal &&
        !post.PostDeals[0]?.isClosed &&
        post.userId != userId
      )
    )
      return null;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {post.postType === "Sell" && (
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
              (!isWithInDateRange(
                post.PostDeals[0]?.startDate,
                post.PostDeals[0]?.endDate,
                post.PostDeals[0]?.startTime,
                post.PostDeals[0]?.endTime,
              ) &&
                post.PostDeals[0]?.priceType === "spot") ||
              !isMarketOpen()
            }
            onClick={() => handleOpenModal("BUY")}
          />
        )}

        {post.postType === "Buy" && (
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
              (!isWithInDateRange(
                post.PostDeals[0]?.startDate,
                post.PostDeals[0]?.endDate,
                post.PostDeals[0]?.startTime,
                post.PostDeals[0]?.endTime,
              ) &&
                post.PostDeals[0]?.priceType === "spot") ||
              !isMarketOpen()
            }
            onClick={() => handleOpenModal("SELL")}
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
  const isMarketOpen = () => {
    const startHour = 6; // 6 AM PST
    const endHour = 14; // 2 PM PST
    const current = new Date();
    const currentPST = new Date(
      current.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
    );
    const currentTimeString = currentPST.toLocaleTimeString("en-US", {
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
  return post.enableDeal && post.PostDeals && post.PostDeals.length > 0 ? (
    <StyledBox>
      {post.PostDeals.map((deal, index) => {
        let withinDealWindow = false;
        if (deal.priceType === "spot") {
          withinDealWindow = isWithInDateRange(
            deal.startDate,
            deal.endDate,
            deal.startTime,
            deal.endTime,
          );
        }

        return (
          <CardContent key={index}>
            {deal.priceType === "fixed" ? (
              <Box className="mainBox">
                {/* Show Market Closed Message */}
                {!isMarketOpen() && !post.PostDeals[0]?.isClosed && (
                  <Chip
                    label={`${marketClosedMessage}`}
                    className="chipStyle"
                  />
                )}

                {/* Deal Type */}
                <Chip label={`${deal.priceType} Type`} className="chipStyle" />

                {/* Price Data */}
                <Chip
                  label={
                    <span>
                      Price Data: <PriceFormatter priceData={deal.priceData} />
                    </span>
                  }
                  className="chipStyle"
                />
                {showButtons(post, handleOpenModal)}
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Box className="mainBox">
                  {/* Outside of Auto-Confirmation Hours */}
                  {!withinDealWindow && isMarketOpen() && (
                    <Chip
                      label={
                        " Outside of auto-confirmation hours, please confirm deal with Trader"
                      }
                      className="chipStyle"
                    />
                  )}

                  {/* Deal Type */}
                  <Chip
                    label={`${deal.priceType} Type`}
                    className="chipStyle"
                  />

                  {/* Metal Spot Price */}
                  {deal.metal.map((metal, idx) => (
                    <Box key={idx} className="metalPriceBox">
                      {findSpotPrice(metal, deal.spotType)}
                    </Box>
                  ))}
                  {showButtons(post, handleOpenModal)}
                </Box>
              </Box>
            )}
          </CardContent>
        );
      })}
    </StyledBox>
  ) : null;
};
export default PostDeal;
