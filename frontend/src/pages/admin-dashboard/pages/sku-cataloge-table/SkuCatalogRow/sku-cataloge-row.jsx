import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CreateAurbitrageSKURow from "../CreateAurbitrageSku/create-aurbitrage-sku";
import { StyledTableCell, EditIcon } from "./styles";

const SKUCatalogeRow = (props) => {
  const {
    row,
    index,
    aurbitrageSKUMeta,
    createSKURelation,
    onEdit,
    updateChanges,
  } = props;
  const [editActive, setEditActive] = React.useState(false);

  return !editActive ? (
    <React.Fragment>
      <StyledTableCell>{row.aurbitrageSku}</StyledTableCell>
      <StyledTableCell align="center">{row.priceDisplay}</StyledTableCell>
      <StyledTableCell align="center">{row.metal}</StyledTableCell>
      <StyledTableCell align="center">{row.category}</StyledTableCell>
      <StyledTableCell align="center">{row.subCategory}</StyledTableCell>
      <StyledTableCell align="center">{row.type}</StyledTableCell>
      <StyledTableCell align="end">{row.mint}</StyledTableCell>

      <StyledTableCell>
        <EditIcon>
          <FontAwesomeIcon
            size="xl"
            icon={faEdit}
            onClick={() => {
              // setEditActive(true);
              onEdit(row);
            }}
          />
        </EditIcon>
      </StyledTableCell>

      {createSKURelation && <StyledTableCell />}
    </React.Fragment>
  ) : (
    <CreateAurbitrageSKURow
      rowEntry={row}
      onCancel={() => {
        setEditActive(false);
      }}
      index={index}
      aurbitrageSKUMeta={aurbitrageSKUMeta}
    />
  );
};

export default SKUCatalogeRow;
