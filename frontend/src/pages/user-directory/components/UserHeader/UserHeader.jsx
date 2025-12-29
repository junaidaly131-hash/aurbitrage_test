import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { StyledTableCell } from "./styles";

const UserHeader = ({ label, sortKey, sort, onSort }) => {
  const isSorted = sort.sort === sortKey;

  const handleSortClick = () => {
    const order = isSorted && sort.order === "asc" ? "desc" : "asc";
    onSort({ sort: sortKey, order });
  };

  return (
    <StyledTableCell onClick={handleSortClick}>
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
      {!isSorted && (
        <span className="sort">
          <FontAwesomeIcon icon={faSort} className="stackIcon" />
        </span>
      )}
    </StyledTableCell>
  );
};

export default UserHeader;
