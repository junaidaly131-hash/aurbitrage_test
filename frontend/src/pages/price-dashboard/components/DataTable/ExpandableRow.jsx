import { useContext, useMemo, useCallback } from "react";
import { Tooltip } from "@mui/material";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import FavoritesShortlistsButtons from "./FavoritesShortlistsButtons";
import { renderNotes, renderPrice } from "./utils";
import {
  Icons,
  InfoButton,
  InfoIcon,
  PNull,
  StyledRow,
  Title,
  ToolTipTitle,
  TableCell,
  EllipsisCell,
  FlexCell,
  ViewMore,
} from "./styles";
import { MEDIA_QUERY_WIDTH, useLayout } from "@/Context/LayoutContext";
import ArrowDownTriple from "@/components/Icons/ArrowDownTriple";
import { SetSelectedConversation, UpdateSidebarType } from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDealerGroupChat from "@/pages/messages/hooks/useDealerGroupChat";
import PriceMenu from "@/components/PriceMenu";

const ExpandableRow = ({
  data,
  handleRowClick,
  rowIndex,
  expandedRow,
  title = "",
  isExpandable,
  rowColor,
  index,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { findOrCreateDealerGroup, isProcessing } = useDealerGroupChat();

  const ask = useMemo(() => data?.ask || [], [data]);
  const bid = useMemo(() => data?.bid || [], [data]);
  const ind = isExpandable ? 0 : index;
  const {
    displayPrice,
    numTopPicks: depth,
    spotPrices,
  } = useContext(PricingDashboardContext);
  const { isSidebarOpen, isTitleExpanded } = useLayout();

  const bidValue = useCallback((i) => bid[i] || null, [bid]);
  const askValue = useCallback((i) => ask[i] || null, [ask]);

  const handleCheckAvailability = async (value) => {
    const { aurbitrageSkuId, index, type, data } = value;

    try {
      const specificEntry = type === "bid" ? bidValue(index) : askValue(index);
      const dealerId = specificEntry?.dealerId || specificEntry?.info?.dealerId;
      const dealerName =
        specificEntry?.dealerName ||
        specificEntry?.info?.dealerName ||
        specificEntry?.dealer ||
        specificEntry?.info?.dealer;

      if (!dealerName) {
        dispatch(
          SetSelectedConversation({
            dealer: "Unknown Dealer",
            chatType: "direct",
          }),
        );
        dispatch(UpdateSidebarType("CHAT"));
        navigate(
          `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=Unknown&&trade=${type}&&index=${index}`,
        );
        return;
      }

      await findOrCreateDealerGroup(
        dealerId,
        dealerName,
        aurbitrageSkuId,
        type,
        index,
      );
    } catch (error) {
      const specificEntry = type === "bid" ? bidValue(index) : askValue(index);
      const dealerName =
        specificEntry?.dealerName || specificEntry?.dealer || "Unknown Dealer";
      dispatch(
        SetSelectedConversation({
          dealer: dealerName,
          chatType: "direct",
        }),
      );
      dispatch(UpdateSidebarType("CHAT"));
      navigate(
        `/dashboard/messages?arbitrageSku=${aurbitrageSkuId}&&skuDealerName=${dealerName}&&trade=${type}&&index=${index}`,
      );
    }
  };

  const expanded = expandedRow === rowIndex;
  const hasLength = ask.length > 0 || bid.length > 0;
  const expandTitle =
    window.innerWidth > MEDIA_QUERY_WIDTH ? !isSidebarOpen : isTitleExpanded;
  const titleWidth = expandTitle
    ? "500px"
    : window.innerWidth > 1560
      ? "300px"
      : "210px";

  const bidPrice =
    bidValue(ind)?.price !== undefined
      ? renderPrice(
          displayPrice,
          spotPrices,
          bidValue(ind),
          (bidValue(ind)?.notes || bidValue(ind)?.shippingNote) && (
            <Tooltip
              title={<ToolTipTitle>{renderNotes(bidValue(ind))}</ToolTipTitle>}
            >
              <InfoButton>
                <InfoIcon />
              </InfoButton>
            </Tooltip>
          ),
          "bidData",
          true,
        )
      : {};
  const askPrice =
    askValue(ind)?.price !== undefined
      ? renderPrice(
          displayPrice,
          spotPrices,
          askValue(ind),
          (askValue(ind)?.notes || askValue(ind)?.shippingNote) && (
            <Tooltip
              title={<ToolTipTitle>{renderNotes(askValue(ind))}</ToolTipTitle>}
            >
              <InfoButton>
                <InfoIcon />
              </InfoButton>
            </Tooltip>
          ),
          "askData",
          true,
        )
      : {};
  return (
    <StyledRow
      onClick={() => isExpandable && handleRowClick("expand", rowIndex)}
      rowColor={rowColor}
      {...props}
    >
      <TableCell width={titleWidth} className="left">
        <FlexCell>
          <Icons width="52px">
            {isExpandable && (
              <FavoritesShortlistsButtons
                item={data}
                handleRowClick={handleRowClick}
              />
            )}
          </Icons>
          <EllipsisCell align="left" className="title-tooltip">
            <Tooltip title={title}>
              <Title style={expanded && hasLength ? { paddingTop: "0px" } : {}}>
                {title}
              </Title>
            </Tooltip>
          </EllipsisCell>
        </FlexCell>
      </TableCell>

      {bidValue(ind)?.price !== undefined ? (
        <>
          <TableCell width="120px">
            <EllipsisCell>
              {bidValue(ind)?.sourceTable == "DealerMasterPricelists"
                ? bidValue(ind)?.dealer + " Custom"
                : bidValue(ind)?.dealer +
                  (bidValue(ind)?.sourceTable == "API" ? " API" : "")}
            </EllipsisCell>
          </TableCell>
          <TableCell width="190px">
            <PriceMenu
              data={{
                ...bidPrice,
                info: bidValue(ind),
              }}
              aurbitrageSkuId={data?.aurbitrageSkuId}
              index={index}
              type="bid"
              loading={isProcessing}
              handleCheckAvailability={handleCheckAvailability}
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell width="120px" />
          <TableCell width="190px" />
        </>
      )}

      {askValue(ind)?.price !== undefined ? (
        <>
          <TableCell width="190px">
            <PriceMenu
              data={{
                ...askPrice,
                info: askValue(ind),
              }}
              aurbitrageSkuId={data?.aurbitrageSkuId}
              index={index}
              loading={isProcessing}
              handleCheckAvailability={handleCheckAvailability}
            />
          </TableCell>
          <TableCell width="120px">
            <EllipsisCell>
              {askValue(ind)?.sourceTable == "DealerMasterPricelists"
                ? askValue(ind)?.dealer + " Custom"
                : askValue(ind)?.dealer +
                  (askValue(ind)?.sourceTable == "API" ? " API" : "")}
            </EllipsisCell>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell width="190px" />
          <TableCell width="120px" />
        </>
      )}

      <PNull
        width="48px"
        opacity={ask.length > depth || bid.length > depth ? "1" : "0"}
      >
        {isExpandable && (ask.length > depth || bid.length > depth) && (
          <ViewMore>
            <ArrowDownTriple
              icon={expanded ? faCaretUp : faCaretDown}
              className="mr-0"
            />
          </ViewMore>
        )}
      </PNull>
    </StyledRow>
  );
};

export default ExpandableRow;
