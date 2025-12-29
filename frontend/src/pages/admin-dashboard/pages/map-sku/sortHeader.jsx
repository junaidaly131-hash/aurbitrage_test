import React from "react";
import { useTheme } from "@mui/material/styles";

import TableCell from "@mui/material/TableCell";
import {
  faSort,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSortableTableCell } from "../../styles";
const SortableTableHeader = ({ label, sortKey, sort, onSort }) => {
  const isSorted = sort.sort === sortKey;
  const theme = useTheme();

  const handleSortClick = () => {
    let order;
    if (sort?.order === "asc") {
      order = "desc";
    } else if (sort?.order === "desc") {
      order = sortKey === "Bid" || sortKey === "Ask" ? "default" : "asc";
    } else {
      order = "asc";
    }
    onSort({ sort: sortKey, order });
  };

  return (
    <StyledSortableTableCell label={label} onClick={handleSortClick}>
      {label}
      {isSorted && sort.order === "desc" && (
        <span className="sort">
          <FontAwesomeIcon icon={faCaretDown} className="stackIcon" />
        </span>
      )}
      {isSorted && sort.order === "asc" && (
        <span className="sort">
          <FontAwesomeIcon icon={faCaretUp} className="stackIcon" />
        </span>
      )}
      {(!isSorted || sort.order === "default") && (
        <span className="sort">
          <FontAwesomeIcon icon={faSort} className="stackIcon" />
        </span>
      )}
    </StyledSortableTableCell>
  );
};

export default SortableTableHeader;
