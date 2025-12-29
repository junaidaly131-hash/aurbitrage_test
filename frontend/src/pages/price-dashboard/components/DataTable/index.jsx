import React, { useEffect, useState, useContext } from "react";
import { CircularProgress, Tooltip, Box } from "@mui/material";
import TableRow from "./TableRow";
import { getMetalColor } from "./utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  Loader,
  PriceTableContainer,
  TableHeaderRow,
  Th,
  EllipsisCell,
  FlexCell,
  ViewMore,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { MEDIA_QUERY_WIDTH, useLayout } from "@/Context/LayoutContext";
import useSaveShortlistFavSku from "../../hooks/useSaveShortlistFavSku";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import {
  sortDataByName,
  sortGoldCoins,
  sortSilverCoins,
  getMeltPrice,
  calculatePrice,
} from "./utils";

import { Silver_Sub_Categories } from "./CoinsSort";
import SortableTableHeader from "../SortHeader";
dayjs.extend(duration);
const DataTable = ({
  title: subCategory,
  category,
  rowData,
  isSingleSection,
}) => {
  const { isSidebarOpen, toggleSidebar, isTitleExpanded, toggleTitle } =
    useLayout();
  const { saveShortlistFavSku } = useSaveShortlistFavSku();
  const [expandedRow, toggleSidebarRow] = useState(null);
  const [redirectDropdown, setRedirectDropdown] = useState(false);
  const { spotPrices, searchFilter } = useContext(PricingDashboardContext);

  const setRowData = () => {
    if (searchFilter != "") {
      return rowData;
    } else {
      let sorted = sortDataByName(rowData);
      if (category === "Gold Pre-33 Coins") {
        sorted = sortGoldCoins(sorted);
      }
      if (
        category === "Silver Pre-65 Coins" &&
        Silver_Sub_Categories.includes(subCategory)
      ) {
        sorted = sortSilverCoins(sorted);
      }
      return sorted;
    }
  };

  const [sortedData, setSortedData] = useState(setRowData());
  const [initialData, setInitialData] = useState(setRowData());
  const [sort, setSort] = useState({});
  //If Type is favorite or shortlist then index will have aurbitrageSkuId else it will have row index
  const handleRowClick = (type, index) => {
    if (type === "favorite" || type === "shortlist") {
      saveShortlistFavSku(index, type);
    } else if (type === "expand") {
      toggleSidebarRow((prevExpandedRow) =>
        prevExpandedRow === index ? null : index,
      );
    }
  };
  const styles = {
    categoryText: (color) => ({
      color: color,
    }),
  };
  const clr = getMetalColor(rowData);

  const handleExpand = () => {
    window.innerWidth > 1200
      ? toggleSidebar(!isSidebarOpen)
      : toggleTitle(!isTitleExpanded);
  };
  const expandTitle =
    window.innerWidth > MEDIA_QUERY_WIDTH ? !isSidebarOpen : isTitleExpanded;
  const titleWidth = expandTitle
    ? "500px"
    : window.innerWidth > 1560
      ? "300px"
      : "210px";

  const handleSort = (newSort) => {
    setSort(newSort);
  };

  const sortItems = (items, type, order = "asc") => {
    if (!items || !Array.isArray(items)) return [];

    const priceType = type?.toLowerCase();

    const definedItems = [];
    const undefinedItems = [];

    for (const item of items) {
      const priceItem = item?.[priceType]?.[0];
      if (priceItem === undefined) {
        undefinedItems.push(item);
      } else {
        const meltPrice = getMeltPrice(item, priceType, spotPrices);
        const calculatedPrice = calculatePrice(priceItem, meltPrice);
        definedItems.push({ item, calculatedPrice });
      }
    }

    definedItems.sort((a, b) => {
      return order === "asc"
        ? a.calculatedPrice - b.calculatedPrice
        : b.calculatedPrice - a.calculatedPrice;
    });

    return [...definedItems.map((i) => i.item), ...undefinedItems];
  };

  useEffect(() => {
    if (sort?.order) {
      if (sort.order === "default") {
        setSortedData(initialData);
      } else {
        const sorted = sortItems([...rowData], sort.sort, sort.order);
        setSortedData(sorted);
      }
    }
  }, [sort]);

  if (
    !rowData.some((item) => item.ask.length > 0 || item.bid.length > 0) &&
    !isSingleSection
  ) {
    return <></>;
  }
  return (
    <PriceTableContainer>
      <table className="outer-table">
        <thead>
          <TableHeaderRow>
            <Th
              width={titleWidth}
              style={styles.categoryText(clr)}
              className="title"
            >
              <EllipsisCell align="left">
                <FlexCell>
                  <Tooltip title={subCategory}>{subCategory}</Tooltip>
                </FlexCell>
              </EllipsisCell>
              <Box onClick={handleExpand}>
                <ViewMore>
                  {!expandTitle ? "Expand" : "Collapse"}
                  <FontAwesomeIcon
                    size="xl"
                    icon={!expandTitle ? faCaretRight : faCaretLeft}
                    className="mr-0"
                  />
                </ViewMore>
              </Box>
            </Th>
            <Th width={"120px"}>Bid Dealer</Th>
            <SortableTableHeader
              label="Bid"
              sortKey="Bid"
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHeader
              label="Ask"
              sortKey="Ask"
              sort={sort}
              onSort={handleSort}
            />
            <Th width={"120px"}>Ask Dealer</Th>
            <Th width={"48px"}></Th>
          </TableHeaderRow>
        </thead>
        <tbody>
          {Array.isArray(sortedData) && sortedData.length > 0 ? (
            sortedData.map((item, rowIndex) => {
              return (
                <TableRow
                  key={rowIndex}
                  item={item}
                  rowIndex={rowIndex}
                  expandedRow={expandedRow}
                  handleRowClick={handleRowClick}
                  redirectDropdown={redirectDropdown}
                  setRedirectDropdown={setRedirectDropdown}
                />
              );
            })
          ) : (
            <tr>
              <Loader>
                <CircularProgress />
              </Loader>
            </tr>
          )}
        </tbody>
      </table>
    </PriceTableContainer>
  );
};

export default DataTable;
